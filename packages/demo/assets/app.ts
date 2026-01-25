import './app.css';

import { Application } from '@hotwired/stimulus';
import { registerControllers } from '@ducrot/twigcn-ui';

// Start Stimulus
const app = Application.start();

// Register all Twigcn controllers
registerControllers(app);

// Enable Stimulus debug mode in development
app.debug = import.meta.env.DEV;
