import { afterEach, describe, expect, it, vi } from 'vitest';
import ToasterController from '../../src/controllers/toaster_controller';
import { setHTML, startStimulus } from '../helpers';

function fixture(): void {
    setHTML(`<div data-controller="toaster"></div>`);
}

function root(): HTMLElement {
    return document.querySelector<HTMLElement>('[data-controller="toaster"]')!;
}

async function bootController() {
    fixture();
    const app = await startStimulus({ toaster: ToasterController });
    return app.getControllerForElementAndIdentifier(root(), 'toaster') as InstanceType<typeof ToasterController>;
}

describe('toaster_controller', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('toast() appends a role="alert" element with title and description', async () => {
        const ctrl = await bootController();

        const id = ctrl.toast({ title: 'Saved', description: 'All set' });

        const toast = document.getElementById(id)!;
        expect(toast).toBeInTheDocument();
        expect(toast).toHaveAttribute('role', 'alert');
        expect(toast.querySelector('h2')).toHaveTextContent('Saved');
        expect(toast.querySelector('p')).toHaveTextContent('All set');
    });

    it('escapes HTML in title and description', async () => {
        const ctrl = await bootController();

        ctrl.toast({ title: '<img src=x onerror=alert(1)>', description: '<script>x()</script>' });

        const heading = root().querySelector('h2')!;
        const desc = root().querySelector('p')!;
        expect(heading.textContent).toBe('<img src=x onerror=alert(1)>');
        expect(heading.querySelector('img')).toBeNull();
        expect(desc.querySelector('script')).toBeNull();
    });

    it('applies a variant class', async () => {
        const ctrl = await bootController();

        const id = ctrl.toast({ title: 'Oops', variant: 'destructive' });
        const toast = document.getElementById(id)!;

        expect(toast).toHaveClass('toast');
        expect(toast).toHaveClass('toast-destructive');
    });

    it('dismiss(id) removes the toast', async () => {
        const ctrl = await bootController();

        const id = ctrl.toast({ title: 'Bye' });
        expect(document.getElementById(id)).toBeInTheDocument();

        ctrl.dismiss(id);
        expect(document.getElementById(id)).toBeNull();
    });

    it('clicking the cancel button dismisses the toast', async () => {
        const ctrl = await bootController();

        const id = ctrl.toast({ title: 'Close me' });
        const cancel = document.querySelector<HTMLButtonElement>(`[data-toast-cancel][data-toast-id="${id}"]`)!;
        cancel.click();

        expect(document.getElementById(id)).toBeNull();
    });

    it('clicking the action button calls the callback, dispatches toaster:action, and dismisses', async () => {
        const ctrl = await bootController();
        const handler = vi.fn();
        root().addEventListener('toaster:action', handler as EventListener);
        const onClick = vi.fn();

        const id = ctrl.toast({ title: 'Undo?', action: { label: 'Undo', onClick } });
        const action = document.querySelector<HTMLButtonElement>(`[data-toast-action][data-toast-id="${id}"]`)!;
        action.click();

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(handler).toHaveBeenCalledTimes(1);
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ id });
        expect(document.getElementById(id)).toBeNull();
    });

    it('auto-dismisses after the configured duration', async () => {
        const ctrl = await bootController();
        vi.useFakeTimers();

        const id = ctrl.toast({ title: 'Bye soon', duration: 1000 });
        expect(document.getElementById(id)).toBeInTheDocument();

        vi.advanceTimersByTime(999);
        expect(document.getElementById(id)).toBeInTheDocument();

        vi.advanceTimersByTime(1);
        expect(document.getElementById(id)).toBeNull();
    });

    it('duration=0 keeps the toast until manually dismissed', async () => {
        const ctrl = await bootController();
        vi.useFakeTimers();

        const id = ctrl.toast({ title: 'Sticky', duration: 0 });
        vi.advanceTimersByTime(60_000);
        expect(document.getElementById(id)).toBeInTheDocument();
    });

    it('dismissAll() clears every active toast', async () => {
        const ctrl = await bootController();

        const a = ctrl.toast({ title: 'A', duration: 0 });
        const b = ctrl.toast({ title: 'B', duration: 0 });
        const c = ctrl.toast({ title: 'C', duration: 0 });

        ctrl.dismissAll();

        expect(document.getElementById(a)).toBeNull();
        expect(document.getElementById(b)).toBeNull();
        expect(document.getElementById(c)).toBeNull();
    });

    it('setPosition switches alignment classes and data-align', async () => {
        const ctrl = await bootController();

        ctrl.setPosition('top-left');
        expect(root().dataset.align).toBe('start');
        expect(root()).toHaveClass('top-0');
        expect(root()).toHaveClass('flex-col');
        expect(root()).not.toHaveClass('bottom-0');

        ctrl.setPosition('bottom-right');
        expect(root().dataset.align).toBe('end');
        expect(root()).toHaveClass('bottom-0');
        expect(root()).toHaveClass('flex-col-reverse');
        expect(root()).not.toHaveClass('top-0');
    });
});
