import { describe, expect, it, vi } from 'vitest';
import DrawerController from '../../src/controllers/drawer_controller';
import DrawerTriggerController from '../../src/controllers/drawer_trigger_controller';
import { setHTML, startStimulus } from '../helpers';

describe('drawer_trigger_controller', () => {
    it('clicking the trigger calls open() on the drawer it is wired to via outlet', async () => {
        setHTML(`
            <button
                type="button"
                data-controller="drawer-trigger"
                data-drawer-trigger-drawer-outlet="#my-drawer"
                data-action="click->drawer-trigger#open"
            >Open</button>
            <dialog id="my-drawer" data-controller="drawer">drawer</dialog>
        `);

        const app = await startStimulus({
            drawer: DrawerController,
            'drawer-trigger': DrawerTriggerController,
        });

        const drawerCtrl = app.getControllerForElementAndIdentifier(
            document.getElementById('my-drawer')!,
            'drawer',
        ) as InstanceType<typeof DrawerController>;
        const openSpy = vi.spyOn(drawerCtrl, 'open').mockImplementation(() => {});

        document.querySelector<HTMLButtonElement>('[data-controller="drawer-trigger"]')!.click();

        expect(openSpy).toHaveBeenCalledTimes(1);
    });
});
