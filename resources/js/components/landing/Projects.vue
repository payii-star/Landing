<template>
  <div class="modal-body">
    <form @submit.prevent="handleSubmit">
      <!-- Input Judul Project (WAJIB) -->
      <div class="mb-3">
        <label class="form-label font-weight-bold">Judul Project <span class="text-danger">*</span></label>
        <input 
          v-model="form.title" 
          type="text" 
          class="form-control" 
          placeholder="Masukkan judul project" 
          required 
        />
      </div>

      <!-- Kategori -->
      <div class="mb-3">
        <label class="form-label font-weight-bold">Kategori</label>
        <select v-model="form.category" class="form-select">
          <option value="web">Web Application</option>
          <option value="mobile">Mobile Application</option>
        </select>
      </div>

      <!-- Deskripsi -->
      <div class="mb-3">
        <label class="form-label font-weight-bold">Deskripsi</label>
        <textarea 
          v-model="form.description" 
          class="form-control" 
          rows="3" 
          placeholder="Masukkan deskripsi project"
        ></textarea>
      </div>

      <!-- URL Project -->
      <div class="mb-3">
        <label class="form-label font-weight-bold">URL Project</label>
        <input 
          v-model="form.url" 
          type="text" 
          class="form-control" 
          placeholder="https://..." 
        />
      </div>

      <!-- Urutan & Featured -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label font-weight-bold">Urutan</label>
          <input v-model.number="form.urutan" type="number" class="form-control" />
        </div>
        <div class="col-md-6 d-flex align-items-center mt-4">
          <div class="form-check form-switch">
            <input 
              v-model="form.is_featured" 
              class="form-check-input" 
              type="checkbox" 
              id="isFeaturedSwitch" 
            />
            <label class="form-check-label" for="isFeaturedSwitch">Featured Project</label>
          </div>
        </div>
      </div>

      <!-- FilePond (Tanpa properti server agar tidak auto-upload) -->
      <div class="mb-3">
        <label class="form-label font-weight-bold">Thumbnail / Gambar</label>
        <file-pond
          ref="pondRef"
          label-idle="Seret & Lepas foto atau <span class='filepond--label-action'>Cari</span>"
          :allow-multiple="false"
          accepted-file-types="image/jpeg, image/png, image/webp"
        />
      </div>

      <div class="text-end mt-4">
        <button type="button" class="btn btn-secondary me-2" @click="$emit('close')">Batal</button>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const emit = defineEmits(['close', 'success'])

const props = defineProps({
  projectData: {
    type: Object,
    default: null
  }
})

const pondRef = ref(null)
const loading = ref(false)
const isEditMode = ref(!!props.projectData?.id)

const form = reactive({
  id: props.projectData?.id || null,
  title: props.projectData?.title || '',
  category: props.projectData?.category || 'web',
  description: props.projectData?.description || '',
  url: props.projectData?.url || '',
  urutan: props.projectData?.urutan || 1,
  is_featured: props.projectData?.is_featured || false,
})

const handleSubmit = async () => {
  if (!form.title.trim()) {
    alert('Judul project wajib diisi!');
    return;
  }

  loading.value = true;

  try {
    const formData = new FormData();
    
    // Bind field data
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('url', form.url);
    formData.append('urutan', form.urutan);
    formData.append('is_featured', form.is_featured ? '1' : '0');

    // Ambil file dari komponen FilePond jika pengguna memilih file baru
    if (pondRef.value && pondRef.value.getFile()) {
      const pondItem = pondRef.value.getFile();
      if (pondItem && pondItem.file) {
        formData.append('thumbnail', pondItem.file);
      }
    }

    const endpoint = isEditMode.value 
      ? `/api/master/projects/${form.id}`
      : '/api/master/projects';

    await axios.post(endpoint, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data' 
      }
    });

    alert('Data project berhasil disimpan!');
    emit('success');
    emit('close');
  } catch (error) {
    console.error('Submit Error:', error.response?.data);
    const serverMessage = error.response?.data?.message || 'Gagal menyimpan data';
    alert(`Error: ${serverMessage}`);
  } finally {
    loading.value = false;
  }
}
</script>