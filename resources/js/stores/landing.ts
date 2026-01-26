import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios"; // Pastikan Anda sudah install axios (npm install axios)

// Kita tentukan alamat API Backend kita
// Jika nanti sudah online, ganti localhost ini dengan domain asli
const API_URL = "http://127.0.0.1:8000/api";

export const useLandingStore = defineStore("landing", () => {
    // 1. State: Wadah kosong untuk menampung data
    const content = ref<any>({});
    const loading = ref(false);

    // 2. Action: Fungsi untuk menyuruh truk berangkat mengambil data
    async function fetchContent() {
        loading.value = true;
        try {
            // Tembak ke URL Backend yang sudah kita tes tadi
            const response = await axios.get(`${API_URL}/landing-content`);

            // Simpan data yang didapat ke dalam wadah 'content'
            content.value = response.data.data;
        } catch (error) {
            console.error("Gagal mengambil data landing page:", error);
        } finally {
            loading.value = false;
        }
    }

    return {
        content,
        loading,
        fetchContent,
    };
});
