import type { App } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import Paginate from "@/components/Paginate.vue";
import FileUpload from "@/components/FileUpload.vue";

/**
 * Banyak file Form.vue / Index.vue di project ini (Users, Projects,
 * Statistics, dll) memakai <VForm>, <Field>, <ErrorMessage>, <paginate>,
 * dan <file-upload> di template TANPA meng-import komponen itu satu
 * per satu. Sebelumnya komponen-komponen ini TIDAK PERNAH didaftarkan
 * secara global, sehingga Vue gagal me-resolve semuanya
 * ("Failed to resolve component: VForm", dst) dan input jadi tidak
 * bisa diklik/diketik sama sekali.
 *
 * Plugin ini mendaftarkan semuanya sekali di level aplikasi, supaya
 * semua Form.vue yang sudah ada (dan yang akan dibuat nanti) otomatis
 * bisa langsung pakai tag-tag ini tanpa import ulang.
 *
 * CATATAN: "select2" SENGAJA tidak didaftarkan di sini. Paket
 * vue3-select2-component punya bug interop jQuery/ESM ("does not
 * provide an export named 'default'") yang bikin seluruh app crash
 * saat di-import lewat Vite dev server. Karena form Projects & Statistics
 * tidak memakai <select2>, ini aman untuk sementara ditunda dan
 * ditangani terpisah (misalnya ganti ke library select yang native-ESM,
 * atau perbaiki cara importnya) tanpa menghambat kerjaan Projects/Statistics.
 */
export function initGlobalComponents(app: App) {
    app.component("VForm", Form);
    app.component("Field", Field);
    app.component("ErrorMessage", ErrorMessage);
    app.component("paginate", Paginate);
    app.component("file-upload", FileUpload);
}