import { describe, expect, it } from 'vitest';
import PopoverController from '../../src/controllers/popover_controller';
import { setHTML, startStimulus } from '../helpers';

function fixture(): void {
    setHTML(`
        <div data-controller="popover">
            <button data-popover-target="trigger" data-action="click->popover#toggle" aria-expanded="false">trigger</button>
            <div data-popover-target="content" aria-hidden="true">content</div>
        </div>
    `);
}

function trigger(): HTMLButtonElement {
    return document.querySelector<HTMLButtonElement>('[data-popover-target="trigger"]')!;
}

function content(): HTMLElement {
    return document.querySelector<HTMLElement>('[data-popover-target="content"]')!;
}

function backdrop(): HTMLElement | null {
    return document.body.querySelector<HTMLElement>('div.fixed.inset-0.z-40');
}

describe('popover_controller', () => {
    it('toggle() flips aria-expanded and aria-hidden', async () => {
        fixture();
        await startStimulus({ popover: PopoverController });

        trigger().click();
        expect(trigger()).toHaveAttribute('aria-expanded', 'true');
        expect(content()).toHaveAttribute('aria-hidden', 'false');

        trigger().click();
        expect(trigger()).toHaveAttribute('aria-expanded', 'false');
        expect(content()).toHaveAttribute('aria-hidden', 'true');
    });

    it('open() creates a backdrop and close() removes it', async () => {
        fixture();
        await startStimulus({ popover: PopoverController });

        trigger().click();
        expect(backdrop()).not.toBeNull();

        trigger().click();
        expect(backdrop()).toBeNull();
    });

    it('clicking the backdrop closes the popover', async () => {
        fixture();
        await startStimulus({ popover: PopoverController });

        trigger().click();
        backdrop()!.click();

        expect(trigger()).toHaveAttribute('aria-expanded', 'false');
        expect(content()).toHaveAttribute('aria-hidden', 'true');
    });

    it('Escape closes an open popover', async () => {
        fixture();
        await startStimulus({ popover: PopoverController });

        trigger().click();
        expect(trigger()).toHaveAttribute('aria-expanded', 'true');

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(trigger()).toHaveAttribute('aria-expanded', 'false');
    });

    it('opening one popover closes any other open popover via the popover:open event', async () => {
        setHTML(`
            <div data-controller="popover" id="p1">
                <button data-popover-target="trigger" data-action="click->popover#toggle" aria-expanded="false">a</button>
                <div data-popover-target="content" aria-hidden="true">a-content</div>
            </div>
            <div data-controller="popover" id="p2">
                <button data-popover-target="trigger" data-action="click->popover#toggle" aria-expanded="false">b</button>
                <div data-popover-target="content" aria-hidden="true">b-content</div>
            </div>
        `);
        await startStimulus({ popover: PopoverController });

        const triggers = document.querySelectorAll<HTMLButtonElement>('[data-popover-target="trigger"]');
        triggers[0].click();
        expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');

        triggers[1].click();
        expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
        expect(triggers[1]).toHaveAttribute('aria-expanded', 'true');
    });

    it('close() with default arg focuses the trigger', async () => {
        fixture();
        const app = await startStimulus({ popover: PopoverController });
        const root = document.querySelector<HTMLElement>('[data-controller="popover"]')!;
        const ctrl = app.getControllerForElementAndIdentifier(root, 'popover') as InstanceType<typeof PopoverController>;

        trigger().click();
        // Move focus elsewhere
        const elsewhere = document.createElement('input');
        document.body.appendChild(elsewhere);
        elsewhere.focus();
        expect(document.activeElement).toBe(elsewhere);

        ctrl.close();
        expect(document.activeElement).toBe(trigger());
    });

    it('close() short-circuits when popover is already closed', async () => {
        fixture();
        const app = await startStimulus({ popover: PopoverController });
        const root = document.querySelector<HTMLElement>('[data-controller="popover"]')!;
        const ctrl = app.getControllerForElementAndIdentifier(root, 'popover') as InstanceType<typeof PopoverController>;

        // Already closed → calling close() should not focus the trigger
        const elsewhere = document.createElement('input');
        document.body.appendChild(elsewhere);
        elsewhere.focus();

        ctrl.close();
        expect(document.activeElement).toBe(elsewhere);
    });
});
