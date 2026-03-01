import {initDevtools} from '@pixi/devtools';
import {Application} from 'pixi.js';
import '@/assets/styles/general.scss';
import Game from '@/Game';

const app = new Application();
await app.init({resizeTo: window});
await initDevtools({app});
document.body.appendChild(app.canvas);

new Game(app);
