import { Controller } from '@hotwired/stimulus';

const COOKIE_NAME = 'sidebar_state';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SHORTCUT_KEY = 'b';

export default class SidebarController extends Controller<HTMLElement> {
    static values = {
        collapsible: { type: String, default: 'none' },
    };

    declare readonly collapsibleValue: string;

    private keydownHandler!: (event: KeyboardEvent) => void;

    connect() {
        this.element.dataset.sidebarInitialized = '';
        if (!this.element.dataset.state) {
            const open = this.readCookie() ?? true;
            this.applyState(open);
        }
        this.keydownHandler = this.handleKeydown.bind(this);
        window.addEventListener('keydown', this.keydownHandler);
    }

    disconnect() {
        delete this.element.dataset.sidebarInitialized;
        window.removeEventListener('keydown', this.keydownHandler);
    }

    toggle() {
        if (this.collapsibleValue === 'none') return;
        const open = this.element.dataset.state !== 'collapsed';
        this.applyState(!open);
        this.writeCookie(!open);
    }

    private handleKeydown(event: KeyboardEvent) {
        if (event.key === SHORTCUT_KEY && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            this.toggle();
        }
    }

    private applyState(open: boolean) {
        this.element.dataset.state = open ? 'expanded' : 'collapsed';
        this.element.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    private readCookie(): boolean | null {
        const match = document.cookie.match(
            new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`),
        );
        if (!match) return null;
        return decodeURIComponent(match[1]) === 'true';
    }

    private writeCookie(open: boolean) {
        document.cookie = `${COOKIE_NAME}=${open}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
    }
}
