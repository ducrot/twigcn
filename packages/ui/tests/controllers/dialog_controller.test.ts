import { describe, expect, it } from 'vitest';
import DialogController from '../../src/controllers/dialog_controller';
import { setHTML, startStimulus } from '../helpers';

function fixture(closeOnBackdrop: boolean = true): void {
    setHTML(`
        <dialog
            data-controller="dialog"
            data-dialog-close-on-backdrop-value="${String(closeOnBackdrop)}"
        >
            <div>Dialog content</div>
        </dialog>
    `);
}

function dialog(): HTMLDialogElement {
    return document.querySelector<HTMLDialogElement>('[data-controller="dialog"]')!;
}

function setRect(el: Element, rect: { top: number; left: number; width: number; height: number }): void {
    el.getBoundingClientRect = () =>
        ({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            right: rect.left + rect.width,
            bottom: rect.top + rect.height,
            x: rect.left,
            y: rect.top,
            toJSON: () => ({}),
        }) as DOMRect;
}

describe('dialog_controller', () => {
    it('open() shows the dialog and locks body scroll', async () => {
        fixture();
        const app = await startStimulus({ dialog: DialogController });
        const ctrl = app.getControllerForElementAndIdentifier(dialog(), 'dialog') as InstanceType<typeof DialogController>;

        ctrl.open();

        expect(dialog().hasAttribute('open')).toBe(true);
        expect(document.body.style.overflow).toBe('hidden');
    });

    it('close() closes the dialog and clears body overflow via close event', async () => {
        fixture();
        const app = await startStimulus({ dialog: DialogController });
        const ctrl = app.getControllerForElementAndIdentifier(dialog(), 'dialog') as InstanceType<typeof DialogController>;

        ctrl.open();
        expect(document.body.style.overflow).toBe('hidden');

        ctrl.close();

        expect(dialog().hasAttribute('open')).toBe(false);
        expect(document.body.style.overflow).toBe('');
    });

    it('clicking outside the dialog rect closes it', async () => {
        fixture();
        const app = await startStimulus({ dialog: DialogController });
        const ctrl = app.getControllerForElementAndIdentifier(dialog(), 'dialog') as InstanceType<typeof DialogController>;
        ctrl.open();

        setRect(dialog(), { top: 100, left: 100, width: 200, height: 200 });

        dialog().dispatchEvent(new MouseEvent('click', { clientX: 50, clientY: 50, bubbles: true }));

        expect(dialog().hasAttribute('open')).toBe(false);
    });

    it('clicking inside the dialog rect does not close it', async () => {
        fixture();
        const app = await startStimulus({ dialog: DialogController });
        const ctrl = app.getControllerForElementAndIdentifier(dialog(), 'dialog') as InstanceType<typeof DialogController>;
        ctrl.open();

        setRect(dialog(), { top: 100, left: 100, width: 200, height: 200 });

        dialog().dispatchEvent(new MouseEvent('click', { clientX: 150, clientY: 150, bubbles: true }));

        expect(dialog().hasAttribute('open')).toBe(true);
    });

    it('with close-on-backdrop=false, an outside click leaves the dialog open', async () => {
        fixture(false);
        const app = await startStimulus({ dialog: DialogController });
        const ctrl = app.getControllerForElementAndIdentifier(dialog(), 'dialog') as InstanceType<typeof DialogController>;
        ctrl.open();

        setRect(dialog(), { top: 100, left: 100, width: 200, height: 200 });

        dialog().dispatchEvent(new MouseEvent('click', { clientX: 0, clientY: 0, bubbles: true }));

        expect(dialog().hasAttribute('open')).toBe(true);
    });
});
