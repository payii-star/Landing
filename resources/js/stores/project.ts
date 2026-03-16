import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api"

export const useProjectStore = defineStore('project', () => {

  const projects = ref([])

  async function fetchProjects() {
    try {
      const res = await axios.get(`${API_URL}/landing/projects`)

      projects.value = res.data.data

      console.log("✅ Projects loaded:", projects.value)

    } catch (error) {
      console.error('Projects fetch error:', error)
    }
  }

  return {
    projects,
    fetchProjects
  }
})