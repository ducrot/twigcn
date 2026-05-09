import { describe, expect, it } from 'vitest';
import SliderController from '../../src/controllers/slider_controller';
import { setHTML, startStimulus } from '../helpers';

function rangeInput(): HTMLInputElement {
    return document.querySelector<HTMLInputElement>('input[type="range"]')!;
}

describe('slider_controller', () => {
    it('on connect, sets --slider-value to the percentage of (value-min)/(max-min)', async () => {
        setHTML(`
            <input
                type="range"
                data-controller="slider"
                data-action="input->slider#update"
                min="0" max="100" value="25"
            />
        `);
        await startStimulus({ slider: SliderController });

        expect(rangeInput().style.getPropertyValue('--slider-value')).toBe('25%');
    });

    it('handles non-zero min by computing percentage relative to range', async () => {
        setHTML(`
            <input
                type="range"
                data-controller="slider"
                data-action="input->slider#update"
                min="50" max="150" value="100"
            />
        `);
        await startStimulus({ slider: SliderController });

        expect(rangeInput().style.getPropertyValue('--slider-value')).toBe('50%');
    });

    it('returns 0% when min equals max (degenerate range)', async () => {
        setHTML(`
            <input
                type="range"
                data-controller="slider"
                min="10" max="10" value="10"
            />
        `);
        await startStimulus({ slider: SliderController });

        expect(rangeInput().style.getPropertyValue('--slider-value')).toBe('0%');
    });

    it('update() recomputes percentage after the value changes', async () => {
        setHTML(`
            <input
                type="range"
                data-controller="slider"
                data-action="input->slider#update"
                min="0" max="100" value="0"
            />
        `);
        await startStimulus({ slider: SliderController });
        expect(rangeInput().style.getPropertyValue('--slider-value')).toBe('0%');

        rangeInput().value = '75';
        rangeInput().dispatchEvent(new Event('input', { bubbles: true }));

        expect(rangeInput().style.getPropertyValue('--slider-value')).toBe('75%');
    });

    it('writes the current value into the output target as text', async () => {
        setHTML(`
            <div data-controller="slider">
                <input data-slider-target="input" type="range" min="0" max="100" value="42" />
                <span data-slider-target="output"></span>
            </div>
        `);
        await startStimulus({ slider: SliderController });

        expect(document.querySelector('[data-slider-target="output"]')).toHaveTextContent('42');
    });
});
