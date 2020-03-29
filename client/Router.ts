import Novigo from 'navigo';

export type Params = {[k in string]: string};

export default class Router {
    private router: Novigo;

    constructor() {
        const root: string = null;
        const useHash = true;
        const hash = '#';

        this.router = new Novigo(root, useHash, hash);
    }

    public on(route: string, handler: (params: Params, query: string) => void): void {
        this.router.on(route, handler);
    }

    public navigate(route: string): void {
        this.router.navigate(route);
    }

    public resolve(): void {
        this.router.resolve();
    }

    public hookBefore(callback: (done: (suppress?: boolean) => void, params?: Params) => void): void{
        this.router.hooks({
            before: callback,
        });
    }

    public getCurrentRoute(): string {
        return window.location.hash.slice(1);
    }
}
