import { describe, expect, it } from 'vitest';
import { Controller } from '@hotwired/stimulus';
import { setHTML, startStimulus } from './helpers';

class PingController extends Controller<HTMLElement> {
    static targets = ['output'];
    declare readonly outputTarget: HTMLElement;

    connect() {
        this.outputTarget.textContent = 'connected';
    }
}

describe('test harness', () => {
    it('starts a Stimulus application and runs controller lifecycle', async () => {
        setHTML(`
            <div data-controller="ping">
                <span data-ping-target="output"></span>
            </div>
        `);

        await startStimulus({ ping: PingController });

        const output = document.querySelector('[data-ping-target="output"]');
        expect(output).toHaveTextContent('connected');
    });

    it('cleans up DOM and stops apps between tests', () => {
        expect(document.body.innerHTML).toBe('');
    });
});
