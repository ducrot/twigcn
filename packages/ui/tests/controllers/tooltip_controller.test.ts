import { afterEach, describe, expect, it, vi } from 'vitest';
import TooltipController from '../../src/controllers/tooltip_controller';
import { setHTML, startStimulus } from '../helpers';

interface FixtureOptions {
    side?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}

function fixture({ side = 'top', delay }: FixtureOptions = {}): void {
    const delayAttr = delay !== undefined ? `data-tooltip-delay-value="${delay}"` : '';
    setHTML(`
        <div
            data-controller="tooltip"
            data-tooltip-side-value="${side}"
            ${delayAttr}
        >
            <button data-tooltip-target="trigger">trigger</button>
            <div data-tooltip-target="content">tip</div>
        </div>
    `);
}

function content(): HTMLElement {
    return document.querySelector<HTMLElement>('[data-tooltip-target="content"]')!;
}

function trigger(): HTMLElement {
    return document.querySelector<HTMLElement>('[data-tooltip-target="trigger"]')!;
}

function setRect(el: Element, w: number, h: number): void {
    el.getBoundingClientRect = () =>
        ({ top: 0, left: 0, right: w, bottom: h, width: w, height: h, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
}

describe('tooltip_controller', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('show() adds .visible and data-state=open after delay', async () => {
        fixture({ delay: 200 });
        const app = await startStimulus({ tooltip: TooltipController });
        const ctrl = app.getControllerForElementAndIdentifier(
            document.querySelector('[data-controller="tooltip"]')!,
            'tooltip',
        ) as InstanceType<typeof TooltipController>;
        vi.useFakeTimers();

        ctrl.show();
        expect(content()).not.toHaveClass('visible');

        vi.advanceTimersByTime(199);
        expect(content()).not.toHaveClass('visible');

        vi.advanceTimersByTime(1);
        expect(content()).toHaveClass('visible');
        expect(content()).toHaveAttribute('data-state', 'open');
    });

    it('hide() removes .visible and sets data-state=closed after 100ms', async () => {
        fixture({ delay: 0 });
        const app = await startStimulus({ tooltip: TooltipController });
        const ctrl = app.getControllerForElementAndIdentifier(
            document.querySelector('[data-controller="tooltip"]')!,
            'tooltip',
        ) as InstanceType<typeof TooltipController>;
        vi.useFakeTimers();

        ctrl.show();
        vi.advanceTimersByTime(0);
        expect(content()).toHaveClass('visible');

        ctrl.hide();
        expect(content()).toHaveClass('visible');

        vi.advanceTimersByTime(100);
        expect(content()).not.toHaveClass('visible');
        expect(content()).toHaveAttribute('data-state', 'closed');
    });

    it('show() cancels a pending hide', async () => {
        fixture({ delay: 0 });
        const app = await startStimulus({ tooltip: TooltipController });
        const ctrl = app.getControllerForElementAndIdentifier(
            document.querySelector('[data-controller="tooltip"]')!,
            'tooltip',
        ) as InstanceType<typeof TooltipController>;
        vi.useFakeTimers();

        ctrl.show();
        vi.advanceTimersByTime(0);
        ctrl.hide();
        ctrl.show();
        vi.advanceTimersByTime(100);

        // The pending hide should have been cleared
        expect(content()).toHaveClass('visible');
    });

    it('hide() cancels a pending show', async () => {
        fixture({ delay: 200 });
        const app = await startStimulus({ tooltip: TooltipController });
        const ctrl = app.getControllerForElementAndIdentifier(
            document.querySelector('[data-controller="tooltip"]')!,
            'tooltip',
        ) as InstanceType<typeof TooltipController>;
        vi.useFakeTimers();

        ctrl.show();
        ctrl.hide();
        vi.advanceTimersByTime(500);

        expect(content()).not.toHaveClass('visible');
    });

    it('positions the tooltip above the trigger when side=top', async () => {
        fixture({ side: 'top', delay: 0 });
        const app = await startStimulus({ tooltip: TooltipController });
        const ctrl = app.getControllerForElementAndIdentifier(
            document.querySelector('[data-controller="tooltip"]')!,
            'tooltip',
        ) as InstanceType<typeof TooltipController>;
        setRect(trigger(), 100, 30);
        setRect(content(), 80, 20);
        vi.useFakeTimers();

        ctrl.show();
        vi.advanceTimersByTime(0);

        // top = -contentH - 8 = -28; left = (100 - 80)/2 = 10
        expect(content().style.top).toBe('-28px');
        expect(content().style.left).toBe('10px');
    });

    it('positions the tooltip to the right of the trigger when side=right', async () => {
        fixture({ side: 'right', delay: 0 });
        const app = await startStimulus({ tooltip: TooltipController });
        const ctrl = app.getControllerForElementAndIdentifier(
            document.querySelector('[data-controller="tooltip"]')!,
            'tooltip',
        ) as InstanceType<typeof TooltipController>;
        setRect(trigger(), 100, 30);
        setRect(content(), 80, 20);
        vi.useFakeTimers();

        ctrl.show();
        vi.advanceTimersByTime(0);

        // top = (30-20)/2 = 5; left = 100 + 8 = 108
        expect(content().style.top).toBe('5px');
        expect(content().style.left).toBe('108px');
    });
});
