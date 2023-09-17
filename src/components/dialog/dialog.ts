import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
    readonly title: string;
    readonly url: string;
}

export interface TextData {
    readonly title: string;
    readonly body: string;
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
    closeListener?: OnCloseListener;
    submitListener?: OnSubmitListener;

    constructor() {
        super(`<section class="dialog">
                <button class="close">&times;</button>
                <div id="dialog__body"></div>
                <button class="dialog_submit">ADD</button>
            </section>`);
        
            const closeBtn = this.element.querySelector('.close')! as HTMLElement;
            // (버튼을 다른 곳에서도 사용한다면) 보통은 addEventListener를 사용하는 것이 좋다.
            // 그러면 등록된 순서대로 모든 콜백 함수가 호출된다.
            //closeBtn.addEventListener('click', "");
            closeBtn.onclick = () => { // 이건 덮어씌우기 때문 (여기서는 여러곳에서 쓸일 없으니 그냥 onClick)
                this.closeListener && this.closeListener();
            }
            const submitBtn = this.element.querySelector('.dialog_submit')! as HTMLElement;
            submitBtn.onclick = () => {
                this.submitListener && this.submitListener();
            }
    }

    setOnCloseListener(listener: OnCloseListener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener: OnSubmitListener) {
        this.submitListener = listener;
    }
    addChild(child: Component): void {
        const body = this.element.querySelector('#dialog__body')! as HTMLElement;
        child.attachTo(body);
    }
}