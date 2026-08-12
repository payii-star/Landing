import type { Directive } from "vue";
import { Tooltip } from "bootstrap";

export const tooltip: Directive<HTMLElement> = {
    mounted(el) {
        const instance = new Tooltip(el, {
            trigger: "hover",
        });
        (el as any)._tooltipInstance = instance;
    },
    updated(el) {
        const instance = (el as any)._tooltipInstance as Tooltip | undefined;
        if (instance) {
            instance.setContent({ ".tooltip-inner": el.getAttribute("title") || "" });
        }
    },
    unmounted(el) {
        const instance = (el as any)._tooltipInstance as Tooltip | undefined;
        if (instance) instance.dispose();
    },
};