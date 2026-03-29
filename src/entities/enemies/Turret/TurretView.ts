import {Graphics} from 'pixi.js';
import {EntityView, type IEntityCommonParams} from '../../Entity';

class TurretView extends EntityView {
    private readonly stroke: {width: number; color: number} = {width: 2, color: 0xff0000};
    private readonly barrel: Graphics = new Graphics();

    public constructor({options}: IEntityCommonParams) {
        super({size: {width: 100, height: 100}, options});
        this.drawTurret();
    }

    public get barrelRotation(): number {
        return this.barrel.rotation;
    }

    public set barrelRotation(value: number) {
        this.barrel.rotation = value;
    }

    private drawTurret(): void {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.circle(this.bounds.width / 2, this.bounds.height / 2, this.bounds.width / 2).stroke();
        view.pivot.set(0.5, 0.5);
        this.view.addChild(view);

        this.barrel.setStrokeStyle(this.stroke);
        this.barrel.rect(0, 0, 80, 10).stroke();
        this.barrel.pivot.set(5, 5);
        this.barrel.position.set(this.bounds.width / 2, this.bounds.height / 2);

        this.view.addChild(this.barrel);
    }
}

export default TurretView;
