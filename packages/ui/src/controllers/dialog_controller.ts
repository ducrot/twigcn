import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLDialogElement> {
    static values = {
        closeOnBackdrop: { type: Boolean, default: true },
    };

    declare closeOnBackdropValue: boolean;

    connect(): void {
        // Close dialog when clicking on backdrop
        this.element.addEventListener('click', this.handleBackdropClick.bind(this));

        // Handle close event
        this.element.addEventListener('close', this.handleClose.bind(this));
    }

    open(): void {
        this.element.showModal();
        document.body.style.overflow = 'hidden';
    }

    close(): void {
        this.element.close();
    }

    private handleBackdropClick(event: MouseEvent): void {
        if (!this.closeOnBackdropValue) {
            return;
        }

        const rect = this.element.getBoundingClientRect();
        const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
            this.close();
        }
    }

    private handleClose(): void {
        document.body.style.overflow = '';
    }
}
