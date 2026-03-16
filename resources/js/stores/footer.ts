import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

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