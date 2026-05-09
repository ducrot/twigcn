import { afterEach, describe, expect, it, vi } from 'vitest';
import DrawerController from '../../src/controllers/drawer_controller';
import { nextFrame, setHTML, startStimulus } from '../helpers';

function fixture(closeOnBackdrop: boolean = true): void {
    setHTML(`
        <dialog
            data-controller="drawer"
            data-drawer-close-on-backdrop-value="${String(closeOnBackdrop)}"
        >
            <div class="content">drawer content</div>
        </dialog>
    `);
}

function drawer(): HTMLDialogElement {
    return document.querySelector<HTMLDialogElement>('[data-controller="drawer"]')!;
}

describe('drawer_controller', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('open() shows the dialog, locks body scroll, and adds .open class on next frame', async () => {
        fixture();
        const app = await startStimulus({ drawer: DrawerController });
        const ctrl = app.getControllerForElementAndIdentifier(drawer(), 'drawer') as InstanceType<typeof DrawerController>;

        ctrl.open();
        expect(drawer().hasAttribute('open')).toBe(true);
        expect(document.body.style.overflow).toBe('hidden');
        expect(drawer()).not.toHaveClass('open');

        await nextFrame();
        expect(drawer()).toHaveClass('open');
    });

    it('close() removes .open immediately and closes the dialog after 200ms', async () => {
        fixture();
        const app = await startStimulus({ drawer: DrawerController });
        const ctrl = app.getControllerForElementAndIdentifier(drawer(), 'drawer') as InstanceType<typeof DrawerController>;

        vi.useFakeTimers();
        ctrl.open();
        // Force the rAF that would add .open
        drawer().classList.add('open');

        ctrl.close();
        expect(drawer()).not.toHaveClass('open');
        expect(drawer().hasAttribute('open')).toBe(true);

        vi.advanceTimersByTime(200);
        expect(drawer().hasAttribute('open')).toBe(false);
        expect(document.body.style.overflow).toBe('');
    });

    it('clicking the dialog element directly closes the drawer (backdrop)', async () => {
        fixture();
        const app = await startStimulus({ drawer: DrawerController });
        const ctrl = app.getControllerForElementAndIdentifier(drawer(), 'drawer') as InstanceType<typeof DrawerController>;
        ctrl.open();

        vi.useFakeTimers();
        drawer().dispatchEvent(new MouseEvent('click', { bubbles: true }));
        vi.advanceTimersByTime(200);

        expect(drawer().hasAttribute('open')).toBe(false);
    });

    it('clicking a child element does not close the drawer', async () => {
        fixture();
        const app = await startStimulus({ drawer: DrawerController });
        const ctrl = app.getControllerForElementAndIdentifier(drawer(), 'drawer') as InstanceType<typeof DrawerController>;
        ctrl.open();

        const child = document.querySelector('.content')!;
        child.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(drawer().hasAttribute('open')).toBe(true);
    });

    it('with close-on-backdrop=false, even a click on the dialog itself stays open', async () => {
        fixture(false);
        const app = await startStimulus({ drawer: DrawerController });
        const ctrl = app.getControllerForElementAndIdentifier(drawer(), 'drawer') as InstanceType<typeof DrawerController>;
        ctrl.open();

        vi.useFakeTimers();
        drawer().dispatchEvent(new MouseEvent('click', { bubbles: true }));
        vi.advanceTimersByTime(500);

        expect(drawer().hasAttribute('open')).toBe(true);
    });

    it('close event listener clears body overflow and removes .open class', async () => {
        fixture();
        const app = await startStimulus({ drawer: DrawerController });
        const ctrl = app.getControllerForElementAndIdentifier(drawer(), 'drawer') as InstanceType<typeof DrawerController>;
        ctrl.open();
        drawer().classList.add('open');

        drawer().dispatchEvent(new Event('close'));

        expect(document.body.style.overflow).toBe('');
        expect(drawer()).not.toHaveClass('open');
    });
});
