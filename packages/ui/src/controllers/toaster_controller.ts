import { Controller } from '@hotwired/stimulus';

interface ToastOptions {
    title?: string;
    description?: string;
    variant?: 'default' | 'success' | 'destructive' | 'warning';
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

type ToastVariant = ToastOptions['variant'];

const HORIZONTAL_ALIGN_MAP: Record<string, string> = {
    left: 'start',
    right: 'end',
    center: 'center',
};

const CLOSE_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

export default class extends Controller<HTMLElement> {
    static values = {
        duration: { type: Number, default: 5000 },
        position: { type: String, default: 'bottom-right' },
    };

    declare durationValue: number;
    declare positionValue: string;

    private toasts = new Map<string, HTMLElement>();
    private actionCallbacks = new Map<string, () => void>();

    connect(): void {
        this.element.addEventListener('click', this.handleClick);
    }

    disconnect(): void {
        this.element.removeEventListener('click', this.handleClick);
    }

    toast(options: ToastOptions): string {
        const id = this.generateId();
        const toast = this.createToastElement(id, options);

        if (options.action?.onClick) {
            this.actionCallbacks.set(id, options.action.onClick);
        }

        this.element.appendChild(toast);
        this.toasts.set(id, toast);

        requestAnimationFrame(() => toast.classList.add('toast-enter'));

        const duration = options.duration ?? this.durationValue;
        if (duration > 0) {
            setTimeout(() => this.dismiss(id), duration);
        }

        return id;
    }

    dismiss(id: string): void {
        const toast = this.toasts.get(id);
        if (!toast) return;

        this.toasts.delete(id);
        this.actionCallbacks.delete(id);
        toast.remove();
    }

    dismissAll(): void {
        for (const id of this.toasts.keys()) {
            this.dismiss(id);
        }
    }

    setPosition(position: string): void {
        const [vertical, horizontal] = position.split('-');
        const isTop = vertical === 'top';

        this.element.dataset.align = HORIZONTAL_ALIGN_MAP[horizontal] ?? 'center';
        this.element.classList.toggle('top-0', isTop);
        this.element.classList.toggle('bottom-0', !isTop);
        this.element.classList.toggle('flex-col', isTop);
        this.element.classList.toggle('flex-col-reverse', !isTop);

        this.positionValue = position;
    }

    private handleClick = (event: Event): void => {
        const target = event.target as HTMLElement;
        const button = target.closest<HTMLElement>('[data-toast-cancel], [data-toast-action]');
        if (!button) return;

        const toastId = button.dataset.toastId;
        if (!toastId) return;

        if (button.hasAttribute('data-toast-action')) {
            this.actionCallbacks.get(toastId)?.();
            this.actionCallbacks.delete(toastId);
            this.dispatch('action', { detail: { id: toastId } });
        }

        this.dismiss(toastId);
    };

    private createToastElement(id: string, options: ToastOptions): HTMLElement {
        const toast = document.createElement('div');
        toast.id = id;
        toast.className = this.buildToastClassName(options.variant);
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');

        toast.innerHTML = `
            <div class="toast-content">
                ${this.buildContentSection(options)}
                ${this.buildFooter(id, options.action)}
            </div>
        `;

        return toast;
    }

    private buildToastClassName(variant: ToastVariant): string {
        if (!variant || variant === 'default') {
            return 'toast';
        }
        return `toast toast-${variant}`;
    }

    private buildContentSection(options: ToastOptions): string {
        if (!options.title && !options.description) {
            return '';
        }

        const title = options.title ? `<h2>${this.escapeHtml(options.title)}</h2>` : '';
        const description = options.description ? `<p>${this.escapeHtml(options.description)}</p>` : '';

        return `<section>${title}${description}</section>`;
    }

    private buildFooter(id: string, action?: ToastOptions['action']): string {
        const actionButton = action
            ? `<button type="button" class="btn-sm-outline" data-toast-action data-toast-id="${id}">${this.escapeHtml(action.label)}</button>`
            : '';

        const closeButton = `<button type="button" class="cursor-pointer" aria-label="Close" data-toast-cancel data-toast-id="${id}">${CLOSE_ICON_SVG}</button>`;

        return `<footer>${actionButton}${closeButton}</footer>`;
    }

    private generateId(): string {
        return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
