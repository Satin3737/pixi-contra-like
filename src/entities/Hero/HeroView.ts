import {Graphics} from 'pixi.js';
import {EntityView, type IEntityCommonParams} from '../Entity';
import {HeroViewStates, type IHeroViewStates} from './types';

class HeroView extends EntityView {
    private readonly stroke: {width: number; color: number} = {width: 2, color: 0x0000ff};
    private readonly states: Record<IHeroViewStates, Graphics>;

    private state: IHeroViewStates = HeroViewStates.stay;

    public constructor({options}: IEntityCommonParams) {
        super({size: {width: 20, height: 80}, options});

        this.states = {
            [HeroViewStates.stay]: this.drawStayView(),
            [HeroViewStates.stayUp]: this.drawStayUpView(),
            [HeroViewStates.stayDown]: this.drawStayDownView(),
            [HeroViewStates.run]: this.drawRunView(),
            [HeroViewStates.runUp]: this.drawRunUpView(),
            [HeroViewStates.runDown]: this.drawRunDownView(),
            [HeroViewStates.lay]: this.drawLayView(),
            [HeroViewStates.jump]: this.drawJumpView()
        };

        Object.entries(this.states).forEach(([state, view]) => {
            view.visible = this.state === state;
            this.view.addChild(view);
        });
    }

    public show(state: IHeroViewStates): void {
        if (this.state === state) return;
        Object.values(this.states).forEach(view => (view.visible = false));
        this.states[state].visible = true;
        this.state = state;
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
