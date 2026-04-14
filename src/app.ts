import {initDevtools} from '@pixi/devtools';
import {Application} from 'pixi.js';
import '@/assets/styles/general.scss';
import Game from '@/Core/Game';
import {BaseAppSize} from '@/Core/const';

const gameContainer = document.querySelector<HTMLDivElement>('#game');
if (!gameContainer) throw new Error('Game container not found');

const app = new Application();
await app.init({resizeTo: gameContainer, ...BaseAppSize});

await initDevtools({app});
gameContainer.appendChild(app.canvas);

new Game(app);
