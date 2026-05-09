import { afterEach, describe, expect, it } from 'vitest';
import TabsController from '../../src/controllers/tabs_controller';
import { setHTML, startStimulus } from '../helpers';

interface FixtureOptions {
    defaultValue?: string;
    storageKey?: string;
    initiallyActive?: string;
}

function fixture({ defaultValue, storageKey, initiallyActive }: FixtureOptions = {}): void {
    const tabs = ['one', 'two', 'three'];
    const triggers = tabs
        .map(
            (v) => `
            <button
                type="button"
                role="tab"
                data-tabs-target="trigger"
                data-tabs-value="${v}"
                data-action="click->tabs#select keydown->tabs#keydown"
                aria-selected="${v === initiallyActive ? 'true' : 'false'}"
            >${v}</button>`,
        )
        .join('');
    const panels = tabs
        .map(
            (v) => `
            <div
                role="tabpanel"
                data-tabs-target="content"
                data-tabs-value="${v}"
                ${v === initiallyActive ? '' : 'hidden'}
            >Panel ${v}</div>`,
        )
        .join('');
    const attrs = [
        defaultValue ? `data-tabs-default-value="${defaultValue}"` : '',
        storageKey ? `data-tabs-storage-key-value="${storageKey}"` : '',
    ]
        .filter(Boolean)
        .join(' ');
    setHTML(`
        <div data-controller="tabs" ${attrs}>
            <div role="tablist">${triggers}</div>
            ${panels}
        </div>
    `);
}

function triggers(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>('[data-tabs-target="trigger"]'));
}

function panels(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>('[data-tabs-target="content"]'));
}

function activeTrigger(): HTMLElement | undefined {
    return triggers().find((t) => t.getAttribute('aria-selected') === 'true');
}

function visiblePanels(): HTMLElement[] {
    return panels().filter((p) => !p.hidden);
}

describe('tabs_controller', () => {
    afterEach(() => {
        localStorage.clear();
    });

    it('activates the first trigger when no default and no storage', async () => {
        fixture();
        await startStimulus({ tabs: TabsController });

        expect(activeTrigger()?.dataset.tabsValue).toBe('one');
        expect(visiblePanels()).toHaveLength(1);
        expect(visiblePanels()[0].dataset.tabsValue).toBe('one');
    });

    it('activates the configured default-value tab on connect', async () => {
        fixture({ defaultValue: 'two' });
        await startStimulus({ tabs: TabsController });

        expect(activeTrigger()?.dataset.tabsValue).toBe('two');
        expect(visiblePanels()[0].dataset.tabsValue).toBe('two');
    });

    it('restores the active tab from localStorage when storage-key is set', async () => {
        localStorage.setItem('myTabs', 'three');
        fixture({ storageKey: 'myTabs', defaultValue: 'one' });
        await startStimulus({ tabs: TabsController });

        expect(activeTrigger()?.dataset.tabsValue).toBe('three');
    });

    it('clicking a trigger activates it, updates aria/data-state, and toggles panels', async () => {
        fixture();
        await startStimulus({ tabs: TabsController });

        triggers()[1].click();

        expect(triggers()[0]).toHaveAttribute('aria-selected', 'false');
        expect(triggers()[0]).toHaveAttribute('data-state', 'inactive');
        expect(triggers()[0]).not.toHaveClass('active');
        expect(triggers()[1]).toHaveAttribute('aria-selected', 'true');
        expect(triggers()[1]).toHaveAttribute('data-state', 'active');
        expect(triggers()[1]).toHaveClass('active');

        expect(panels()[0].hidden).toBe(true);
        expect(panels()[1].hidden).toBe(false);
        expect(panels()[2].hidden).toBe(true);
    });

    it('persists the activated tab to localStorage when storage-key is set', async () => {
        fixture({ storageKey: 'myTabs' });
        await startStimulus({ tabs: TabsController });

        triggers()[2].click();
        expect(localStorage.getItem('myTabs')).toBe('three');
    });

    it('ArrowRight on a trigger advances to the next and wraps to first at the end', async () => {
        fixture();
        await startStimulus({ tabs: TabsController });

        triggers()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
        expect(activeTrigger()?.dataset.tabsValue).toBe('two');

        triggers()[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
        expect(activeTrigger()?.dataset.tabsValue).toBe('three');

        triggers()[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
        expect(activeTrigger()?.dataset.tabsValue).toBe('one');
    });

    it('ArrowLeft moves to the previous, wrapping to last at index 0', async () => {
        fixture({ defaultValue: 'one' });
        await startStimulus({ tabs: TabsController });

        triggers()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true }));
        expect(activeTrigger()?.dataset.tabsValue).toBe('three');
    });

    it('Home and End jump to first and last', async () => {
        fixture({ defaultValue: 'two' });
        await startStimulus({ tabs: TabsController });

        triggers()[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true }));
        expect(activeTrigger()?.dataset.tabsValue).toBe('three');

        triggers()[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true }));
        expect(activeTrigger()?.dataset.tabsValue).toBe('one');
    });

    it('ArrowRight focuses the newly activated trigger', async () => {
        fixture();
        await startStimulus({ tabs: TabsController });

        triggers()[0].focus();
        triggers()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true }));
        expect(document.activeElement).toBe(triggers()[1]);
    });
});
