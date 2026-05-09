import { describe, expect, it, vi } from 'vitest';
import { Controller } from '@hotwired/stimulus';
import CustomSelectController from '../../src/controllers/custom_select_controller';
import { setHTML, startStimulus } from '../helpers';

class StubPopoverController extends Controller<HTMLElement> {
    open(): void {
        const content = this.element.querySelector('[data-popover-target="content"]');
        content?.setAttribute('aria-hidden', 'false');
    }
    close(): void {
        const content = this.element.querySelector('[data-popover-target="content"]');
        content?.setAttribute('aria-hidden', 'true');
    }
}

interface FixtureOptions {
    multiple?: boolean;
    searchable?: boolean;
    initialValue?: string;
    options?: Array<{ value: string; label: string; selected?: boolean; disabled?: boolean }>;
    grouped?: boolean;
}

function fixture({
    multiple = false,
    searchable = false,
    initialValue = '',
    options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
    ],
    grouped = false,
}: FixtureOptions = {}): void {
    const optionMarkup = options
        .map(
            (o) =>
                `<div role="option" data-value="${o.value}" data-label="${o.label}"${o.selected ? ' aria-selected="true"' : ''}${o.disabled ? ' aria-disabled="true"' : ''}>${o.label}</div>`,
        )
        .join('');
    const listboxContent = grouped
        ? `<div role="group"><div role="heading">Group A</div>${optionMarkup}</div>`
        : optionMarkup;
    const searchInput = searchable
        ? `<input type="text" data-custom-select-target="search" data-action="input->custom-select#filter keydown->custom-select#handleSearchKeydown" />`
        : '';
    setHTML(`
        <div
            data-controller="custom-select"
            data-custom-select-multiple-value="${String(multiple)}"
            data-custom-select-searchable-value="${String(searchable)}"
            data-custom-select-placeholder-value="Pick one"
        >
            <input type="hidden" data-custom-select-target="input" value='${initialValue}' />
            <div data-controller="popover">
                <button type="button" data-custom-select-target="trigger">
                    <span data-custom-select-target="label" class="text-muted-foreground">Pick one</span>
                </button>
                <div data-popover-target="content" aria-hidden="true">
                    ${searchInput}
                    <div role="listbox" data-custom-select-target="listbox">${listboxContent}</div>
                </div>
            </div>
        </div>
    `);
    document.querySelectorAll<HTMLElement>('[role="option"]').forEach((opt) => {
        opt.scrollIntoView = vi.fn();
    });
}

function options(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'));
}

function trigger(): HTMLButtonElement {
    return document.querySelector<HTMLButtonElement>('[data-custom-select-target="trigger"]')!;
}

function input(): HTMLInputElement {
    return document.querySelector<HTMLInputElement>('[data-custom-select-target="input"]')!;
}

function label(): HTMLElement {
    return document.querySelector<HTMLElement>('[data-custom-select-target="label"]')!;
}

describe('custom_select_controller', () => {
    it('initializes single-mode selection from input value', async () => {
        fixture({ initialValue: 'banana' });
        await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });

        const [, banana] = options();
        expect(banana).toHaveAttribute('aria-selected', 'true');
        expect(label()).toHaveTextContent('Banana');
        expect(label()).not.toHaveClass('text-muted-foreground');
    });

    it('initializes multiple-mode label from JSON-array input value', async () => {
        // initializeSelection in multiple mode populates the internal Set and updates
        // the label, but does not write aria-selected back to the DOM (the Twig
        // template is what stamps aria-selected for pre-selected options).
        fixture({ multiple: true, initialValue: '["apple","cherry"]' });
        await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });

        expect(label()).toHaveTextContent('Apple, Cherry');
        expect(label()).not.toHaveClass('text-muted-foreground');
    });

    it('clicking an option in single mode selects, updates input, fires change, and closes popover', async () => {
        fixture();
        const app = await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });
        const popoverEl = document.querySelector<HTMLElement>('[data-controller="popover"]')!;
        const popoverCtrl = app.getControllerForElementAndIdentifier(popoverEl, 'popover') as StubPopoverController;
        const closeSpy = vi.spyOn(popoverCtrl, 'close');

        const root = document.querySelector<HTMLElement>('[data-controller="custom-select"]')!;
        const handler = vi.fn();
        root.addEventListener('custom-select:change', handler as EventListener);

        options()[1].click();

        expect(input().value).toBe('banana');
        expect(label()).toHaveTextContent('Banana');
        expect(handler).toHaveBeenCalledTimes(1);
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: 'banana' });
        expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('clicking an option in multiple mode toggles selection without closing popover', async () => {
        fixture({ multiple: true, initialValue: '[]' });
        const app = await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });
        const popoverEl = document.querySelector<HTMLElement>('[data-controller="popover"]')!;
        const popoverCtrl = app.getControllerForElementAndIdentifier(popoverEl, 'popover') as StubPopoverController;
        const closeSpy = vi.spyOn(popoverCtrl, 'close');

        const [apple, banana] = options();
        apple.click();
        banana.click();

        expect(JSON.parse(input().value)).toEqual(['apple', 'banana']);
        expect(closeSpy).not.toHaveBeenCalled();

        apple.click();
        expect(JSON.parse(input().value)).toEqual(['banana']);
    });

    it('select(value) public API selects the matching option', async () => {
        fixture();
        const app = await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });
        const root = document.querySelector<HTMLElement>('[data-controller="custom-select"]')!;
        const ctrl = app.getControllerForElementAndIdentifier(root, 'custom-select') as InstanceType<typeof CustomSelectController>;

        ctrl.select('cherry');

        expect(input().value).toBe('cherry');
        expect(options()[2]).toHaveAttribute('aria-selected', 'true');
    });

    it('clear() empties single-mode selection and dispatches change', async () => {
        fixture({ initialValue: 'apple' });
        const app = await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });
        const root = document.querySelector<HTMLElement>('[data-controller="custom-select"]')!;
        const ctrl = app.getControllerForElementAndIdentifier(root, 'custom-select') as InstanceType<typeof CustomSelectController>;

        const handler = vi.fn();
        root.addEventListener('custom-select:change', handler as EventListener);

        ctrl.clear();

        expect(input().value).toBe('');
        expect(options()[0]).not.toHaveAttribute('aria-selected');
        expect(label()).toHaveTextContent('Pick one');
        expect(label()).toHaveClass('text-muted-foreground');
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: '' });
    });

    it('clear() empties multiple-mode selection and dispatches an empty array', async () => {
        fixture({ multiple: true, initialValue: '["apple","banana"]' });
        const app = await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });
        const root = document.querySelector<HTMLElement>('[data-controller="custom-select"]')!;
        const ctrl = app.getControllerForElementAndIdentifier(root, 'custom-select') as InstanceType<typeof CustomSelectController>;

        const handler = vi.fn();
        root.addEventListener('custom-select:change', handler as EventListener);

        ctrl.clear();

        expect(input().value).toBe('[]');
        options().forEach((opt) => expect(opt).not.toHaveAttribute('aria-selected'));
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: [] });
    });

    it('filter() hides options that match neither label nor keywords', async () => {
        fixture({ searchable: true });
        await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });

        const search = document.querySelector<HTMLInputElement>('[data-custom-select-target="search"]')!;
        search.value = 'app';
        search.dispatchEvent(new Event('input', { bubbles: true }));

        const [apple, banana, cherry] = options();
        expect(apple).toHaveAttribute('aria-hidden', 'false');
        expect(banana).toHaveAttribute('aria-hidden', 'true');
        expect(cherry).toHaveAttribute('aria-hidden', 'true');
    });

    it('filter() hides groups that no longer have visible options', async () => {
        fixture({ searchable: true, grouped: true });
        await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });

        const search = document.querySelector<HTMLInputElement>('[data-custom-select-target="search"]')!;
        const group = document.querySelector<HTMLElement>('[role="group"]')!;

        search.value = 'zzz';
        search.dispatchEvent(new Event('input', { bubbles: true }));
        expect(group.style.display).toBe('none');

        search.value = '';
        search.dispatchEvent(new Event('input', { bubbles: true }));
        expect(group.style.display).toBe('');
    });

    it('keyboard: ArrowDown on the trigger opens the popover when closed', async () => {
        fixture();
        const app = await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });
        const popoverEl = document.querySelector<HTMLElement>('[data-controller="popover"]')!;
        const popoverCtrl = app.getControllerForElementAndIdentifier(popoverEl, 'popover') as StubPopoverController;
        const openSpy = vi.spyOn(popoverCtrl, 'open');

        trigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('keyboard: ArrowDown when popover is open advances activeIndex and adds active class', async () => {
        fixture();
        const app = await startStimulus({ 'custom-select': CustomSelectController, popover: StubPopoverController });
        const popoverEl = document.querySelector<HTMLElement>('[data-controller="popover"]')!;
        (app.getControllerForElementAndIdentifier(popoverEl, 'popover') as StubPopoverController).open();

        trigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        expect(options()[0]).toHaveClass('active');

        trigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        expect(options()[0]).not.toHaveClass('active');
        expect(options()[1]).toHaveClass('active');

        trigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true }));
        expect(options()[2]).toHaveClass('active');

        trigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true }));
        expect(options()[0]).toHaveClass('active');
    });
});
