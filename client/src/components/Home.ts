import BaseComponent from './BaseComponent';

export default class Home extends BaseComponent {
    constructor(rootContiner: HTMLElement) {
        super();

        rootContiner.appendChild(this.compileTemplate())
    }

    protected getTemplate() {
        return `
            <h1>Hello World</h1>
        `;
    }
}
