import { ref } from "vue";
import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";

// ── TYPE DEFINITIONS ───────────────────────────────────────────────

interface MenuItem {
    id: number;
    label: string;
    mobile_label?: string;
    url: string;
    type: "link" | "button-primary" | "button-outline";
    target: "_self" | "_blank";
    visibility: "all" | "guest" | "auth";
    is_active: boolean;
    has_dropdown: boolean;
    show_on_mobile: boolean;
    show_on_desktop: boolean;
    urutan: number;
    icon_class?: string;
    custom_class?: string;
    badge_text?: string;
    badge_color?: string;
    rel_attribute?: string;
    children?: MenuItem[];
}

interface LandingContent {
    app_name?: string;
    logo?: string;
    description?: string;
    email?: string;
    telepon?: string;
    alamat?: string;
    [key: string]: any;
}

// Mengambil URL dari env atau default ke localhost
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const useLandingStore = defineStore("landing", () => {
    // ── STATE ──────────────────────────────────────────────────────
    const content = ref<LandingContent>({});
    const menus = ref<MenuItem[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // ── ACTIONS ────────────────────────────────────────────────────

    /**
     * Fetch content umum (Logo, Judul, Deskripsi)
     * Endpoint: /api/front/settings
     */
    async function fetchContent() {
        loading.value = true;
        error.value = null;

        try {
            // UPDATE: Mengarah ke endpoint settings yang baru dibuat di backend
            const response = await axios.get(`${API_URL}/front/settings`);

            if (response.data.success) {
                content.value = response.data.data || {};
            } else {
                throw new Error(
                    response.data.message || "Gagal mengambil data settings"
                );
            }
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Gagal mengambil data landing page";

            error.value = errorMessage;
            console.error("❌ Error fetching landing content:", err);
        } finally {
            loading.value = false;
        }
    }

    /**
     * Fetch menu navbar
     * Endpoint: /api/front/navbar
     * @param device - 'mobile' | 'desktop'
     */
    async function fetchMenu(device?: "mobile" | "desktop") {
        error.value = null;

        try {
            // Deteksi device type otomatis jika tidak diberikan
            const deviceType =
                device || (window.innerWidth < 992 ? "mobile" : "desktop");

            // console.log(`🔄 Fetching ${deviceType} menu...`);

            const response = await axios.get(`${API_URL}/front/navbar`, {
                params: { device: deviceType },
            });

            if (response.data.success) {
                menus.value = response.data.data || [];
            } else {
                menus.value = [];
                console.warn(
                    "⚠️ Menu fetch returned unsuccessful:",
                    response.data
                );
            }
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Gagal mengambil data menu";

            error.value = errorMessage;
            menus.value = [];

            console.error("❌ Failed to fetch menu:", errorMessage);
        }
    }

    /**
     * Refresh menus berdasarkan ukuran window saat ini
     * Berguna saat event window resize
     */
    async function refreshMenus() {
        const isMobile = window.innerWidth < 992;
        await fetchMenu(isMobile ? "mobile" : "desktop");
    }

    /**
     * Clear semua data store
     */
    function clearData() {
        content.value = {};
        menus.value = [];
        loading.value = false;
        error.value = null;
    }

    /**
     * Track analytics saat menu diklik
     */
    async function trackMenuClick(menuId: number) {
        try {
            await axios.post(`${API_URL}/front/navbar/track-click/${menuId}`);
        } catch (err) {
            // Silent fail - analytics error should not disturb user experience
            console.error("Failed to track menu click:", err);
        }
    }

    // ── GETTERS / HELPERS ──────────────────────────────────────────

    function getMenusByVisibility(
        visibility: "all" | "guest" | "auth"
    ): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.visibility === "all" || menu.visibility === visibility
        );
    }

    function getActiveMenus(): MenuItem[] {
        return menus.value.filter((menu) => menu.is_active);
    }

    function getMenusWithDropdown(): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.has_dropdown && menu.children && menu.children.length > 0
        );
    }

    // Mencari menu tipe button-primary untuk dijadikan CTA (Call to Action)
    function getCtaButton(): MenuItem | undefined {
        return menus.value.find(
            (menu) => menu.type === "button-primary" && menu.is_active
        );
    }

    // Mengambil menu biasa (text link)
    function getLinkMenus(): MenuItem[] {
        return menus.value.filter(
            (menu) => menu.is_active && menu.type === "link"
        );
    }

    // Mengambil semua menu berbentuk tombol
    function getButtonMenus(): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.is_active &&
                (menu.type === "button-primary" ||
                    menu.type === "button-outline")
        );
    }

    return {
        // State
        content,
        menus,
        loading,
        error,

        // Actions
        fetchContent,
        fetchMenu,
        refreshMenus,
        clearData,
        trackMenuClick,

        // Getters
        getMenusByVisibility,
        getActiveMenus,
        getMenusWithDropdown,
        getCtaButton,
        getLinkMenus,
        getButtonMenus,
    };
});
