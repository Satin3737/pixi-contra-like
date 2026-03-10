import {Container, type ContainerOptions, Graphics} from 'pixi.js';
import type {IPosSize, IViewStates} from '@/interfaces';
import {ViewStates} from '@/const';

class HeroView extends Container {
    private readonly view = new Container();
    private readonly stroke: {width: number; color: number} = {width: 2, color: 0x0000ff};
    private readonly states: Record<IViewStates, Graphics>;

    private bodySize: {width: number; height: number} = {width: 20, height: 80};
    private state: IViewStates = ViewStates.stay;

    constructor(options?: ContainerOptions) {
        super(options);

        this.createView();

        this.states = {
            [ViewStates.stay]: this.drawStayView(),
            [ViewStates.stayUp]: this.drawStayUpView(),
            [ViewStates.stayDown]: this.drawStayDownView(),
            [ViewStates.run]: this.drawRunView(),
            [ViewStates.runUp]: this.drawRunUpView(),
            [ViewStates.runDown]: this.drawRunDownView(),
            [ViewStates.lay]: this.drawLayView(),
            [ViewStates.jump]: this.drawJumpView()
        };

        Object.values(this.states).forEach(view => this.view.addChild(view));

        this.setState(this.state);
    }

    public get bounds(): IPosSize {
        return {x: this.x, y: this.y, width: this.bodySize.width, height: this.bodySize.height};
    }

    private setState(state: IViewStates): void {
        this.state = state;

        Object.values(this.states).forEach(view => {
            view.visible = false;
        });

        this.states[this.state].visible = true;
    }

    private createView(): void {
        const halfWidth = this.bounds.width * 0.5;
        this.view.pivot.x = halfWidth;
        this.view.x = halfWidth;
        this.addChild(this.view);
    }

    private drawStayView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, this.bounds.width, this.bounds.height).stroke();
        view.rect(0, 30, 60, 10).stroke();
        return view;
    }

    private drawStayUpView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, this.bounds.width, this.bounds.height).stroke();
        view.rect(5, -20, 10, 60).stroke();
        return view;
    }

    private drawStayDownView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, this.bounds.width, this.bounds.height).stroke();
        view.rect(5, 30, 10, 60).stroke();
        return view;
    }

    private drawRunView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, this.bounds.width, this.bounds.height).stroke();
        view.rect(0, 30, 60, 10).stroke();
        view.skew.x = -0.1;
        return view;
    }

    private drawRunUpView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, this.bounds.width, this.bounds.height).stroke();
        view.lineTo(0, 30).lineTo(40, -20).lineTo(45, -15).lineTo(0, 40).stroke();
        view.skew.x = -0.1;
        return view;
    }

    private drawRunDownView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, this.bounds.width, this.bounds.height).stroke();
        view.lineTo(0, 20).lineTo(40, 60).lineTo(35, 65).lineTo(0, 30).stroke();
        view.skew.x = -0.1;
        return view;
    }

    private drawLayView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, this.bounds.height, this.bounds.width).stroke();
        view.rect(40, 5, 60, 10).stroke();
        view.x -= 80;
        view.y += 60;
        return view;
    }

    private drawJumpView(): Graphics {
        const view = new Graphics();
        view.setStrokeStyle(this.stroke);
        view.rect(0, 0, 40, 40).stroke();
        view.x -= 10;
        view.y += 25;
        return view;
    }
}

export default HeroView;
