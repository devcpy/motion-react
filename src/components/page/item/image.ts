import { BaseComponent } from "../../component.js";

export class ImageComponent extends BaseComponent<HTMLElement> {
    
    constructor(title:string, url:string) {

        super(`<section class="image">
                <div class="image__holer">
                    <img class="image__thumbnail">
                </div>
                <h2 class="page-item__title image__title"></h2>
                </section>`);
        // 더 간편하게 요소를 만드는 법
        // const template = document.createElement('template');
        // // string 타입으로 코드 작성
        // template.innerHTML = `<section class="image">
        // <div class="image__holer">
        //     <img class="image__thumbnail">
        // </div>
        // <p class="image__title"></p>
        // </section>`;
        // // 직접 위의 string에서 ${} 형태로 넣어주는 것은 좋지 않다.
        // // 항상 필요한 부분만 아래처럼 업데이트해주는 것이 안전하다.
        //this.element = template.content.firstElementChild! as HTMLElement;
        const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
        imageElement.src = url;
        imageElement.alt = title;

        const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
        titleElement.textContent = title;

    }
}