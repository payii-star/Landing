import type { Directive } from "vue";

export const debounce: Directive<HTMLElement, () => void> = {
    mounted(el, binding) {
        const delay = binding.arg ? parseInt(binding.arg) : 400;
        let timer: ReturnType<typeof setTimeout> | null = null;

        const handler = () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                binding.value();
            }, delay);
        };

        (el as any)._debounceHandler = handler;
        el.addEventListener("input", handler);
    },
    unmounted(el) {
        const handler = (el as any)._debounceHandler;
        if (handler) el.removeEventListener("input", handler);
    },
};