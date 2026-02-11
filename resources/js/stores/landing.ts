import { ref } from "vue";
import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";

// Type definitions
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
    logo?: string;
    title?: string;
    description?: string;
    [key: string]: any;
}

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const useLandingStore = defineStore("landing", () => {
    // State
    const content = ref<LandingContent>({});
    const menus = ref<MenuItem[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    /**
     * Fetch content untuk landing page
     */
    async function fetchContent() {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.get(`${API_URL}/landing-content`);

            if (response.data.status) {
                content.value = response.data.data || {};
            } else {
                throw new Error(
                    response.data.message || "Gagal mengambil data"
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
     * @param device - 'mobile' | 'desktop'
     */
    async function fetchMenu(device?: "mobile" | "desktop") {
        error.value = null;

        try {
            // Deteksi device type jika tidak diberikan
            const deviceType =
                device || (window.innerWidth < 992 ? "mobile" : "desktop");

            console.log(`🔄 Fetching ${deviceType} menu...`);

            const response = await axios.get(`${API_URL}/front/navbar`, {
                params: { device: deviceType },
            });

            if (response.data.success) {
                menus.value = response.data.data || [];

                console.log("✅ Menu data loaded:", {
                    total: menus.value.length,
                    device: deviceType,
                    activeMenus: menus.value.filter((m) => m.is_active).length,
                    menus: menus.value.map((m) => ({
                        id: m.id,
                        label: m.label,
                        type: m.type,
                        is_active: m.is_active,
                        show_on_desktop: m.show_on_desktop,
                        show_on_mobile: m.show_on_mobile,
                        has_dropdown: m.has_dropdown,
                        children_count: m.children?.length || 0,
                    })),
                });
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

            console.error("❌ Failed to fetch menu:", {
                message: errorMessage,
                status: err.response?.status,
                data: err.response?.data,
            });

            menus.value = [];
        }
    }

    /**
     * Refresh menus berdasarkan ukuran window saat ini
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
     * Get menus berdasarkan visibility (all/guest/auth)
     */
    function getMenusByVisibility(
        visibility: "all" | "guest" | "auth"
    ): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.visibility === "all" || menu.visibility === visibility
        );
    }

    /**
     * Get hanya menu yang aktif
     */
    function getActiveMenus(): MenuItem[] {
        return menus.value.filter((menu) => menu.is_active);
    }

    /**
     * Get menu yang memiliki dropdown
     */
    function getMenusWithDropdown(): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.has_dropdown && menu.children && menu.children.length > 0
        );
    }

    /**
     * Get CTA button (button-primary)
     */
    function getCtaButton(): MenuItem | undefined {
        return menus.value.find(
            (menu) => menu.type === "button-primary" && menu.is_active
        );
    }

    /**
     * Get menu dengan type 'link'
     */
    function getLinkMenus(): MenuItem[] {
        return menus.value.filter(
            (menu) => menu.is_active && menu.type === "link"
        );
    }

    /**
     * Get semua button menus (primary + outline)
     */
    function getButtonMenus(): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.is_active &&
                (menu.type === "button-primary" ||
                    menu.type === "button-outline")
        );
    }

    /**
     * Track menu click analytics
     */
    async function trackMenuClick(menuId: number) {
        try {
            await axios.post(`${API_URL}/front/navbar/track-click/${menuId}`);
            console.log(`📊 Tracked click for menu ID: ${menuId}`);
        } catch (err) {
            console.error("Failed to track menu click:", err);
            // Silent fail - tidak perlu menampilkan error ke user
        }
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
