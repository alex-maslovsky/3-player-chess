import Novigo from 'navigo';

export type Params = {[k in string]: any};

export default class Router {
    private router: Novigo;

    constructor() {
        this.router = new Novigo(null, true, '#');
    }

    on(route: string, handler: (params: Params, query: string) => void): void {
        this.router.on(route, handler);
    }

    resolve(): void {
        this.router.resolve();
    }
}
