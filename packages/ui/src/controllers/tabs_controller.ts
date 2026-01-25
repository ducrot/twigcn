import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLElement> {
    static targets = ['trigger', 'content'];
    static values = {
        default: { type: String, default: '' },
        storageKey: { type: String, default: '' },
    };

    declare readonly triggerTargets: HTMLElement[];
    declare readonly contentTargets: HTMLElement[];
    declare defaultValue: string;
    declare storageKeyValue: string;

    private activeTab: string = '';

    connect(): void {
        // Try to restore from localStorage first, then fall back to default
        const stored = this.storageKeyValue
            ? localStorage.getItem(this.storageKeyValue)
            : null;
        const defaultTab =
            stored ||
            this.defaultValue ||
            this.triggerTargets[0]?.dataset.tabsValue ||
            '';
        if (defaultTab) {
            this.activate(defaultTab);
        }
    }

    select(event: Event): void {
        const target = event.currentTarget as HTMLElement;
        const value = target.dataset.tabsValue;

        if (value) {
            this.activate(value);
        }
    }

    private activate(value: string): void {
        this.activeTab = value;

        // Persist to localStorage if storageKey is set
        if (this.storageKeyValue) {
            localStorage.setItem(this.storageKeyValue, value);
        }

        // Update triggers
        this.triggerTargets.forEach((trigger) => {
            const isActive = trigger.dataset.tabsValue === value;
            trigger.setAttribute('aria-selected', isActive.toString());
            trigger.setAttribute('data-state', isActive ? 'active' : 'inactive');

            if (isActive) {
                trigger.classList.add('active');
            } else {
                trigger.classList.remove('active');
            }
        });

        // Update content panels
        this.contentTargets.forEach((content) => {
            const isActive = content.dataset.tabsValue === value;
            content.hidden = !isActive;
            content.setAttribute('data-state', isActive ? 'active' : 'inactive');
        });
    }

    // Keyboard navigation
    keydown(event: KeyboardEvent): void {
        const currentIndex = this.triggerTargets.findIndex(
            (trigger) => trigger.dataset.tabsValue === this.activeTab
        );

        let newIndex = currentIndex;

        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = this.triggerTargets.length - 1;
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                newIndex = currentIndex + 1;
                if (newIndex >= this.triggerTargets.length) newIndex = 0;
                break;
            case 'Home':
                newIndex = 0;
                break;
            case 'End':
                newIndex = this.triggerTargets.length - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        const newTrigger = this.triggerTargets[newIndex];
        const newValue = newTrigger?.dataset.tabsValue;

        if (newValue) {
            this.activate(newValue);
            newTrigger.focus();
        }
    }
}
