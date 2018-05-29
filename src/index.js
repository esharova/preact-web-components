import registerServiceWorker from './registerServiceWorker';
import registerCustomElement from 'preact-custom-element';

import './index.css';
import { App } from './components/app/app';

registerCustomElement(App, 'search-box');
registerServiceWorker();
