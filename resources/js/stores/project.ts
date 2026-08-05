import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { mockProjects } from '@/mocks/landingMock'

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"
export const useProjectStore = defineStore('project', () => {
  const projects = ref([])
  const loading = ref(false)
  const isFetched = ref(false)  
  async function fetchProjects() {
    if (isFetched.value) return
    loading.value = true
    try {
      const res = await axios.get(`${API_URL}/front/projects`)
      projects.value = res.data.data
      isFetched.value = true
      console.log("✅ Projects loaded:", projects.value)
    } catch (error) {
      console.error('Projects fetch error:', error)
      // ── SEMENTARA: kalau API gagal (404), pakai dummy data
      projects.value = mockProjects
      isFetched.value = true
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