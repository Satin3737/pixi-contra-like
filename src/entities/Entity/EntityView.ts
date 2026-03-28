import {Container, type ContainerOptions} from 'pixi.js';
import {Directions, type IDirections, type IPosSize, type ISize} from '@/types';

class EntityView extends Container {
    protected readonly view = new Container();

    private readonly size: ISize;

    protected constructor(size: ISize, options?: ContainerOptions) {
        super(options);
        this.size = size;

        const halfWidth = this.bounds.width * 0.5;
        this.view.pivot.x = halfWidth;
        this.view.x = halfWidth;
        this.addChild(this.view);
    }

    public get bounds(): IPosSize {
        return {
            x: this.x,
            y: this.y,
            width: this.size.width,
            height: this.size.height
        };
    }

    public get direction(): IDirections {
        const scaleX = this.view.scale.x;
        if (scaleX === Directions.left) return Directions.left;
        if (scaleX === Directions.right) return Directions.right;
        return Directions.stop;
    }

    public flip(direction: IDirections) {
        this.view.scale.x = direction;
    }
}

export default EntityView;
