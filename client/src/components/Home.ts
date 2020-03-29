import BaseComponent from './BaseComponent';

export default class Home extends BaseComponent {
    constructor() {
        super();
    }

    protected getTemplate(): string {
        return `
            <h1>Hello World</h1>
        `;
    }
}
