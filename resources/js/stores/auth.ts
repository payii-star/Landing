import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
    id: number;
    uuid?: string;
    name: string;
    email: string;
    phone?: string;
    photo?: string;
    role?: string;  
    permission?: string[];
}

export const useAuthStore = defineStore("auth", () => {
    const error = ref<null | string>(null);
    const user = ref<User>({} as User);
    const isAuthenticated = ref(!!JwtService.getToken());

    function setAuth(authUser: User, token = "") {
        isAuthenticated.value = true;
        user.value = authUser;
        error.value = null;

        if (token) {
            JwtService.saveToken(token);
            ApiService.setHeader();
        }
    }

    function purgeAuth() {
        isAuthenticated.value = false;
        user.value = {} as User;
        error.value = null;
        JwtService.destroyToken();
    }

    async function login(credentials: any) {
        return ApiService.post("auth/login", credentials)
            .then(({ data }) => {
                if (data.token) {
                    setAuth(data.user, data.token);
                } else {
                    error.value = "Token tidak ditemukan";
                }
            })
            .catch((err) => {
                error.value = err.response?.data?.message || "Login Gagal";
                throw err;
            });
    }

    async function logout() {
        if (JwtService.getToken()) {
            ApiService.setHeader();

            await ApiService.delete("auth/logout").catch(() => {});
            purgeAuth();
        } else {
            purgeAuth();
        }
    }

    async function verifyAuth() {
        if (JwtService.getToken()) {
            ApiService.setHeader();

            await ApiService.get("auth/me")
                .then(({ data }) => {
                    const userData = data.user || data;
                    setAuth(userData);
                })
                .catch((err) => {
                    error.value = err.response?.data?.message;
                    purgeAuth();
                });
        } else {
            purgeAuth();
        }
    }

    return {
        error,
        user,
        isAuthenticated,
        login,
        logout,
        verifyAuth,
        setAuth,
        purgeAuth,
    };
});
