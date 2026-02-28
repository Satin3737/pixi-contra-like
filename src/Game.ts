import type {Application, Container} from 'pixi.js';
import {Hero, Platform} from '@/entities';

class Game {
    private readonly app: Application;
    private readonly platforms: Platform[];
    private readonly hero: Hero;

    constructor(app: Application) {
        this.app = app;
        this.platforms = [];

        this.hero = new Hero();
        this.hero.x = 100;
        this.hero.y = 0;

        this.platforms.push(new Platform({x: 50, y: 300}));
        this.platforms.push(new Platform({x: 300, y: 360}));
        this.platforms.push(new Platform({x: 500, y: 300}));

        this.app.stage.addChild(this.hero, ...this.platforms);

        this.app.ticker.add(this.update, this);
    }

    private isAABBCollision(a: Container, b: Container): boolean {
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    }

    public onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowLeft':
                this.hero.moveLeft();
                break;
            case 'ArrowRight':
                this.hero.moveRight();
                break;
            case 'Space':
            case 'ArrowUp':
                this.hero.jump();
                break;
        }
    }

    public onKeyUp(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowLeft':
                this.hero.stopMoveLeft();
                break;
            case 'ArrowRight':
                this.hero.stopMoveRight();
                break;
        }
    }

    private update() {
        const prevHeroPos = this.hero.position.clone();

        this.hero.update();

        for (const platform of this.platforms) {
            if (!this.isAABBCollision(this.hero, platform)) {
                continue;
            }

            const currY = this.hero.y;
            this.hero.y = prevHeroPos.y;

            if (!this.isAABBCollision(this.hero, platform)) {
                this.hero.stay();
                continue;
            }

            this.hero.y = currY;
            this.hero.x = prevHeroPos.x;
        }
    }
}

export default Game;
