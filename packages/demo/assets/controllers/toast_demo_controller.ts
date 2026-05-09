import { Controller } from '@hotwired/stimulus';
import type { ToasterController } from '@ducrot/twigcn-ui';

export default class extends Controller<HTMLElement> {
    static outlets = ['toaster'];

    declare readonly toasterOutlet: ToasterController;
    declare readonly hasToasterOutlet: boolean;

    showDefault(): void {
        this.toasterOutlet.toast({
            title: 'Notification',
            description: 'This is a default toast message.',
        });
    }

    showSuccess(): void {
        this.toasterOutlet.toast({
            title: 'Success!',
            description: 'Your changes have been saved.',
            variant: 'success',
        });
    }

    showError(): void {
        this.toasterOutlet.toast({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: 'destructive',
        });
    }

    showWarning(): void {
        this.toasterOutlet.toast({
            title: 'Warning',
            description: 'Please review your settings before continuing.',
            variant: 'warning',
        });
    }

    showWithAction(): void {
        this.toasterOutlet.toast({
            title: 'Item deleted',
            description: 'The item has been moved to trash.',
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo clicked'),
            },
        });
    }

    changePosition(event: Event): void {
        const button = event.currentTarget as HTMLElement;
        const position = button.dataset.position;
        if (!position) return;

        this.toasterOutlet.setPosition(position);

        for (const btn of this.element.querySelectorAll<HTMLElement>('[data-position]')) {
            btn.classList.toggle('bg-accent', btn === button);
        }
    }
}
