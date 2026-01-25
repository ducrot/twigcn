import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLElement> {
    static targets = ['input', 'list', 'empty', 'group', 'item'];

    declare readonly inputTarget: HTMLInputElement;
    declare readonly listTarget: HTMLElement;
    declare readonly emptyTarget: HTMLElement;
    declare readonly groupTargets: HTMLElement[];
    declare readonly itemTargets: HTMLElement[];
    declare readonly hasEmptyTarget: boolean;

    private selectedIndex = -1;

    connect(): void {
        this.element.setAttribute('data-command-initialized', '');
        this.element.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    filter(): void {
        const query = this.inputTarget.value.toLowerCase().trim();
        let visibleCount = 0;

        this.itemTargets.forEach((item) => {
            const value = item.dataset.value?.toLowerCase() || '';
            const text = item.textContent?.toLowerCase() || '';
            const matches = value.includes(query) || text.includes(query);

            item.setAttribute('aria-hidden', matches ? 'false' : 'true');
            if (matches) visibleCount++;
        });

        // Update group visibility
        this.groupTargets.forEach((group) => {
            const visibleItems = group.querySelectorAll('[data-command-target="item"]:not([aria-hidden="true"])');
            group.setAttribute('aria-hidden', visibleItems.length === 0 ? 'true' : 'false');
        });

        // Show/hide empty state
        if (this.hasEmptyTarget) {
            this.emptyTarget.setAttribute('aria-hidden', visibleCount > 0 ? 'true' : 'false');
        }

        // Reset selection
        this.selectedIndex = -1;
        this.updateSelection();
    }

    select(event: Event): void {
        const item = (event.currentTarget as HTMLElement).closest(
            '[data-command-target="item"]'
        ) as HTMLElement;

        if (item && !item.hasAttribute('aria-disabled')) {
            this.dispatch('select', { detail: { value: item.dataset.value } });
        }
    }

    private handleKeydown(event: KeyboardEvent): void {
        const visibleItems = this.itemTargets.filter((item) => item.getAttribute('aria-hidden') !== 'true');

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, visibleItems.length - 1);
                this.updateSelection();
                break;

            case 'ArrowUp':
                event.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.updateSelection();
                break;

            case 'Enter':
                event.preventDefault();
                if (this.selectedIndex >= 0) {
                    const selectedItem = visibleItems[this.selectedIndex];
                    if (selectedItem && !selectedItem.hasAttribute('aria-disabled')) {
                        this.dispatch('select', { detail: { value: selectedItem.dataset.value } });
                    }
                }
                break;

            case 'Escape':
                this.inputTarget.blur();
                break;
        }
    }

    private updateSelection(): void {
        const visibleItems = this.itemTargets.filter((item) => item.getAttribute('aria-hidden') !== 'true');

        visibleItems.forEach((item, index) => {
            if (index === this.selectedIndex) {
                item.setAttribute('aria-selected', 'true');
                item.classList.add('active');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.setAttribute('aria-selected', 'false');
                item.classList.remove('active');
            }
        });
    }
}
