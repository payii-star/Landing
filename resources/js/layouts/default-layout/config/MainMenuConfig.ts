import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
    {
        pages: [
            {
                heading: "Dashboard",
                name: "dashboard",
                route: "/dashboard",
                keenthemesIcon: "element-11",
            },
        ],
    },

    // WEBSITE
    {
        heading: "Website",
        route: "/dashboard/website",
        name: "website",
        pages: [
            // MASTER
            {
                sectionTitle: "Master",
                route: "/master",
                keenthemesIcon: "cube-3",
                name: "master",
                sub: [
                    {
                        sectionTitle: "User",
                        route: "/users",
                        name: "master-user",
                        sub: [
                            {
                                heading: "Role",
                                name: "master-role",
                                route: "/dashboard/master/users/roles",
                            },
                            {
                                heading: "User",
                                name: "master-user",
                                route: "/dashboard/master/users",
                            },
                        ],
                    },
                    {
                        heading: "Projects",
                        name: "master-projects",
                        route: "/dashboard/master/projects",
                    },
                    {
                        heading: "Statistics",
                        name: "master-statistics",
                        route: "/dashboard/master/statistics",
                    },
                    { heading: "Footer",
                        name: "master-footer",
                        route: "/dashboard/master/footer",
                    },
                    {
                        heading: "Landing Content",
                        name: "master-landing-content",
                        route: "/dashboard/master/landing-content",
                    },
                    {
    heading: "Menu",
    name: "master-menu",
    route: "/dashboard/master/menu",
},
{
    heading: "Services",
    name: "master-services",
    route: "/dashboard/master/services",
},
{
    heading: "Testimonials",
    name: "master-testimonials",
    route: "/dashboard/master/testimonials",
},
{
    // ── BARU: menu untuk halaman Client / Mitra ──
    heading: "Client",
    name: "master-clients",
    route: "/dashboard/master/clients",
},
{
    heading: "Teams",
    name: "master-teams",
    route: "/dashboard/master/teams",
},
                ],
            },
            {
                heading: "Setting",
                route: "/dashboard/setting",
                name: "setting",
                keenthemesIcon: "setting-2",
            },
        ],
    },
];

export default MainMenuConfig;