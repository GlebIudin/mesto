export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderElements(elements) {
    elements.forEach(element => {
      this._renderer(element);
    });
  };

  addItem(element) {
    this._container.prepend(element);
  };

}