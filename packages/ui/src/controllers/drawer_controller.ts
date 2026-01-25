import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLDialogElement> {
    static values = {
        side: { type: String, default: 'right' },
        closeOnBackdrop: { type: Boolean, default: true },
    };

    declare sideValue: string;
    declare closeOnBackdropValue: boolean;

    connect(): void {
        // Close drawer when clicking on backdrop
        this.element.addEventListener('click', this.handleBackdropClick.bind(this));

        // Handle close event
        this.element.addEventListener('close', this.handleClose.bind(this));
    }

    open(): void {
        this.element.showModal();
        document.body.style.overflow = 'hidden';

        // Trigger animation
        requestAnimationFrame(() => {
            this.element.classList.add('open');
        });
    }

    close(): void {
        this.element.classList.remove('open');

        // Wait for animation to complete before closing
        setTimeout(() => {
            this.element.close();
        }, 200);
    }

    private handleBackdropClick(event: MouseEvent): void {
        if (!this.closeOnBackdropValue) {
            return;
        }

        // If click target is the dialog itself (not children), it's a backdrop click
        if (event.target === this.element) {
            this.close();
        }
    }

    private handleClose(): void {
        document.body.style.overflow = '';
        this.element.classList.remove('open');
    }
}
