// import "./bootstrap";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import ApiService from "./core/services/ApiService";
import i18n from "./core/plugins/i18n";
import { initKtIcon } from "./core/plugins/keenthemes";

import { VueQueryPlugin, QueryClient, QueryCache } from "@tanstack/vue-query";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { initGlobalComponents } from "./core/plugins/global-components";

const app = createApp(App);
initGlobalComponents(app);
initKtIcon(app);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(i18n);

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any) => {
            if (error.response && error.response.status === 401) {
                window.location.href = "/sign-in";
            }
        },
    }),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

app.use(VueQueryPlugin, { queryClient });

app.use(Vue3Toastify, {
    autoClose: 3000,
    position: "top-right",
} as ToastContainerOptions);

// Init ApiService
ApiService.init(app);

app.mount("#app");
