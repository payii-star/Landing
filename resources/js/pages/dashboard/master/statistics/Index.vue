<script setup lang="ts">
import { ref, watch } from "vue";
import Form from "./Form.vue";
import type { Statistic } from "@/types";

// TODO: nanti diganti fetch dari API (GET /master/statistics) pakai <paginate>,
// sekarang masih pakai data dummy biar UI-nya bisa langsung dicek.
const statistics = ref<Statistic[]>([
    {
        id: 1,
        uuid: "dummy-uuid-1",
        icon: "briefcase",
        statistic: "10+",
        label: "Proyek Selesai",
        urutan: 1,
        is_active: true,
    },
    {
        id: 2,
        uuid: "dummy-uuid-2",
        icon: "users",
        statistic: "8+",
        label: "Klien Terpercaya",
        urutan: 2,
        is_active: true,
    },
    {
        id: 3,
        uuid: "dummy-uuid-3",
        icon: "calendar",
        statistic: "8+",
        label: "Tahun Pengalaman",
        urutan: 3,
        is_active: true,
    },
    {
        id: 4,
        uuid: "dummy-uuid-4",
        icon: "star",
        statistic: "95%",
        label: "Kepuasan Klien",
        urutan: 4,
        is_active: false,
    },
]);

const selected = ref<Statistic | null>(null);
const openForm = ref<boolean>(false);

function onEdit(statistic: Statistic) {
    selected.value = statistic;
    openForm.value = true;
}

function onDelete(statistic: Statistic) {
    // TODO: nanti diganti manggil API DELETE /master/statistics/{uuid}
    if (!confirm(`Hapus statistik "${statistic.label}"?`)) return;

    statistics.value = statistics.value.filter(
        (s: Statistic) => s.uuid !== statistic.uuid
    );
}

function refresh() {
    // TODO: nanti diganti paginateRef.value.refetch() setelah API tersedia
}

watch(openForm, (val) => {
    if (!val) {
        selected.value = null;
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
            <h2 class="mb-0">List Statistics</h2>
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
                    id="table-statistics"
                >
                    <thead class="bg-gray-200">
                        <tr class="fw-bolder fs-6 text-gray-800 border-bottom border-gray-200">
                            <th class="py-4">#</th>
                            <th class="py-4">Icon</th>
                            <th class="py-4">Nilai</th>
                            <th class="py-4">Label</th>
                            <th class="py-4">Urutan</th>
                            <th class="py-4">Status</th>
                            <th class="py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="statistics.length">
                            <tr v-for="(statistic, index) in statistics" :key="statistic.uuid">
                                <td class="py-4">{{ index + 1 }}</td>
                                <td class="py-4">
                                    <i
                                        v-if="statistic.icon"
                                        :class="['fa-solid', `fa-${statistic.icon}`]"
                                        class="fs-2"
                                    ></i>
                                    <span v-else class="text-muted">-</span>
                                </td>
                                <td class="py-4">{{ statistic.statistic }}</td>
                                <td class="py-4">{{ statistic.label }}</td>
                                <td class="py-4">{{ statistic.urutan }}</td>
                                <td class="py-4">
                                    <span
                                        class="badge"
                                        :class="statistic.is_active ? 'badge-light-success' : 'badge-light-danger'"
                                    >
                                        {{ statistic.is_active ? "Aktif" : "Nonaktif" }}
                                    </span>
                                </td>
                                <td class="py-4">
                                    <div class="d-flex gap-2">
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-icon btn-info"
                                            @click="onEdit(statistic)"
                                        >
                                            <i class="la la-pencil fs-2"></i>
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-icon btn-danger"
                                            @click="onDelete(statistic)"
                                        >
                                            <i class="la la-trash fs-2"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="7" class="text-center py-4">
                                Data tidak ditemukan
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>