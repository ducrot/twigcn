import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLElement> {
    static targets = ['item'];
    static values = {
        type: { type: String, default: 'single' },
        collapsible: { type: Boolean, default: true },
    };

    declare readonly itemTargets: HTMLDetailsElement[];
    declare typeValue: string;
    declare collapsibleValue: boolean;

    connect(): void {
        // Listen for toggle events on each details element
        this.itemTargets.forEach((item) => {
            item.addEventListener('toggle', this.handleToggle.bind(this));
        });
    }

    disconnect(): void {
        this.itemTargets.forEach((item) => {
            item.removeEventListener('toggle', this.handleToggle.bind(this));
        });
    }

    private handleToggle(event: Event): void {
        const item = event.target as HTMLDetailsElement;

        // Only handle when opening in single mode
        if (item.open && this.typeValue === 'single') {
            this.itemTargets.forEach((otherItem) => {
                if (otherItem !== item && otherItem.open) {
                    otherItem.open = false;
                }
            });
        }
    }
}
