<script setup lang="ts">
import { ref } from "vue";
import * as Yup from "yup";
import type { FooterSetting, FooterSocial } from "@/types";

// =========================================================
// SECTION 1: Company Info (Footer Setting)
// =========================================================
// TODO: ganti dengan data dari API (GET /footer/setting) setelah
// backend-nya siap. Untuk sekarang pakai data dummy biar tampilan
// & alur formnya bisa dites duluan.
const footer = ref<FooterSetting>({
    company_name: "Mcflyon Teknologi Indonesia",
    description:
        "Konsultan Informasi Teknologi | Jasa Pembuatan Aplikasi | Pembuatan Website.",
    address:
        "JL. Dk. Bungkal no 25b Gang II RT.010 RW.003 Kel. Sambikerep Kec. Sambikerep Kota Surabaya",
    email: "admin@mcflyon.co.id",
    phone: "0897-7266-144",
    copyright: `© ${new Date().getFullYear()} Mcflyon Teknologi Indonesia. All rights reserved.`,
});

const formSchema = Yup.object().shape({
    company_name: Yup.string().required("Nama perusahaan harus diisi"),
    description: Yup.string().required("Deskripsi harus diisi"),
    address: Yup.string().nullable(),
    email: Yup.string().email("Email harus valid").nullable(),
    phone: Yup.string().nullable(),
    copyright: Yup.string().nullable(),
});

function submitFooter() {
    // TODO: ganti console.log ini dengan axios POST ke /footer/setting
    // setelah endpoint backend-nya siap.
    console.log("submit footer setting (dummy):", footer.value);
}

// =========================================================
// SECTION 2: Social Media Links
// =========================================================
const socials = ref<FooterSocial[]>([
    {
        uuid: "social-1",
        platform: "Instagram",
        url: "https://www.instagram.com/mcflyon.id/",
    },
]);

const socialForm = ref<FooterSocial>({ platform: "", url: "" });
const editingUuid = ref<string>("");
const showSocialForm = ref<boolean>(false);

function addSocial() {
    socialForm.value = { platform: "", url: "" };
    editingUuid.value = "";
    showSocialForm.value = true;
}

function editSocial(social: FooterSocial) {
    socialForm.value = { ...social };
    editingUuid.value = social.uuid as string;
    showSocialForm.value = true;
}

function cancelSocialForm() {
    showSocialForm.value = false;
    socialForm.value = { platform: "", url: "" };
    editingUuid.value = "";
}

function submitSocial() {
    if (!socialForm.value.platform || !socialForm.value.url) {
        return;
    }

    // TODO: ganti dengan axios POST/PUT ke /footer/socials setelah
    // endpoint backend-nya siap.
    console.log("submit social (dummy):", socialForm.value);

    if (editingUuid.value) {
        const idx = socials.value.findIndex(
            (s) => s.uuid === editingUuid.value
        );
        if (idx !== -1) {
            socials.value[idx] = { ...socialForm.value, uuid: editingUuid.value };
        }
    } else {
        socials.value.push({
            ...socialForm.value,
            uuid: `social-${Date.now()}`,
        });
    }

    cancelSocialForm();
}

function removeSocial(social: FooterSocial) {
    if (!confirm(`Hapus social "${social.platform}"?`)) return;
    // TODO: ganti dengan axios DELETE ke /footer/socials/{uuid}
    socials.value = socials.value.filter((s) => s.uuid !== social.uuid);
}
</script>

<template>
    <!--begin::Company Info-->
    <VForm
        class="form card mb-10"
        @submit="submitFooter"
        :validation-schema="formSchema"
        id="form-footer-setting"
    >
        <div class="card-header align-items-center">
            <h2 class="mb-0">Footer - Info Perusahaan</h2>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6 required">
                            Nama Perusahaan
                        </label>
                        <Field
                            class="form-control form-control-lg form-control-solid"
                            type="text"
                            name="company_name"
                            autocomplete="off"
                            v-model="footer.company_name"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="company_name" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6">
                            Email
                        </label>
                        <Field
                            class="form-control form-control-lg form-control-solid"
                            type="text"
                            name="email"
                            autocomplete="off"
                            v-model="footer.email"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6 required">
                            Deskripsi
                        </label>
                        <Field
                            as="textarea"
                            class="form-control form-control-lg form-control-solid"
                            name="description"
                            rows="2"
                            v-model="footer.description"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="description" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6">
                            Alamat
                        </label>
                        <Field
                            as="textarea"
                            class="form-control form-control-lg form-control-solid"
                            name="address"
                            rows="2"
                            v-model="footer.address"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="address" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6">
                            Telepon
                        </label>
                        <Field
                            class="form-control form-control-lg form-control-solid"
                            type="text"
                            name="phone"
                            autocomplete="off"
                            v-model="footer.phone"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="phone" />
                            </div>
                        </div>
                    </div>
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6">
                            Copyright
                        </label>
                        <Field
                            class="form-control form-control-lg form-control-solid"
                            type="text"
                            name="copyright"
                            autocomplete="off"
                            v-model="footer.copyright"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="copyright" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer d-flex">
            <button type="submit" class="btn btn-primary btn-sm ms-auto">
                Simpan
            </button>
        </div>
    </VForm>
    <!--end::Company Info-->

    <!--begin::Socials-->
    <div class="card">
        <div class="card-header align-items-center">
            <h2 class="mb-0">Footer - Social Media</h2>
            <button
                type="button"
                class="btn btn-sm btn-primary ms-auto"
                v-if="!showSocialForm"
                @click="addSocial"
            >
                Tambah
                <i class="la la-plus"></i>
            </button>
        </div>
        <div class="card-body">
            <!--begin::Mini add/edit form-->
            <div
                v-if="showSocialForm"
                class="border rounded p-5 mb-6 bg-light-secondary bg-opacity-25"
            >
                <div class="row align-items-end">
                    <div class="col-md-4">
                        <label class="form-label fw-bold fs-7">
                            Platform
                        </label>
                        <input
                            type="text"
                            class="form-control form-control-solid"
                            v-model="socialForm.platform"
                            placeholder="Instagram, Facebook, dll"
                        />
                    </div>
                    <div class="col-md-5">
                        <label class="form-label fw-bold fs-7">URL</label>
                        <input
                            type="text"
                            class="form-control form-control-solid"
                            v-model="socialForm.url"
                            placeholder="https://..."
                        />
                    </div>
                    <div class="col-md-3 d-flex gap-2">
                        <button
                            type="button"
                            class="btn btn-sm btn-primary"
                            @click="submitSocial"
                        >
                            Simpan
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-light"
                            @click="cancelSocialForm"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            </div>
            <!--end::Mini add/edit form-->

            <div class="table-responsive">
                <table
                    class="table table-rounded table-hover table-striped border gy-7 gs-7"
                >
                    <thead class="bg-gray-200">
                        <tr
                            class="fw-bolder fs-6 text-gray-800 border-bottom border-gray-200"
                        >
                            <th class="py-4">#</th>
                            <th class="py-4">Platform</th>
                            <th class="py-4">URL</th>
                            <th class="py-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="socials.length">
                            <tr
                                v-for="(social, index) in socials"
                                :key="social.uuid"
                            >
                                <td class="py-4">{{ index + 1 }}</td>
                                <td class="py-4">{{ social.platform }}</td>
                                <td class="py-4">{{ social.url }}</td>
                                <td class="py-4">
                                    <div class="d-flex gap-2">
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-icon btn-info"
                                            @click="editSocial(social)"
                                        >
                                            <i class="la la-pencil fs-2"></i>
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-icon btn-danger"
                                            @click="removeSocial(social)"
                                        >
                                            <i class="la la-trash fs-2"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                        <tr v-else>
                            <td colspan="4" class="text-center py-4">
                                Belum ada social media
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!--end::Socials-->
</template>