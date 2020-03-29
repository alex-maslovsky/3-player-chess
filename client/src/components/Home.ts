import BaseComponent from './BaseComponent';

export default class Home extends BaseComponent {
    constructor(rootContainer: HTMLElement) {
        super();

        rootContainer.appendChild(this.compileTemplate())
    }

    protected getTemplate(): string {
        return `
            <h1>Hello World</h1>
        `;
    }
}
