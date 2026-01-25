import { Controller } from '@hotwired/stimulus';

type Theme = 'light' | 'dark' | 'system';

export default class extends Controller<HTMLElement> {
    static values = {
        storageKey: { type: String, default: 'theme' },
    };

    declare storageKeyValue: string;

    private theme: Theme = 'system';

    connect(): void {
        this.theme = this.getStoredTheme();
        this.applyTheme();

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.theme === 'system') {
                this.applyTheme();
            }
        });
    }

    toggle(): void {
        const currentTheme = this.getEffectiveTheme();
        this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    setLight(): void {
        this.setTheme('light');
    }

    setDark(): void {
        this.setTheme('dark');
    }

    setSystem(): void {
        this.setTheme('system');
    }

    private setTheme(theme: Theme): void {
        this.theme = theme;
        localStorage.setItem(this.storageKeyValue, theme);
        this.applyTheme();
        this.dispatch('change', { detail: { theme } });
    }

    private getStoredTheme(): Theme {
        const stored = localStorage.getItem(this.storageKeyValue);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
            return stored;
        }
        return 'system';
    }

    private getEffectiveTheme(): 'light' | 'dark' {
        if (this.theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return this.theme;
    }

    private applyTheme(): void {
        const effectiveTheme = this.getEffectiveTheme();
        const root = document.documentElement;

        if (effectiveTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        root.setAttribute('data-theme', effectiveTheme);
    }
}
