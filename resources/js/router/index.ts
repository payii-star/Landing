import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

declare module "vue-router" {
    interface RouteMeta {
        pageTitle?: string;
        permission?: string;
        middleware?: string;
        checkDetail?: boolean;
    }
}

const routes: Array<RouteRecordRaw> = [
    // =================================================================
    // 1. LANDING PAGE (Public / Halaman Depan)
    // =================================================================
    {
        path: "/",
        name: "landing",
        component: () => import("@/pages/landing/Index.vue"),
        meta: {
            pageTitle: "Selamat Datang",
        },
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/pages/landing/About.vue"),
        meta: {
            pageTitle: "Tentang Kami",
        },
    },
    {
        path: "/services",
        name: "services",
        component: () => import("@/pages/landing/Services.vue"),
        meta: {
            pageTitle: "Layanan Kami",
        },
    },
    {
        path: "/projects",
        name: "projects",
        component: () => import("@/pages/landing/ProjectsPage.vue"),
        meta: {
            pageTitle: "Projects",
        },
    },
    {
        path: "/projects/:slug",
        name: "project-detail",
        component: () => import("@/pages/landing/ProjectDetail.vue"),
        meta: {
            pageTitle: "Project Detail",
        },
    },

    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/pages/landing/ContactPage.vue'),
        meta: {
            pageTitle: 'Hubungi Kami'
        },
    },

    // Jembatan login dari E-pkl — TIDAK butuh auth (justru dipakai buat
    // masukin token SEBELUM login dianggap sah). Lihat WithEmail.vue di E-pkl.
    {
        path: '/auth/bridge',
        name: 'auth-bridge',
        component: () => import('@/pages/auth/AuthBridge.vue'),
        meta: {
            pageTitle: 'Masuk...',
        },
    },

    // =================================================================
    // 2. DASHBOARD (Protected / Wajib Login)
    // =================================================================
    {
        path: "/dashboard",
        component: () => import("@/layouts/default-layout/DefaultLayout.vue"),
        meta: {
            middleware: "auth",
        },
        children: [
            {
                path: "",
                name: "dashboard",
                component: () => import("@/pages/dashboard/Index.vue"),
                meta: {
                    pageTitle: "Dashboard",
                    breadcrumbs: ["Dashboard"],
                },
            },
            {
                path: "profile",
                name: "dashboard.profile",
                component: () => import("@/pages/dashboard/profile/Index.vue"),
                meta: {
                    pageTitle: "Profile",
                    breadcrumbs: ["Profile"],
                },
            },
            {
                path: "setting",
                name: "dashboard.setting",
                component: () => import("@/pages/dashboard/setting/Index.vue"),
                meta: {
                    pageTitle: "Website Setting",
                    breadcrumbs: ["Website", "Setting"],
                },
            },

            // MASTER DATA
            {
                path: "master/users/roles",
                name: "dashboard.master.users.roles",
                component: () =>
                    import("@/pages/dashboard/master/users/roles/Index.vue"),
                meta: {
                    pageTitle: "User Roles",
                    breadcrumbs: ["Master", "Users", "Roles"],
                },
            },
            {
                path: "master/users",
                name: "dashboard.master.users",
                component: () =>
                    import("@/pages/dashboard/master/users/Index.vue"),
                meta: {
                    pageTitle: "Users",
                    breadcrumbs: ["Master", "Users"],
                },
            },
            {
                path: "master/projects",
                name: "dashboard.master.projects",
                component: () =>
                    import("@/pages/dashboard/master/projects/Index.vue"),
                meta: {
                    pageTitle: "Projects",
                    breadcrumbs: ["Master", "Projects"],
                },
            },
            {
                path: "master/statistics",
                name: "dashboard.master.statistics",
                component: () =>
                    import("@/pages/dashboard/master/statistics/Index.vue"),
                meta: {
                    pageTitle: "Statistics",
                    breadcrumbs: ["Master", "Statistics"],
                },
            },
            {
                path: "master/footer",
                name: "dashboard.master.footer",
                component: () =>
                    import("@/pages/dashboard/master/footer/Index.vue"),
                meta: {
                    pageTitle: "Footer",
                    breadcrumbs: ["Master", "Footer"],
                },
            },
            {
                path: "master/landing-content",
                name: "dashboard.master.landing-content",
                component: () =>
                    import("@/pages/dashboard/master/landing-content/Index.vue"),
                meta: {
                    pageTitle: "Landing Content",
                    breadcrumbs: ["Master", "Landing Content"],
                },
            },
            {
                path: "master/menu",
                name: "dashboard.master.menu",
                component: () =>
                    import("@/pages/dashboard/master/menu/Index.vue"),
                meta: {
                    pageTitle: "Menu",
                    breadcrumbs: ["Master", "Menu"],
                },
            },
            {
                path: "master/services",
                name: "dashboard.master.services",
                component: () =>
                    import("@/pages/dashboard/master/services/Index.vue"),
                meta: {
                    pageTitle: "Services",
                    breadcrumbs: ["Master", "Services"],
                },
            },
            {
                path: "master/testimonials",
                name: "dashboard.master.testimonials",
                component: () =>
                    import("@/pages/dashboard/master/testimonials/Index.vue"),
                meta: {
                    pageTitle: "Testimonials",
                    breadcrumbs: ["Master", "Testimonials"],
                },
            },
            {
                path: "master/teams",
                name: "dashboard.master.teams",
                component: () =>
                    import("@/pages/dashboard/master/teams/Index.vue"),
                meta: {
                    pageTitle: "Teams",
                    breadcrumbs: ["Master", "Teams"],
                },
            },
        ],
    },

    // =================================================================
    // 3. AUTHENTICATION (Sign In)
    // =================================================================
    {
        path: "/",
        component: () => import("@/layouts/AuthLayout.vue"),
        children: [
            {
                path: "sign-in",
                name: "sign-in",
                component: () => import("@/pages/auth/sign-in/Index.vue"),
                meta: {
                    pageTitle: "Sign In",
                    middleware: "guest",
                },
            },
        ],
    },

    // =================================================================
    // 4. SYSTEM ERRORS
    // =================================================================
    {
        path: "/",
        component: () => import("@/layouts/SystemLayout.vue"),
        children: [
            {
                path: "/404",
                name: "404",
                component: () => import("@/pages/errors/Error404.vue"),
                meta: {
                    pageTitle: "Error 404",
                },
            },
            {
                path: "/500",
                name: "500",
                component: () => import("@/pages/errors/Error500.vue"),
                meta: {
                    pageTitle: "Error 500",
                },
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/404",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                top: 80,
                behavior: "smooth",
            };
        } else {
            return {
                top: 0,
                left: 0,
                behavior: "smooth",
            };
        }
    },
});

router.beforeEach(async (to, from, next) => {
    if (to.name) {
        NProgress.start();
    }

    const authStore = useAuthStore();
    const configStore = useConfigStore();

    // Set Page Title
    if (to.meta.pageTitle) {
        document.title = `${to.meta.pageTitle} - ${
            import.meta.env.VITE_APP_NAME
        }`;
    } else {
        document.title = import.meta.env.VITE_APP_NAME as string;
    }

    configStore.resetLayoutConfig();

    // Verify Auth Token
    if (!authStore.isAuthenticated || !authStore.user?.id) await authStore.verifyAuth();

    // Logic Middleware
    if (to.meta.middleware == "auth") {
        if (authStore.isAuthenticated) {
            const userPermissions = (authStore.user as {
                permission?: string[];
            }).permission ?? [];

            if (
                to.meta.permission &&
                !userPermissions.includes(to.meta.permission)
            ) {
                next({ name: "404" });
            } else if (to.meta.checkDetail == false) {
                next();
            } else {
                next();
            }
        } else {
            next({ name: "sign-in" });
        }
    } else if (to.meta.middleware == "guest" && authStore.isAuthenticated) {
        next({ name: "dashboard" });
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
