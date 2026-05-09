import { describe, expect, it } from 'vitest';
import AccordionController from '../../src/controllers/accordion_controller';
import { setHTML, startStimulus } from '../helpers';

function fixture(typeValue: string = 'single', initiallyOpen: number[] = []): void {
    const items = [0, 1, 2]
        .map(
            (i) => `
            <details data-accordion-target="item"${initiallyOpen.includes(i) ? ' open' : ''}>
                <summary>Item ${i + 1}</summary>
                <div>Content ${i + 1}</div>
            </details>`,
        )
        .join('');
    setHTML(`
        <div data-controller="accordion" data-accordion-type-value="${typeValue}">
            ${items}
        </div>
    `);
}

function items(): HTMLDetailsElement[] {
    return Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-accordion-target="item"]'));
}

function open(item: HTMLDetailsElement): void {
    item.open = true;
    item.dispatchEvent(new Event('toggle'));
}

function close(item: HTMLDetailsElement): void {
    item.open = false;
    item.dispatchEvent(new Event('toggle'));
}

describe('accordion_controller', () => {
    it('single mode: opening one item closes any other open item', async () => {
        fixture('single', [0]);
        await startStimulus({ accordion: AccordionController });

        const [first, second, third] = items();
        open(second);

        expect(first.open).toBe(false);
        expect(second.open).toBe(true);
        expect(third.open).toBe(false);
    });

    it('single mode: closing the open item leaves all items closed', async () => {
        fixture('single', [1]);
        await startStimulus({ accordion: AccordionController });

        const [first, second, third] = items();
        close(second);

        expect(first.open).toBe(false);
        expect(second.open).toBe(false);
        expect(third.open).toBe(false);
    });

    it('single mode (default): controller behaves as single when type-value missing', async () => {
        setHTML(`
            <div data-controller="accordion">
                <details data-accordion-target="item" open><summary>A</summary></details>
                <details data-accordion-target="item"><summary>B</summary></details>
            </div>
        `);
        await startStimulus({ accordion: AccordionController });

        const [a, b] = items();
        open(b);

        expect(a.open).toBe(false);
        expect(b.open).toBe(true);
    });

    it('multiple mode: opening another item leaves the first open', async () => {
        fixture('multiple', [0]);
        await startStimulus({ accordion: AccordionController });

        const [first, second] = items();
        open(second);

        expect(first.open).toBe(true);
        expect(second.open).toBe(true);
    });

    it('multiple mode: closing one item does not affect the others', async () => {
        fixture('multiple', [0, 1]);
        await startStimulus({ accordion: AccordionController });

        const [first, second] = items();
        close(first);

        expect(first.open).toBe(false);
        expect(second.open).toBe(true);
    });
});
