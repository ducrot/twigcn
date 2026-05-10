import { Controller } from '@hotwired/stimulus';
import type SidebarController from './sidebar_controller';

export default class SidebarTriggerController extends Controller<HTMLElement> {
    static outlets = ['sidebar'];

    declare readonly sidebarOutlet: SidebarController;

    toggle() {
        this.sidebarOutlet.toggle();
    }
}
