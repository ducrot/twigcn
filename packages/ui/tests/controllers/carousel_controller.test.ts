import { describe, expect, it, vi } from 'vitest';
import CarouselController from '../../src/controllers/carousel_controller';
import { setHTML, startStimulus } from '../helpers';

interface FixtureOptions {
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
    items?: number;
}

function fixture({ orientation = 'horizontal', loop = false, items = 3 }: FixtureOptions = {}): void {
    const slides = Array.from({ length: items }, (_, i) => `
        <div data-carousel-target="item" data-carousel-index="${i}">Slide ${i + 1}</div>
    `).join('');
    setHTML(`
        <div
            data-controller="carousel"
            data-carousel-orientation-value="${orientation}"
            data-carousel-loop-value="${String(loop)}"
        >
            <div class="carousel-viewport">
                <div data-carousel-target="content">${slides}</div>
            </div>
            <button class="carousel-previous" data-action="carousel#previous">prev</button>
            <button class="carousel-next" data-action="carousel#next">next</button>
        </div>
    `);
    const content = document.querySelector<HTMLElement>('[data-carousel-target="content"]');
    if (content) content.scrollTo = vi.fn();
}

function buttons(): { prev: HTMLButtonElement; next: HTMLButtonElement } {
    return {
        prev: document.querySelector<HTMLButtonElement>('.carousel-previous')!,
        next: document.querySelector<HTMLButtonElement>('.carousel-next')!,
    };
}

describe('carousel_controller', () => {
    it('disables previous button on first slide and enables next', async () => {
        fixture();
        await startStimulus({ carousel: CarouselController });

        const { prev, next } = buttons();
        expect(prev.disabled).toBe(true);
        expect(next.disabled).toBe(false);
    });

    it('next() advances to the next slide and updates button state', async () => {
        fixture({ items: 3 });
        await startStimulus({ carousel: CarouselController });

        const { prev, next } = buttons();
        next.click();
        expect(prev.disabled).toBe(false);
        next.click();
        expect(next.disabled).toBe(true);
    });

    it('previous() does nothing at index 0 without loop', async () => {
        fixture();
        await startStimulus({ carousel: CarouselController });

        const content = document.querySelector<HTMLElement>('[data-carousel-target="content"]')!;
        const scrollSpy = content.scrollTo as ReturnType<typeof vi.fn>;
        scrollSpy.mockClear();

        buttons().prev.click();
        expect(scrollSpy).not.toHaveBeenCalled();
        expect(buttons().prev.disabled).toBe(true);
    });

    it('loop: next() at last index wraps to first', async () => {
        fixture({ loop: true, items: 2 });
        await startStimulus({ carousel: CarouselController });

        const { next, prev } = buttons();
        next.click();
        next.click();
        expect(prev.disabled).toBe(false);
        expect(next.disabled).toBe(false);
    });

    it('loop: previous() at index 0 wraps to last', async () => {
        fixture({ loop: true, items: 3 });
        await startStimulus({ carousel: CarouselController });

        const { prev, next } = buttons();
        prev.click();
        expect(prev.disabled).toBe(false);
        expect(next.disabled).toBe(false);
    });

    it('updates aria-label on every slide after navigation', async () => {
        fixture({ items: 3 });
        await startStimulus({ carousel: CarouselController });

        buttons().next.click();
        const slides = document.querySelectorAll('[data-carousel-target="item"]');
        expect(slides[0]).toHaveAttribute('aria-label', 'Slide 1 of 3');
        expect(slides[1]).toHaveAttribute('aria-label', 'Slide 2 of 3');
        expect(slides[2]).toHaveAttribute('aria-label', 'Slide 3 of 3');
    });

    it('horizontal orientation: ArrowRight advances, ArrowDown is ignored', async () => {
        fixture({ orientation: 'horizontal', items: 3 });
        const app = await startStimulus({ carousel: CarouselController });

        const root = document.querySelector<HTMLElement>('[data-controller="carousel"]')!;
        const controller = app.getControllerForElementAndIdentifier(root, 'carousel') as InstanceType<typeof CarouselController>;

        expect(buttons().prev.disabled).toBe(true);
        controller.keydown(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
        expect(buttons().prev.disabled).toBe(false);

        const before = { prev: buttons().prev.disabled, next: buttons().next.disabled };
        controller.keydown(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
        expect(buttons().prev.disabled).toBe(before.prev);
        expect(buttons().next.disabled).toBe(before.next);
    });

    it('vertical orientation: ArrowDown advances, ArrowRight is ignored', async () => {
        fixture({ orientation: 'vertical', items: 3 });
        const app = await startStimulus({ carousel: CarouselController });

        const root = document.querySelector<HTMLElement>('[data-controller="carousel"]')!;
        const controller = app.getControllerForElementAndIdentifier(root, 'carousel') as InstanceType<typeof CarouselController>;

        controller.keydown(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
        expect(buttons().prev.disabled).toBe(false);

        const before = { prev: buttons().prev.disabled, next: buttons().next.disabled };
        controller.keydown(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
        expect(buttons().prev.disabled).toBe(before.prev);
        expect(buttons().next.disabled).toBe(before.next);
    });
});
