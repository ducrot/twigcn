import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLElement> {
    static targets = ['input', 'trigger', 'label'];
    static values = {
        placeholder: { type: String, default: 'Select option...' },
    };

    declare readonly inputTarget: HTMLInputElement;
    declare readonly triggerTarget: HTMLElement;
    declare readonly labelTarget: HTMLElement;
    declare readonly hasInputTarget: boolean;
    declare readonly hasLabelTarget: boolean;
    declare placeholderValue: string;

    select(event: Event): void {
        const target = event.currentTarget as HTMLElement;
        const value = target.dataset.comboboxValueParam || '';
        const label = target.dataset.comboboxLabelParam || '';

        if (this.hasInputTarget) {
            this.inputTarget.value = value;
        }

        if (this.hasLabelTarget) {
            this.labelTarget.textContent = label || this.placeholderValue;
        }

        // Update trigger aria-expanded
        this.triggerTarget.setAttribute('aria-expanded', 'false');

        // Close the popover
        const popover = this.element.querySelector('[data-controller="popover"]');
        if (popover) {
            const popoverController = this.application.getControllerForElementAndIdentifier(
                popover,
                'popover'
            );
            if (popoverController && typeof (popoverController as any).close === 'function') {
                (popoverController as any).close();
            }
        }

        // Update selected state on items
        this.element.querySelectorAll('.combobox-item').forEach((item) => {
            const itemValue = (item as HTMLElement).dataset.comboboxValueParam;
            const checkIcon = item.querySelector('svg');

            if (itemValue === value) {
                checkIcon?.classList.remove('opacity-0');
                checkIcon?.classList.add('opacity-100');
            } else {
                checkIcon?.classList.add('opacity-0');
                checkIcon?.classList.remove('opacity-100');
            }
        });

        // Dispatch change event
        this.dispatch('change', { detail: { value, label } });
    }

    clear(): void {
        if (this.hasInputTarget) {
            this.inputTarget.value = '';
        }

        if (this.hasLabelTarget) {
            this.labelTarget.textContent = this.placeholderValue;
        }

        // Reset all check icons
        this.element.querySelectorAll('.combobox-item svg').forEach((icon) => {
            icon.classList.add('opacity-0');
            icon.classList.remove('opacity-100');
        });

        this.dispatch('change', { detail: { value: '', label: '' } });
    }
}
