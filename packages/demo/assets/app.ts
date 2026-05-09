import './app.css';

import { Application } from '@hotwired/stimulus';
import { registerControllers } from '@ducrot/twigcn-ui';
import ToastDemoController from './controllers/toast_demo_controller';

// Start Stimulus
const app = Application.start();

// Register all Twigcn controllers
registerControllers(app);

// Demo-only controllers
app.register('toast-demo', ToastDemoController);

// Enable Stimulus debug mode in development
app.debug = import.meta.env.DEV;
