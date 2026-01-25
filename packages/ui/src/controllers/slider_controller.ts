import { Controller } from '@hotwired/stimulus';

export default class extends Controller<HTMLElement> {
    static targets = ['input', 'output'];

    declare readonly hasInputTarget: boolean;
    declare readonly inputTarget: HTMLInputElement;
    declare readonly hasOutputTarget: boolean;
    declare readonly outputTarget: HTMLElement;

    private get sliderInput(): HTMLInputElement {
        // If we have an input target, use it; otherwise assume controller is on the input itself
        return this.hasInputTarget ? this.inputTarget : (this.element as HTMLInputElement);
    }

    connect(): void {
        this.updateSlider();
    }

    update(): void {
        this.updateSlider();
    }

    private updateSlider(): void {
        const input = this.sliderInput;
        const min = parseFloat(input.min || '0');
        const max = parseFloat(input.max || '100');
        const value = parseFloat(input.value);
        const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;

        input.style.setProperty('--slider-value', `${percent}%`);

        if (this.hasOutputTarget) {
            this.outputTarget.textContent = input.value;
        }
    }
}
