import Route from "./route";

export default class Router {
  routes: Route[];

  constructor() {
    this.routes = [];
    window.addEventListener("popstate", this.resolve.bind(this));
  }

  addRoute(path: string, view: () => void) {
    this.routes.push(new Route(path, view));
  }

  resolve() {
    const path = window.location.pathname;
    const route = this.routes.find((route) => route.path === path);

    if (route) {
      route.view();
    } else {
      this.navigate("/");
    }
  }

  navigate(path: string) {
    history.pushState(null, "", path);
    this.resolve();
  }
}
