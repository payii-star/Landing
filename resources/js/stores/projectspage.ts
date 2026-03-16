import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const useProjectsPageStore = defineStore('projectsPage', () => {

  const setting = ref(null)
  const loading = ref(false)

  async function fetchProjectsPage() {

    loading.value = true

    try {

      const res = await axios.get(`${API_URL}/projects-page`)

      setting.value = res.data.setting

    } catch (error) {

      console.error('Projects page fetch error:', error)

    } finally {

      loading.value = false

    }

  }

  return {
    setting,
    loading,
    fetchProjectsPage
  }

})