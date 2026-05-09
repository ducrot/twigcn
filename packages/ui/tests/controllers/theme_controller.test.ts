import { afterEach, describe, expect, it, vi } from 'vitest';
import ThemeController from '../../src/controllers/theme_controller';
import { setHTML, startStimulus } from '../helpers';

interface FakeMediaQueryList {
    matches: boolean;
    media: string;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
    onchange: null;
    addListener: ReturnType<typeof vi.fn>;
    removeListener: ReturnType<typeof vi.fn>;
    dispatchEvent: ReturnType<typeof vi.fn>;
}

function stubMatchMedia(systemDark: boolean): {
    list: FakeMediaQueryList;
    fireChange: () => void;
} {
    const listeners: Array<(event: { matches: boolean }) => void> = [];
    const list: FakeMediaQueryList = {
        matches: systemDark,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addEventListener: vi.fn((_type: string, listener: (e: { matches: boolean }) => void) => {
            listeners.push(listener);
        }),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
    };
    vi.stubGlobal('matchMedia', () => list as unknown as MediaQueryList);
    return {
        list,
        fireChange: () => listeners.forEach((cb) => cb({ matches: list.matches })),
    };
}

function root(): HTMLElement {
    return document.documentElement;
}

describe('theme_controller', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        localStorage.clear();
        root().classList.remove('dark');
        root().removeAttribute('data-theme');
    });

    it('on connect with no stored theme and light system, applies light', async () => {
        stubMatchMedia(false);
        setHTML(`<div data-controller="theme"></div>`);
        await startStimulus({ theme: ThemeController });

        expect(root()).not.toHaveClass('dark');
        expect(root()).toHaveAttribute('data-theme', 'light');
    });

    it('on connect with no stored theme and dark system, applies dark', async () => {
        stubMatchMedia(true);
        setHTML(`<div data-controller="theme"></div>`);
        await startStimulus({ theme: ThemeController });

        expect(root()).toHaveClass('dark');
        expect(root()).toHaveAttribute('data-theme', 'dark');
    });

    it('reads stored theme=dark from localStorage', async () => {
        stubMatchMedia(false);
        localStorage.setItem('theme', 'dark');
        setHTML(`<div data-controller="theme"></div>`);
        await startStimulus({ theme: ThemeController });

        expect(root()).toHaveClass('dark');
        expect(root()).toHaveAttribute('data-theme', 'dark');
    });

    it('setDark() persists to localStorage and dispatches theme:change', async () => {
        stubMatchMedia(false);
        setHTML(`<div data-controller="theme"></div>`);
        const app = await startStimulus({ theme: ThemeController });
        const el = document.querySelector<HTMLElement>('[data-controller="theme"]')!;
        const ctrl = app.getControllerForElementAndIdentifier(el, 'theme') as InstanceType<typeof ThemeController>;

        const handler = vi.fn();
        el.addEventListener('theme:change', handler as EventListener);

        ctrl.setDark();
        expect(localStorage.getItem('theme')).toBe('dark');
        expect(root()).toHaveClass('dark');
        expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ theme: 'dark' });
    });

    it('toggle() swaps light↔dark based on the currently effective theme', async () => {
        stubMatchMedia(false);
        setHTML(`<div data-controller="theme"></div>`);
        const app = await startStimulus({ theme: ThemeController });
        const el = document.querySelector<HTMLElement>('[data-controller="theme"]')!;
        const ctrl = app.getControllerForElementAndIdentifier(el, 'theme') as InstanceType<typeof ThemeController>;

        // System → light → toggle should go to dark
        ctrl.toggle();
        expect(root()).toHaveClass('dark');

        ctrl.toggle();
        expect(root()).not.toHaveClass('dark');
    });

    it('respects custom storage-key value', async () => {
        stubMatchMedia(false);
        localStorage.setItem('myTheme', 'dark');
        setHTML(`<div data-controller="theme" data-theme-storage-key-value="myTheme"></div>`);
        await startStimulus({ theme: ThemeController });

        expect(root()).toHaveClass('dark');
    });

    it('reapplies the effective theme on system match-media change while in system mode', async () => {
        const { list, fireChange } = stubMatchMedia(false);
        setHTML(`<div data-controller="theme"></div>`);
        await startStimulus({ theme: ThemeController });

        expect(root()).not.toHaveClass('dark');

        list.matches = true;
        fireChange();

        expect(root()).toHaveClass('dark');
    });

    it('setSystem() locks effective theme to current system preference', async () => {
        const { list, fireChange } = stubMatchMedia(true);
        localStorage.setItem('theme', 'light');
        setHTML(`<div data-controller="theme"></div>`);
        const app = await startStimulus({ theme: ThemeController });
        const el = document.querySelector<HTMLElement>('[data-controller="theme"]')!;
        const ctrl = app.getControllerForElementAndIdentifier(el, 'theme') as InstanceType<typeof ThemeController>;

        // Initially: stored=light, applied=light
        expect(root()).not.toHaveClass('dark');

        ctrl.setSystem();
        // Now in system mode, system=dark → root has dark
        expect(root()).toHaveClass('dark');

        // Switching system back to light should propagate
        list.matches = false;
        fireChange();
        expect(root()).not.toHaveClass('dark');
    });
});
