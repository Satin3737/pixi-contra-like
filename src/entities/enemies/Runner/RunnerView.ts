import {Graphics} from 'pixi.js';
import {EntityView, type IEntityCommonParams} from '../../Entity';
import {type IRunnerViewStates, RunnerViewStates} from './types';

class RunnerView extends EntityView {
    private readonly stroke: {width: number; color: number} = {width: 2, color: 0xff0000};
    private readonly states: Record<IRunnerViewStates, Graphics>;

    private state: IRunnerViewStates = RunnerViewStates.run;

    constructor({options}: IEntityCommonParams) {
        super({size: {width: 20, height: 80}, options});

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

    public show(state: IRunnerViewStates): void {
        if (this.state === state) return;
        Object.values(this.states).forEach(view => (view.visible = false));
        this.states[state].visible = true;
        this.state = state;
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
