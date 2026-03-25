import {Container, type ContainerOptions, Graphics} from 'pixi.js';
import {Directions, type IDirections, type IPosSize} from '@/types';
import {type IRunnerViewStates, RunnerViewStates} from './types';

class RunnerView extends Container {
    private readonly view = new Container();
    private readonly stroke: {width: number; color: number} = {width: 2, color: 0xff0000};
    private readonly states: Record<IRunnerViewStates, Graphics>;

    private bodySize: {width: number; height: number} = {width: 20, height: 80};
    private state: IRunnerViewStates = RunnerViewStates.run;

    constructor(options?: ContainerOptions) {
        super(options);

        this.createView();

        this.states = {
            [RunnerViewStates.run]: this.drawRunView(),
            [RunnerViewStates.jump]: this.drawFallView(),
            [RunnerViewStates.fall]: this.drawFallView()
        };

        Object.entries(this.states).forEach(([state, view]) => {
            view.visible = this.state === state;
            this.view.addChild(view);
        });
    }

    public get bounds(): IPosSize {
        return {x: this.x, y: this.y, width: this.bodySize.width, height: this.bodySize.height};
    }

    public get direction(): IDirections {
        const scaleX = this.view.scale.x;
        if (scaleX === Directions.left) return Directions.left;
        if (scaleX === Directions.right) return Directions.right;
        return Directions.stop;
    }

    public show(state: IRunnerViewStates): void {
        if (this.state === state) return;
        Object.values(this.states).forEach(view => (view.visible = false));
        this.states[state].visible = true;
        this.state = state;
    }

    public flip(direction: IDirections) {
        this.view.scale.x = direction;
    }

    private createView(): void {
        const halfWidth = this.bounds.width * 0.5;
        this.view.pivot.x = halfWidth;
        this.view.x = halfWidth;
        this.addChild(this.view);
    }

    private drawRunView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, this.bounds.width, this.bounds.height).stroke();
        return view;
    }

    private drawFallView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, 40, 40).stroke();
        view.x -= 10;
        view.y += 25;
        return view;
    }
}

export default RunnerView;
