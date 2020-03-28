import Mustache from 'mustache';

export default abstract class BaseComponent {
    protected abstract getTemplate(): string;

    protected compileTemplate(params?: object): HTMLElement {
        const div = document.createElement('div');
        div.innerHTML = Mustache.render(this.getTemplate(), params);
        return div.children[0] as HTMLElement;
    }
}
