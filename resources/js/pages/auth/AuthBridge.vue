<template>
    <div class="d-flex flex-column align-items-center justify-content-center" style="height:100vh;">
        <div v-if="!errorMsg" class="text-center">
            <div class="spinner-border text-primary mb-4" style="width:3rem;height:3rem;"></div>
            <div class="fw-semibold text-gray-700">Masuk ke dashboard Landing...</div>
        </div>
        <div v-else class="text-center">
            <div class="text-danger fw-bold fs-4 mb-2">Gagal masuk</div>
            <div class="text-muted fs-7 mb-4">{{ errorMsg }}</div>
            <router-link to="/" class="btn btn-primary btn-sm">Kembali ke Beranda</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ApiService from '@/core/services/ApiService'

const route  = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const errorMsg = ref('')

onMounted(async () => {
    const token = route.query.token as string | undefined

    if (!token) {
        errorMsg.value = 'Token tidak ditemukan di URL.'
        return
    }

    try {
        // Simpan token dulu, baru verifikasi ke /auth/me buat ambil data user-nya.
        authStore.setAuth({} as any, token)
        ApiService.setHeader()

        const res = await ApiService.query('auth/me')
        const user = res.data.user ?? res.data

        authStore.setAuth(user, token)
        router.replace({ name: 'dashboard' })
    } catch (e) {
        authStore.purgeAuth()
        errorMsg.value = 'Token tidak valid atau sudah kedaluwarsa. Silakan login ulang lewat halaman E-pkl.'
    }
})
</script>