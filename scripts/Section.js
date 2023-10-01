export default class Section {
  constructor({ items, createElementHandler }, containerSelector) {
    this._createElementHandler = createElementHandler;
    this._container = document.querySelector(containerSelector);
    console.log(this._container);
    this._initialRender(items);
  }

  _initialRender(items) {
    items.forEach((item) => {
      const element = this._createElementHandler(item);
      this._container.appendChild(element);
    });
  }

  addItem(element) {
    this._container.prepend(element)
  }
}