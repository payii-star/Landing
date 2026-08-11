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
        path: '/contact',
        name: 'contact',
        component: () => import('@/pages/landing/ContactPage.vue'),
        meta: { 
            pageTitle: 'Hubungi Kami'
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
            if (
                to.meta.permission &&
                !authStore.user.permission.includes(to.meta.permission)
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