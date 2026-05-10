import { Application } from '@hotwired/stimulus';
import AccordionController from './controllers/accordion_controller';
import CarouselController from './controllers/carousel_controller';
import ComboboxController from './controllers/combobox_controller';
import CommandController from './controllers/command_controller';
import CustomSelectController from './controllers/custom_select_controller';
import DialogController from './controllers/dialog_controller';
import DrawerController from './controllers/drawer_controller';
import DrawerTriggerController from './controllers/drawer_trigger_controller';
import PopoverController from './controllers/popover_controller';
import SidebarController from './controllers/sidebar_controller';
import SidebarTriggerController from './controllers/sidebar_trigger_controller';
import SliderController from './controllers/slider_controller';
import TabsController from './controllers/tabs_controller';
import ThemeController from './controllers/theme_controller';
import ToasterController from './controllers/toaster_controller';
import TooltipController from './controllers/tooltip_controller';

export {
    AccordionController,
    CarouselController,
    ComboboxController,
    CommandController,
    CustomSelectController,
    DialogController,
    DrawerController,
    DrawerTriggerController,
    PopoverController,
    SidebarController,
    SidebarTriggerController,
    SliderController,
    TabsController,
    ThemeController,
    ToasterController,
    TooltipController,
};

/**
 * Register all Twigcn controllers with a Stimulus application
 */
export function registerControllers(app: Application): void {
    app.register('accordion', AccordionController);
    app.register('carousel', CarouselController);
    app.register('combobox', ComboboxController);
    app.register('command', CommandController);
    app.register('custom-select', CustomSelectController);
    app.register('dialog', DialogController);
    app.register('drawer', DrawerController);
    app.register('drawer-trigger', DrawerTriggerController);
    app.register('popover', PopoverController);
    app.register('sidebar', SidebarController);
    app.register('sidebar-trigger', SidebarTriggerController);
    app.register('slider', SliderController);
    app.register('tabs', TabsController);
    app.register('theme', ThemeController);
    app.register('toaster', ToasterController);
    app.register('tooltip', TooltipController);
}
