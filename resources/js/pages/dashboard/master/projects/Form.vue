<script setup lang="ts">
import { ref, watch } from "vue";
import * as Yup from "yup";
import type { Project } from "@/types";

const props = defineProps({
    selected: {
        type: String,
        default: null,
    },
});

const emit = defineEmits(["close", "refresh"]);

const project = ref<Project>({
    title: "",
    description: "",
    url: "",
    is_featured: false,
    urutan: 1,
} as Project);

const fileTypes = ref(["image/jpeg", "image/png", "image/jpg"]);
const thumbnail = ref<any>([]);
const formRef = ref();

const formSchema = Yup.object().shape({
    title: Yup.string().required("Title harus diisi"),
    description: Yup.string().nullable(),
    url: Yup.string().url("URL harus valid").nullable(),
    urutan: Yup.number()
        .typeError("Urutan harus angka")
        .required("Urutan harus diisi"),
});

function getEdit() {
    // TODO: ganti dengan ApiService.get("master/projects", props.selected)
    // setelah endpoint backend-nya siap. Untuk sekarang cuma placeholder
    // supaya form Edit tetap kebuka tanpa error.
    console.log("getEdit (dummy) untuk uuid:", props.selected);
}

function submit() {
    const payload = {
        title: project.value.title,
        description: project.value.description,
        url: project.value.url,
        is_featured: project.value.is_featured,
        urutan: project.value.urutan,
        thumbnail: thumbnail.value.length ? thumbnail.value[0].file : null,
    };

    // TODO: ganti console.log ini dengan axios POST/PUT ke
    // /master/projects/store atau /master/projects/{uuid} setelah
    // endpoint backend-nya siap (pola sama seperti Form.vue Users).
    console.log("submit project (dummy):", payload);

    emit("close");
    emit("refresh");
}

watch(
    () => props.selected,
    () => {
        if (props.selected) {
            getEdit();
        }
    },
    { immediate: true }
);
</script>

<template>
    <VForm
        class="form card mb-10"
        @submit="submit"
        :validation-schema="formSchema"
        id="form-project"
        ref="formRef"
    >
        <div class="card-header align-items-center">
            <h2 class="mb-0">{{ selected ? "Edit" : "Tambah" }} Project</h2>
            <button
                type="button"
                class="btn btn-sm btn-light-danger ms-auto"
                @click="emit('close')"
            >
                Batal
                <i class="la la-times-circle p-0"></i>
            </button>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6 required">
                            Title
                        </label>
                        <Field
                            class="form-control form-control-lg form-control-solid"
                            type="text"
                            name="title"
                            autocomplete="off"
                            v-model="project.title"
                            placeholder="Masukkan judul project"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="title" />
                            </div>
                        </div>
                    </div>
                    <!--end::Input group-->
                </div>
                <div class="col-md-6">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6">
                            URL Project
                        </label>
                        <Field
                            class="form-control form-control-lg form-control-solid"
                            type="text"
                            name="url"
                            autocomplete="off"
                            v-model="project.url"
                            placeholder="https://..."
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="url" />
                            </div>
                        </div>
                    </div>
                    <!--end::Input group-->
                </div>
                <div class="col-md-12">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6">
                            Deskripsi
                        </label>
                        <Field
                            as="textarea"
                            class="form-control form-control-lg form-control-solid"
                            name="description"
                            rows="3"
                            v-model="project.description"
                            placeholder="Deskripsi singkat project"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="description" />
                            </div>
                        </div>
                    </div>
                    <!--end::Input group-->
                </div>
                <div class="col-md-6">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6">
                            Thumbnail
                        </label>
                        <!--begin::Input-->
                        <file-upload
                            :files="thumbnail"
                            :accepted-file-types="fileTypes"
                            v-on:updatefiles="(file) => (thumbnail = file)"
                        ></file-upload>
                        <!--end::Input-->
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="thumbnail" />
                            </div>
                        </div>
                    </div>
                    <!--end::Input group-->
                </div>
                <div class="col-md-3">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6 required">
                            Urutan
                        </label>
                        <Field
                            class="form-control form-control-lg form-control-solid"
                            type="number"
                            name="urutan"
                            autocomplete="off"
                            v-model="project.urutan"
                            placeholder="1"
                        />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                                <ErrorMessage name="urutan" />
                            </div>
                        </div>
                    </div>
                    <!--end::Input group-->
                </div>
                <div class="col-md-3">
                    <!--begin::Input group-->
                    <div class="fv-row mb-7">
                        <label class="form-label fw-bold fs-6">
                            Featured
                        </label>
                        <div class="form-check form-switch form-check-custom form-check-solid mt-3">
                            <Field
                                class="form-check-input"
                                type="checkbox"
                                name="is_featured"
                                v-model="project.is_featured"
                                :value="true"
                                :unchecked-value="false"
                            />
                            <label class="form-check-label">
                                {{ project.is_featured ? "Ya" : "Tidak" }}
                            </label>
                        </div>
                    </div>
                    <!--end::Input group-->
                </div>
            </div>
        </div>
        <div class="card-footer d-flex">
            <button type="submit" class="btn btn-primary btn-sm ms-auto">
                Simpan
            </button>
        </div>
    </VForm>
</template>