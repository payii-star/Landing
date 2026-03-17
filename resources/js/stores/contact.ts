import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export const useContactStore = defineStore('contact', () => {

// ── State ────────────────────────────────────────────────
const setting   = ref<any>(null)
const loading   = ref(false)
const submitting = ref(false)
const submitSuccess = ref(false)
const submitError   = ref<string | null>(null)
const isFetched = ref(false)

// ── Fetch setting kontak (email, WA, alamat, sosmed) ─────
async function fetchSetting() {
    if (isFetched.value) return
    loading.value = true
    try {
    const res = await axios.get(`${API_URL}/contact/setting`)
    setting.value = res.data.data
    isFetched.value = true
    } catch (e) {
    console.error('Contact setting fetch error:', e)
    } finally {
    loading.value = false
    }
}

// ── Submit form pesan ────────────────────────────────────
async function sendMessage(payload: {
    name: string
    email: string
    company?: string
    phone?: string
    message: string
    source?: string
    file?: File | null
}) {
    submitting.value = true
    submitSuccess.value = false
    submitError.value = null

    try {
    const form = new FormData()
    form.append('name',    payload.name)
    form.append('email',   payload.email)
    form.append('message', payload.message)
    if (payload.company) form.append('company', payload.company)
    if (payload.phone)   form.append('phone',   payload.phone)
    if (payload.source)  form.append('source',  payload.source)
    if (payload.file)    form.append('file',    payload.file)

    await axios.post(`${API_URL}/contact/messages`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })

    submitSuccess.value = true
    } catch (e: any) {
    submitError.value =
        e?.response?.data?.message ||
        'Terjadi kesalahan. Silakan coba lagi.'
    } finally {
    submitting.value = false
    }
}

function resetForm() {
    submitSuccess.value = false
    submitError.value   = null
}

return {
    setting,
    loading,
    submitting,
    submitSuccess,
    submitError,
    fetchSetting,
    sendMessage,
    resetForm,
}
})