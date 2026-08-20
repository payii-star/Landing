import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

import {
    mockContent,
    mockNavbar,
    mockStatistics,
    mockTeams,
    mockTestimonials,
    type Testimonial,
} from "@/mocks/landingMock";

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

interface Project {
    id: number;
    uuid?: string;
    title: string;
    slug?: string;
    description?: string;
    category?: string;

    // API bisa mengirim salah satu dari field berikut
    thumbnail?: string;
    thumbnail_url?: string;
    image?: string;
    image_url?: string;

    url?: string;
    link_project?: string;

    is_featured?: boolean;
    featured?: boolean;

    order?: number;
    urutan?: number;

    [key: string]: any;
}

// ── CONFIG ─────────────────────────────────────────────────────────

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://192.168.112.210:8000/api";

const USE_MOCK_FALLBACK =
    import.meta.env.VITE_USE_MOCK_FALLBACK !== "false";

// ── STORE ──────────────────────────────────────────────────────────

export const useLandingStore = defineStore("landing", () => {
    // ── STATE ──────────────────────────────────────────────────────

    const content = ref<LandingContent>({});
    const menus = ref<MenuItem[]>([]);

    const statistics = ref<Statistic[]>([]);
    const statisticsLoading = ref(false);

    const teams = ref<TeamMember[]>([]);
    const teamsLoading = ref(false);

    const testimonials = ref<Testimonial[]>([]);
    const testimonialsLoading = ref(false);

    const projects = ref<Project[]>([]);
    const projectsLoading = ref(false);

    const loading = ref(false);
    const error = ref<string | null>(null);

    // ── CONTENT ────────────────────────────────────────────────────

    async function fetchContent() {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.get(
                `${API_URL}/front/content`
            );

            if (response.data?.success) {
                content.value = response.data.data || {};
            } else {
                throw new Error(
                    response.data?.message ||
                        "Gagal mengambil data settings"
                );
            }
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Gagal mengambil data landing page";

            error.value = errorMessage;

            console.error(
                "❌ Error fetching landing content:",
                err
            );

            if (USE_MOCK_FALLBACK) {
                console.warn(
                    "⚠️ Menggunakan mockContent sebagai fallback."
                );

                content.value = mockContent;
            }
        } finally {
            loading.value = false;
        }
    }

    // ── NAVBAR ─────────────────────────────────────────────────────

    async function fetchMenu(
        device?: "mobile" | "desktop"
    ) {
        error.value = null;

        const currentDevice =
            device ||
            (typeof window !== "undefined" &&
            window.innerWidth < 992
                ? "mobile"
                : "desktop");

        /*
         * Urutan percobaan:
         *
         * 1. /front/navbar?device=desktop/mobile
         * 2. /front/navbar tanpa parameter
         * 3. device kebalikan
         * 4. mockNavbar
         *
         * Jadi kalau backend salah mengembalikan data
         * berdasarkan device, navbar tetap bisa muncul.
         */

        const devicesToTry: (
            | "mobile"
            | "desktop"
        )[] =
            currentDevice === "desktop"
                ? ["desktop", "mobile"]
                : ["mobile", "desktop"];

        // Jangan langsung mengosongkan menus.
        // Ini penting supaya navbar lama tidak hilang
        // ketika request sedang gagal.
        let lastError: any = null;

        for (const deviceType of devicesToTry) {
            try {
                console.log(
                    `🔄 Fetch navbar: ${deviceType}`
                );

                const response = await axios.get(
                    `${API_URL}/front/navbar`,
                    {
                        params: {
                            device: deviceType,
                        },
                        timeout: 10000,
                    }
                );

                if (!response.data?.success) {
                    console.warn(
                        `⚠️ Navbar ${deviceType} tidak sukses:`,
                        response.data
                    );

                    continue;
                }

                const responseData =
                    response.data?.data;

                let result: MenuItem[] = [];

                if (Array.isArray(responseData)) {
                    result = responseData;
                } else if (
                    responseData &&
                    Array.isArray(responseData.menus)
                ) {
                    result = responseData.menus;
                } else if (
                    responseData &&
                    Array.isArray(responseData.data)
                ) {
                    result = responseData.data;
                }

                // Buang menu yang benar-benar tidak valid
                result = result.filter(
                    (menu: any) =>
                        menu &&
                        typeof menu === "object"
                );

                if (result.length > 0) {
                    menus.value = result;

                    console.log(
                        `✅ Navbar berhasil dimuat: ${result.length} menu (${deviceType})`
                    );

                    return;
                }

                console.warn(
                    `⚠️ Navbar ${deviceType} berhasil diakses tetapi datanya kosong.`
                );
            } catch (err: any) {
                lastError = err;

                console.error(
                    `❌ Gagal mengambil navbar ${deviceType}:`,
                    err
                );
            }
        }

        // ── FALLBACK TANPA PARAMETER DEVICE ───────────────────────

        try {
            console.log(
                "🔄 Mencoba navbar tanpa parameter device..."
            );

            const response = await axios.get(
                `${API_URL}/front/navbar`,
                {
                    timeout: 10000,
                }
            );

            if (response.data?.success) {
                const responseData =
                    response.data?.data;

                let result: MenuItem[] = [];

                if (Array.isArray(responseData)) {
                    result = responseData;
                } else if (
                    responseData &&
                    Array.isArray(responseData.menus)
                ) {
                    result = responseData.menus;
                } else if (
                    responseData &&
                    Array.isArray(responseData.data)
                ) {
                    result = responseData.data;
                }

                result = result.filter(
                    (menu: any) =>
                        menu &&
                        typeof menu === "object"
                );

                if (result.length > 0) {
                    menus.value = result;

                    console.log(
                        `✅ Navbar fallback berhasil: ${result.length} menu`
                    );

                    return;
                }
            }
        } catch (err: any) {
            lastError = err;

            console.error(
                "❌ Navbar fallback gagal:",
                err
            );
        }

        // ── MOCK FALLBACK ─────────────────────────────────────────

        if (USE_MOCK_FALLBACK) {
            console.warn(
                "⚠️ Semua request navbar gagal. Menggunakan mockNavbar."
            );

            menus.value = Array.isArray(mockNavbar)
                ? mockNavbar
                : [];

            return;
        }

        error.value =
            lastError?.response?.data?.message ||
            lastError?.message ||
            "Gagal mengambil data menu";

        console.error(
            "❌ Navbar tidak berhasil dimuat."
        );

        // Hanya kosongkan jika memang belum pernah
        // mendapatkan data navbar.
        if (menus.value.length === 0) {
            menus.value = [];
        }
    }

    // ── STATISTICS ────────────────────────────────────────────────

    async function fetchStatistics() {
        statisticsLoading.value = true;

        try {
            const response = await axios.get(
                `${API_URL}/front/statistics`
            );

            statistics.value =
                response.data?.data ||
                response.data ||
                [];
        } catch (err: any) {
            console.error(
                "❌ Failed to fetch statistics:",
                err
            );

            if (USE_MOCK_FALLBACK) {
                console.warn(
                    "⚠️ Menggunakan mockStatistics sebagai fallback."
                );

                statistics.value = mockStatistics;
            } else {
                statistics.value = [];
            }
        } finally {
            statisticsLoading.value = false;
        }
    }

    // ── TEAMS ─────────────────────────────────────────────────────

    async function fetchTeams() {
        teamsLoading.value = true;

        try {
            const response = await axios.get(
                `${API_URL}/front/teams`
            );

            teams.value =
                response.data?.data ||
                response.data ||
                [];
        } catch (err: any) {
            console.error(
                "❌ Failed to fetch teams:",
                err
            );

            if (USE_MOCK_FALLBACK) {
                console.warn(
                    "⚠️ Menggunakan mockTeams sebagai fallback."
                );

                teams.value = mockTeams;
            } else {
                teams.value = [];
            }
        } finally {
            teamsLoading.value = false;
        }
    }

    // ── TESTIMONIALS ──────────────────────────────────────────────

    async function fetchTestimonials() {
        testimonialsLoading.value = true;

        try {
            const response = await axios.get(
                `${API_URL}/front/testimonials`
            );

            testimonials.value =
                response.data?.data ||
                response.data ||
                [];
        } catch (err: any) {
            console.error(
                "❌ Failed to fetch testimonials:",
                err
            );

            if (USE_MOCK_FALLBACK) {
                console.warn(
                    "⚠️ Menggunakan mockTestimonials sebagai fallback."
                );

                testimonials.value =
                    mockTestimonials;
            } else {
                testimonials.value = [];
            }
        } finally {
            testimonialsLoading.value = false;
        }
    }

    // ── BEST PROJECTS ─────────────────────────────────────────────

    async function fetchProjects() {
        projectsLoading.value = true;

        try {
            /*
             * Endpoint yang digunakan untuk halaman
             * Projects adalah /front/projects.
             *
             * Jangan diubah ke /best-projects karena
             * halaman project membutuhkan semua data.
             */
            const response = await axios.get(
                `${API_URL}/front/projects`,
                {
                    timeout: 10000,
                }
            );

            if (response.data?.success) {
                const data = response.data?.data;

                projects.value = Array.isArray(data)
                    ? data
                    : [];
            } else {
                projects.value = [];

                console.warn(
                    "⚠️ Projects API returned unsuccessful:",
                    response.data
                );
            }
        } catch (err: any) {
            console.error(
                "❌ Failed to fetch projects:",
                err
            );

            projects.value = [];
        } finally {
            projectsLoading.value = false;
        }
    }

    // ── REFRESH MENU ──────────────────────────────────────────────

    async function refreshMenus() {
        if (
            typeof window === "undefined"
        ) {
            await fetchMenu("desktop");
            return;
        }

        const isMobile =
            window.innerWidth < 992;

        await fetchMenu(
            isMobile
                ? "mobile"
                : "desktop"
        );
    }

    // ── CLEAR DATA ────────────────────────────────────────────────

    function clearData() {
        content.value = {};
        menus.value = [];

        statistics.value = [];
        statisticsLoading.value = false;

        teams.value = [];
        teamsLoading.value = false;

        testimonials.value = [];
        testimonialsLoading.value = false;

        projects.value = [];
        projectsLoading.value = false;

        loading.value = false;
        error.value = null;
    }

    // ── TRACK MENU CLICK ──────────────────────────────────────────

    async function trackMenuClick(
        menuId: number
    ) {
        try {
            await axios.post(
                `${API_URL}/front/navbar/track-click/${menuId}`
            );
        } catch (err) {
            console.error(
                "Failed to track menu click:",
                err
            );
        }
    }

    // ── GETTERS / HELPERS ─────────────────────────────────────────

    function getMenusByVisibility(
        visibility:
            | "all"
            | "guest"
            | "auth"
    ): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.visibility === "all" ||
                menu.visibility === visibility
        );
    }

    function getActiveMenus(): MenuItem[] {
        return menus.value.filter(
            (menu) => menu.is_active
        );
    }

    function getMenusWithDropdown(): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.has_dropdown &&
                menu.children &&
                menu.children.length > 0
        );
    }

    function getCtaButton():
        | MenuItem
        | undefined {
        return menus.value.find(
            (menu) =>
                menu.type ===
                    "button-primary" &&
                menu.is_active
        );
    }

    function getLinkMenus(): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.is_active &&
                menu.type === "link"
        );
    }

    function getButtonMenus(): MenuItem[] {
        return menus.value.filter(
            (menu) =>
                menu.is_active &&
                (
                    menu.type ===
                        "button-primary" ||
                    menu.type ===
                        "button-outline"
                )
        );
    }

    // ── RETURN ─────────────────────────────────────────────────────

    return {
        // State
        content,
        menus,

        statistics,
        statisticsLoading,

        teams,
        teamsLoading,

        testimonials,
        testimonialsLoading,

        projects,
        projectsLoading,

        loading,
        error,

        // Actions
        fetchContent,
        fetchMenu,
        fetchStatistics,
        fetchTeams,
        fetchTestimonials,
        fetchProjects,

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