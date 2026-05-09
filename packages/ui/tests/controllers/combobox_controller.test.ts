import { describe, expect, it, vi } from 'vitest';
import { Controller } from '@hotwired/stimulus';
import ComboboxController from '../../src/controllers/combobox_controller';
import { setHTML, startStimulus } from '../helpers';

class StubPopoverController extends Controller<HTMLElement> {
    close = vi.fn();
}

function fixture(placeholder: string = 'Select option...'): void {
    setHTML(`
        <div data-controller="combobox" data-combobox-placeholder-value="${placeholder}">
            <input type="hidden" data-combobox-target="input" />
            <div data-controller="popover">
                <button
                    type="button"
                    role="combobox"
                    aria-expanded="true"
                    data-combobox-target="trigger"
                >
                    <span data-combobox-target="label">${placeholder}</span>
                </button>
                <div>
                    <div
                        class="combobox-item"
                        data-action="click->combobox#select"
                        data-combobox-value-param="apple"
                        data-combobox-label-param="Apple"
                    >Apple <svg class="opacity-0"></svg></div>
                    <div
                        class="combobox-item"
                        data-action="click->combobox#select"
                        data-combobox-value-param="banana"
                        data-combobox-label-param="Banana"
                    >Banana <svg class="opacity-0"></svg></div>
                </div>
            </div>
        </div>
    `);
}

describe('combobox_controller', () => {
    it('selecting an item updates input value and label text', async () => {
        fixture();
        await startStimulus({ combobox: ComboboxController, popover: StubPopoverController });

        const apple = document.querySelectorAll<HTMLElement>('.combobox-item')[0];
        apple.click();

        expect(document.querySelector<HTMLInputElement>('[data-combobox-target="input"]')!.value).toBe('apple');
        expect(document.querySelector('[data-combobox-target="label"]')).toHaveTextContent('Apple');
    });

    it('selecting an item collapses the trigger via aria-expanded=false', async () => {
        fixture();
        await startStimulus({ combobox: ComboboxController, popover: StubPopoverController });

        const trigger = document.querySelector('[data-combobox-target="trigger"]')!;
        expect(trigger).toHaveAttribute('aria-expanded', 'true');

        document.querySelectorAll<HTMLElement>('.combobox-item')[1].click();
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('selecting marks only the chosen item with opacity-100 on its check icon', async () => {
        fixture();
        await startStimulus({ combobox: ComboboxController, popover: StubPopoverController });

        const [apple, banana] = document.querySelectorAll<HTMLElement>('.combobox-item');
        banana.click();

        expect(apple.querySelector('svg')).toHaveClass('opacity-0');
        expect(apple.querySelector('svg')).not.toHaveClass('opacity-100');
        expect(banana.querySelector('svg')).toHaveClass('opacity-100');
        expect(banana.querySelector('svg')).not.toHaveClass('opacity-0');
    });

    it('selecting an item calls close() on the embedded popover controller', async () => {
        fixture();
        const app = await startStimulus({ combobox: ComboboxController, popover: StubPopoverController });

        const popoverEl = document.querySelector<HTMLElement>('[data-controller="popover"]')!;
        const popoverCtrl = app.getControllerForElementAndIdentifier(popoverEl, 'popover') as StubPopoverController;

        document.querySelectorAll<HTMLElement>('.combobox-item')[0].click();
        expect(popoverCtrl.close).toHaveBeenCalledTimes(1);
    });

    it('selecting dispatches a combobox:change event with value and label', async () => {
        fixture();
        const app = await startStimulus({ combobox: ComboboxController, popover: StubPopoverController });
        void app;

        const root = document.querySelector('[data-controller="combobox"]')!;
        const handler = vi.fn();
        root.addEventListener('combobox:change', handler as EventListener);

        document.querySelectorAll<HTMLElement>('.combobox-item')[1].click();

        expect(handler).toHaveBeenCalledTimes(1);
        const event = handler.mock.calls[0][0] as CustomEvent;
        expect(event.detail).toEqual({ value: 'banana', label: 'Banana' });
    });

    it('clear() resets value, label to placeholder, and all check icons', async () => {
        fixture('Pick one');
        const app = await startStimulus({ combobox: ComboboxController, popover: StubPopoverController });
        const root = document.querySelector<HTMLElement>('[data-controller="combobox"]')!;
        const ctrl = app.getControllerForElementAndIdentifier(root, 'combobox') as InstanceType<typeof ComboboxController>;

        // First select something
        document.querySelectorAll<HTMLElement>('.combobox-item')[0].click();
        expect(document.querySelector<HTMLInputElement>('[data-combobox-target="input"]')!.value).toBe('apple');

        ctrl.clear();

        expect(document.querySelector<HTMLInputElement>('[data-combobox-target="input"]')!.value).toBe('');
        expect(document.querySelector('[data-combobox-target="label"]')).toHaveTextContent('Pick one');
        document.querySelectorAll('.combobox-item svg').forEach((icon) => {
            expect(icon).toHaveClass('opacity-0');
            expect(icon).not.toHaveClass('opacity-100');
        });
    });
});
