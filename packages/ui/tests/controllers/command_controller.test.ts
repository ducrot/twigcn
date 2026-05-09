import { describe, expect, it, vi } from 'vitest';
import CommandController from '../../src/controllers/command_controller';
import { setHTML, startStimulus } from '../helpers';

function fixture(): void {
    setHTML(`
        <div data-controller="command">
            <header>
                <input type="text" data-command-target="input" data-action="input->command#filter" />
            </header>
            <div data-command-target="list" role="menu">
                <div data-command-target="group" role="group">
                    <div role="heading">Fruits</div>
                    <div data-command-target="item" data-value="apple" role="menuitem">Apple</div>
                    <div data-command-target="item" data-value="banana" role="menuitem">Banana</div>
                </div>
                <div data-command-target="group" role="group">
                    <div role="heading">Vegetables</div>
                    <div data-command-target="item" data-value="carrot" role="menuitem">Carrot</div>
                    <div data-command-target="item" data-value="cucumber" data-command-target="item" aria-disabled="true" role="menuitem">Cucumber</div>
                </div>
                <div data-command-target="empty">No results.</div>
            </div>
        </div>
    `);
}

function input(): HTMLInputElement {
    return document.querySelector<HTMLInputElement>('[data-command-target="input"]')!;
}

function items(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>('[data-command-target="item"]'));
}

function visibleItems(): HTMLElement[] {
    return items().filter((i) => i.getAttribute('aria-hidden') !== 'true');
}

describe('command_controller', () => {
    it('marks the root with data-command-initialized on connect', async () => {
        fixture();
        await startStimulus({ command: CommandController });

        expect(document.querySelector('[data-controller="command"]')).toHaveAttribute('data-command-initialized');
    });

    it('filter() hides items that match neither value nor text', async () => {
        fixture();
        await startStimulus({ command: CommandController });

        input().value = 'app';
        input().dispatchEvent(new Event('input', { bubbles: true }));

        const [apple, banana, carrot, cucumber] = items();
        expect(apple).toHaveAttribute('aria-hidden', 'false');
        expect(banana).toHaveAttribute('aria-hidden', 'true');
        expect(carrot).toHaveAttribute('aria-hidden', 'true');
        expect(cucumber).toHaveAttribute('aria-hidden', 'true');
    });

    it('filter() hides empty groups', async () => {
        fixture();
        await startStimulus({ command: CommandController });

        input().value = 'apple';
        input().dispatchEvent(new Event('input', { bubbles: true }));

        const [fruits, vegetables] = document.querySelectorAll<HTMLElement>('[data-command-target="group"]');
        expect(fruits).toHaveAttribute('aria-hidden', 'false');
        expect(vegetables).toHaveAttribute('aria-hidden', 'true');
    });

    it('filter() shows the empty target when no items match', async () => {
        fixture();
        await startStimulus({ command: CommandController });

        const empty = document.querySelector('[data-command-target="empty"]')!;
        input().value = 'zzzzz';
        input().dispatchEvent(new Event('input', { bubbles: true }));
        expect(empty).toHaveAttribute('aria-hidden', 'false');

        input().value = 'apple';
        input().dispatchEvent(new Event('input', { bubbles: true }));
        expect(empty).toHaveAttribute('aria-hidden', 'true');
    });

    it('ArrowDown selects next visible item, ArrowUp clamps at 0', async () => {
        fixture();
        await startStimulus({ command: CommandController });

        const root = document.querySelector<HTMLElement>('[data-controller="command"]')!;
        items().forEach((i) => (i.scrollIntoView = vi.fn()));

        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        expect(visibleItems()[0]).toHaveAttribute('aria-selected', 'true');
        expect(visibleItems()[0]).toHaveClass('active');

        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        expect(visibleItems()[1]).toHaveAttribute('aria-selected', 'true');

        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }));
        expect(visibleItems()[0]).toHaveAttribute('aria-selected', 'true');

        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }));
        // clamps at 0
        expect(visibleItems()[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('Enter on selected item dispatches command:select with its value', async () => {
        fixture();
        await startStimulus({ command: CommandController });
        items().forEach((i) => (i.scrollIntoView = vi.fn()));

        const root = document.querySelector<HTMLElement>('[data-controller="command"]')!;
        const handler = vi.fn();
        root.addEventListener('command:select', handler as EventListener);

        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));

        expect(handler).toHaveBeenCalledTimes(1);
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ value: 'apple' });
    });

    it('Enter does not dispatch when the selected visible item is aria-disabled', async () => {
        // Filter so that the only visible item is the disabled cucumber
        fixture();
        await startStimulus({ command: CommandController });
        items().forEach((i) => (i.scrollIntoView = vi.fn()));

        input().value = 'cucumber';
        input().dispatchEvent(new Event('input', { bubbles: true }));

        const root = document.querySelector<HTMLElement>('[data-controller="command"]')!;
        const handler = vi.fn();
        root.addEventListener('command:select', handler as EventListener);

        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));

        expect(handler).not.toHaveBeenCalled();
    });

    it('Escape blurs the input', async () => {
        fixture();
        await startStimulus({ command: CommandController });

        const root = document.querySelector<HTMLElement>('[data-controller="command"]')!;
        input().focus();
        expect(document.activeElement).toBe(input());

        root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
        expect(document.activeElement).not.toBe(input());
    });
});
