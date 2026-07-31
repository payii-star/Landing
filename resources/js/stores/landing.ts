import { ref } from "vue";
import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import { mockContent, mockNavbar } from "@/mocks/landingMock";

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

// Interface untuk Statistik
interface Statistic {
    id: number;
    icon: string;
    statistic: string;
    label: string;
    is_active: boolean;
    order: number;
}


interface TeamMember {
    id: number;
    name: string;
    position: string;
    image: string;
    image_url: string;
    order: number;
    is_active: boolean;
}

// Mengambil URL dari env atau default ke localhost
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK !== "false";

export const useLandingStore = defineStore("landing", () => {
    // ── STATE ──────────────────────────────────────────────────────
    const content = ref<LandingContent>({});
    const menus = ref<MenuItem[]>([]);
    const statistics = ref<Statistic[]>([]);
    const teams = ref<TeamMember[]>([]);

    const loading = ref(false);
    const error = ref<string | null>(null);

    // ── ACTIONS ────────────────────────────────────────────────────

    /**
     * Fetch content umum (Logo, Judul, Deskripsi)
     * Endpoint: /api/front/content
     */
    async function fetchContent() {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.get(`${API_URL}/front/content`);
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

            if (USE_MOCK_FALLBACK) {
                console.warn("⚠️ Pakai mockContent — backend belum tersedia. JANGAN lupa dicabut sebelum production.");
                content.value = mockContent;
            }
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
            const deviceType =
                device || (window.innerWidth < 992 ? "mobile" : "desktop");

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
            console.error("❌ Failed to fetch menu:", errorMessage);

            if (USE_MOCK_FALLBACK) {
                console.warn("⚠️ Pakai mockNavbar — backend belum tersedia. JANGAN lupa dicabut sebelum production.");
                menus.value = mockNavbar;
            } else {
                menus.value = [];
            }
        }
    }

    async function fetchStatistics() {
        try {
            const response = await axios.get(`${API_URL}/front/statistics`);
            statistics.value = response.data.data || response.data || [];
        } catch (err: any) {
            console.error("❌ Failed to fetch statistics:", err);
        }
    }


    async function fetchTeams() {
        try {
            const response = await axios.get(`${API_URL}/front/teams`);
            teams.value = response.data.data || response.data || [];
        } catch (err: any) {
            console.error("❌ Failed to fetch teams:", err);
        }
    }

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
        statistics.value = [];
        teams.value = []; 
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

    function getCtaButton(): MenuItem | undefined {
        return menus.value.find(
            (menu) => menu.type === "button-primary" && menu.is_active
        );
    }

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
        statistics,
        teams,
        loading,
        error,

        // Actions
        fetchContent,
        fetchMenu,
        fetchStatistics,
        fetchTeams, 
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