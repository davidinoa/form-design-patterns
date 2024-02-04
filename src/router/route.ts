export default class Route {
  path: string;
  view: () => void;

  constructor(path: string, view: () => void) {
    this.path = path;
    this.view = view;
  }
}
