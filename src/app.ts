import { Component } from "./components/component.js";
import { InputDialog, MediaData, TextData } from "./components/dialog/dialog.js";
import { MediaSectionnput } from "./components/dialog/input/media-input.js";
import { TextSectionnput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
    new (): T;
}

class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        // const image = new ImageComponent('Image title', 'https://picsum.photos//600/300');
        // this.page.addChild(image);
        // //image.attachTo(appRoot, 'beforeend');

        // const note = new NoteComponent('Note Title', 'Note Body');
        // this.page.addChild(note);
        // //note.attachTo(appRoot, 'beforeend');

        // const todo = new TodoComponent('Todo Title', 'Todo body');
        // this.page.addChild(todo);
        // //todo.attachTo(appRoot, 'beforeend');

        // const video = new VideoComponent('Video Title', 'https://www.youtube.com/embed/7MnwDJvaDGE');
        // this.page.addChild(video);
        // //video.attachTo(appRoot, 'beforeend');

        this.bindElementToDialog<MediaSectionnput>(
            '#new-image', 
            MediaSectionnput, 
            (input:MediaSectionnput) => new ImageComponent(input.title, input.url)
        );
        
        this.bindElementToDialog<MediaSectionnput>(
            '#new-video', 
            MediaSectionnput, 
            (input:MediaSectionnput) => new VideoComponent(input.title, input.url)
        );
        
        this.bindElementToDialog<TextSectionnput>(
            '#new-note', 
            TextSectionnput, 
            (input:TextSectionnput) => new NoteComponent(input.title, input.body)
        );
        
        this.bindElementToDialog<TextSectionnput>(
            '#new-todo', 
            TextSectionnput, 
            (input:TextSectionnput) => new TodoComponent(input.title, input.body)
        );
    }

    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector: string, 
        InputComponent: InputComponentConstructor<T>,
        makeSection: (input: T) => Component,
    ) {
        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new InputComponent();

            dialog.addChild(inputSection);
            dialog.attachTo(this.dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                // 섹션을 만들어서 페이지에 추가한다.
                const section = makeSection(inputSection);
                this.page.addChild(section);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);