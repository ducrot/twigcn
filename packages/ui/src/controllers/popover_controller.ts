import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLElement> {
    static targets = ['trigger', 'content'];

    declare readonly triggerTarget: HTMLElement;
    declare readonly contentTarget: HTMLElement;
    declare readonly hasContentTarget: boolean;

    private backdrop: HTMLElement | null = null;
    private escapeHandler!: (event: KeyboardEvent) => void;
    private popoverEventHandler!: (event: Event) => void;

    connect(): void {
        this.escapeHandler = this.handleEscape.bind(this);
        this.popoverEventHandler = this.handlePopoverEvent.bind(this);
        document.addEventListener('popover:open', this.popoverEventHandler);
    }

    disconnect(): void {
        document.removeEventListener('popover:open', this.popoverEventHandler);
        this.removeBackdrop();
    }

    toggle(event: Event): void {
        event.stopPropagation();
        const isExpanded = this.triggerTarget.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            this.close();
        } else {
            this.open();
        }
    }

    open(): void {
        if (!this.hasContentTarget) return;

        // Notify other popovers to close
        document.dispatchEvent(new CustomEvent('popover:open', {
            detail: { source: this.element }
        }));

        this.createBackdrop();
        this.triggerTarget.setAttribute('aria-expanded', 'true');
        this.contentTarget.setAttribute('aria-hidden', 'false');

        document.addEventListener('keydown', this.escapeHandler);
    }

    close(focusOnTrigger = true): void {
        if (!this.hasContentTarget) return;
        if (this.triggerTarget.getAttribute('aria-expanded') === 'false') return;

        this.removeBackdrop();
        this.triggerTarget.setAttribute('aria-expanded', 'false');
        this.contentTarget.setAttribute('aria-hidden', 'true');

        if (focusOnTrigger) {
            this.triggerTarget.focus();
        }

        document.removeEventListener('keydown', this.escapeHandler);
    }

    private createBackdrop(): void {
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'fixed inset-0 z-40';
        this.backdrop.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.close();
        });
        document.body.appendChild(this.backdrop);

        // Ensure popover content is above backdrop
        this.contentTarget.style.zIndex = '50';
    }

    private removeBackdrop(): void {
        if (this.backdrop) {
            this.backdrop.remove();
            this.backdrop = null;
        }
    }

    private handlePopoverEvent(event: Event): void {
        const customEvent = event as CustomEvent;
        if (customEvent.detail.source !== this.element) {
            this.close(false);
        }
    }

    private handleEscape(event: KeyboardEvent): void {
        if (event.key === 'Escape') {
            this.close();
        }
    }
}
