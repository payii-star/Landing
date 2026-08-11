<script setup lang="ts">
import { ref, watch } from "vue";
import Form from "./Form.vue";
import type { Project } from "@/types";

const selected = ref<string>("");
const openForm = ref<boolean>(false);

// TODO: ganti dengan data dari API (GET /master/projects) setelah backend siap.
// Untuk sekarang pakai data dummy biar tampilan & alur CRUD-nya bisa dites duluan.
const projects = ref<Project[]>([
    {
        uuid: "dummy-1",
        title: "Website Profil Desa",
        description: "Landing page profil dan potensi desa.",
        thumbnail: "media/stock/dummy-project-1.jpg",
        url: "https://example.com/project-1",
        is_featured: true,
        urutan: 1,
    },
    {
        uuid: "dummy-2",
        title: "Aplikasi Layanan Surat Online",
        description: "Sistem pengajuan surat administrasi warga.",
        thumbnail: "media/stock/dummy-project-2.jpg",
        url: "https://example.com/project-2",
        is_featured: false,
        urutan: 2,
    },
    {
        uuid: "dummy-3",
        title: "Sistem Informasi UMKM",
        description: "Pendataan dan promosi UMKM lokal.",
        thumbnail: "media/stock/dummy-project-3.jpg",
        url: "https://example.com/project-3",
        is_featured: true,
        urutan: 3,
    },
    {
        uuid: "dummy-4",
        title: "Dashboard Statistik Penduduk",
        description: "Visualisasi data kependudukan real-time.",
        thumbnail: "media/stock/dummy-project-4.jpg",
        url: "https://example.com/project-4",
        is_featured: false,
        urutan: 4,
    },
]);

function edit(project: Project) {
    selected.value = project.uuid as string;
    openForm.value = true;
}

function remove(project: Project) {
    if (!confirm(`Hapus project "${project.title}"?`)) return;
    // TODO: ganti dengan panggilan API DELETE /master/projects/{uuid}
    projects.value = projects.value.filter((p) => p.uuid !== project.uuid);
}

const refresh = () => {
    // TODO: refetch dari API setelah backend siap
};

watch(openForm, (val) => {
    if (!val) {
        selected.value = "";
    }
    window.scrollTo(0, 0);
});
</script>

<template>
    <Form
        :selected="selected"
        @close="openForm = false"
        v-if="openForm"
        @refresh="refresh"
    />

    <div class="card">
        <div class="card-header align-items-center">
            <h2 class="mb-0">List Projects</h2>
            <button
                type="button"
                class="btn btn-sm btn-primary ms-auto"
                v-if="!openForm"
                @click="openForm = true"
            >
                Tambah
                <i class="la la-plus"></i>
            </button>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table
                    class="table table-rounded table-hover table-striped border gy-7 gs-7"
                >
                    <thead class="bg-gray-200">
                        <tr
                            class="fw-bolder fs-6 text-gray-800 border-bottom border-gray-200"
                        >
                            <th class="py-4">#</th>
                            <th class="py-4">Thumbnail</th>
                            <th class="py-4">Title</th>
                            <th class="py-4">Featured</th>
                            <th class="py-4">Urutan</th>
                            <th class="py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="projects.length">
                            <tr
                                v-for="(project, index) in projects"
                                :key="project.uuid"
                            >
                                <td class="py-4">{{ index + 1 }}</td>
                                <td class="py-4">
                                    <img
                                        :src="project.thumbnail"
                                        :alt="project.title"
                                        class="rounded"
                                        style="
                                            width: 60px;
                                            height: 60px;
                                            object-fit: cover;
                                        "
                                        onerror="this.src='https://placehold.co/60x60?text=No+Image'"
                                    />
                                </td>
                                <td class="py-4">{{ project.title }}</td>
                                <td class="py-4">
                                    <span
                                        class="badge"
                                        :class="
                                            project.is_featured
                                                ? 'badge-light-success'
                                                : 'badge-light-secondary'
                                        "
                                    >
                                        {{
                                            project.is_featured
                                                ? "Featured"
                                                : "Biasa"
                                        }}
                                    </span>
                                </td>
                                <td class="py-4">{{ project.urutan }}</td>
                                <td class="py-4">
                                    <div class="d-flex gap-2">
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-icon btn-info"
                                            @click="edit(project)"
                                        >
                                            <i class="la la-pencil fs-2"></i>
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-icon btn-danger"
                                            @click="remove(project)"
                                        >
                                            <i class="la la-trash fs-2"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="6" class="text-center py-4">
                                Data tidak ditemukan
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>