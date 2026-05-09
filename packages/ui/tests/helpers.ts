import { Application, type ControllerConstructor } from '@hotwired/stimulus';

const activeApps: Application[] = [];

export async function startStimulus(
    controllers: Record<string, ControllerConstructor>,
): Promise<Application> {
    const app = Application.start();
    for (const [identifier, Controller] of Object.entries(controllers)) {
        app.register(identifier, Controller);
    }
    activeApps.push(app);
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    return app;
}

export function stopAllStimulus(): void {
    while (activeApps.length > 0) {
        activeApps.pop()?.stop();
    }
}

export function setHTML(html: string): void {
    document.body.innerHTML = html;
}

export function nextFrame(): Promise<void> {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

export function flushMicrotasks(): Promise<void> {
    return new Promise((resolve) => queueMicrotask(() => resolve()));
}
