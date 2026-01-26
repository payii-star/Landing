import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export interface Invoice {
    id: number;
    invoice_number: string;
    amount: number;
    status: string;
    date: string;
}

export const useFinanceStore = defineStore("finance", () => {
    const invoices = ref<Invoice[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Fungsi untuk mengambil Data Tagihan/Invoice
    async function fetchInvoices() {
        loading.value = true;
        error.value = null;

        try {
            // Pastikan URL ini sesuai dengan route di api.php Laravel Anda
            // Contoh: Route::get('portal/finance/invoices', ...)
            const response = await ApiService.get("portal/finance/invoices");

            // Sesuaikan dengan struktur JSON dari backend
            invoices.value = response.data.data || response.data;
        } catch (err: any) {
            error.value =
                err.response?.data?.message || "Gagal memuat data keuangan";
            console.error(err);
        } finally {
            loading.value = false;
        }
    }

    return {
        invoices,
        loading,
        error,
        fetchInvoices,
    };
});
