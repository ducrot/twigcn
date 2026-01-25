import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLElement> {
    static targets = ['trigger', 'content'];
    static values = {
        delay: { type: Number, default: 200 },
        side: { type: String, default: 'top' },
    };

    declare readonly triggerTarget: HTMLElement;
    declare readonly contentTarget: HTMLElement;
    declare readonly hasContentTarget: boolean;
    declare readonly hasTriggerTarget: boolean;
    declare delayValue: number;
    declare sideValue: string;

    private showTimeout: number | null = null;
    private hideTimeout: number | null = null;

    show(): void {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        this.showTimeout = window.setTimeout(() => {
            if (this.hasContentTarget) {
                this.positionTooltip();
                this.contentTarget.classList.add('visible');
                this.contentTarget.setAttribute('data-state', 'open');
            }
        }, this.delayValue);
    }

    hide(): void {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }

        this.hideTimeout = window.setTimeout(() => {
            if (this.hasContentTarget) {
                this.contentTarget.classList.remove('visible');
                this.contentTarget.setAttribute('data-state', 'closed');
            }
        }, 100);
    }

    private positionTooltip(): void {
        if (!this.hasTriggerTarget || !this.hasContentTarget) return;

        const trigger = this.triggerTarget;
        const tooltip = this.contentTarget;
        const side = this.sideValue;

        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (side) {
            case 'top':
                top = -tooltipRect.height - 8;
                left = (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = triggerRect.height + 8;
                left = (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = (triggerRect.height - tooltipRect.height) / 2;
                left = -tooltipRect.width - 8;
                break;
            case 'right':
                top = (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.width + 8;
                break;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }

    disconnect(): void {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
    }
}
