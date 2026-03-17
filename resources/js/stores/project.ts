import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"

export const useProjectStore = defineStore('project', () => {

  const projects = ref([])
  const loading = ref(false)
  const isFetched = ref(false)  // flag: sudah pernah fetch atau belum

  async function fetchProjects() {
    // Kalau sudah pernah fetch, skip — pakai data yang ada di memory
    if (isFetched.value) return

    loading.value = true
    try {
      const res = await axios.get(`${API_URL}/landing/projects`)
      projects.value = res.data.data
      isFetched.value = true
      console.log("✅ Projects loaded:", projects.value)
    } catch (error) {
      console.error('Projects fetch error:', error)
    } finally {
      loading.value = false
    }
  }

  // Panggil ini kalau mau force refresh (misal setelah admin update data)
  function invalidateCache() {
    isFetched.value = false
  }

  return {
    projects,
    loading,
    isFetched,
    fetchProjects,
    invalidateCache
  }
})