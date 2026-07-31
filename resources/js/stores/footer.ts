import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { mockFooter } from '@/mocks/landingMock'

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK_FALLBACK !== "false";

export const useFooterStore = defineStore('footer', () => {

  const setting = ref(null)
  const socials = ref([])
  const loading = ref(false)

  async function fetchFooter() {

    loading.value = true

    try {
      const res = await axios.get(`${API_URL}/footer/landing`)
      
      setting.value = res.data.setting
      socials.value = res.data.socials

      console.log("✅ Footer loaded:", setting.value)

    } catch (error) {
      console.error('Footer fetch error:', error)

      if (USE_MOCK_FALLBACK) {
        console.warn("⚠️ Pakai mockFooter — backend belum tersedia. JANGAN lupa dicabut sebelum production.")
        setting.value = mockFooter.setting
        socials.value = mockFooter.socials
      }

    } finally {
      loading.value = false
    }
  }

  return {
    setting,
    socials,
    loading,
    fetchFooter
  }
})