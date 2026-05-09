import { Controller } from '@hotwired/stimulus';
import DrawerController from './drawer_controller';

export default class extends Controller {
    static outlets = ['drawer'];

    declare readonly drawerOutlet: DrawerController;

    open(): void {
        this.drawerOutlet.open();
    }
}
