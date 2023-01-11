/**
 * It defines the animation of a list of elements with the same tag.
 */
class ElementsAnimation {
  constructor(tag) {
    this._tag = tag;
    this._elements = [];
    this._animate = {};
    this._config = { ease: "none", start: 0, end: 1 };
  }

  get tag() {
    return this._tag;
  }

  set elements(value) {
    this._elements = value;
  }

  get elements() {
    return this._elements;
  }

  get animate() {
    return this._animate;
  }

  get config() {
    return this._config;
  }

  to(animate) {
    this._animate = animate;
    return this;
  }

  ease(value) {
    this._config.ease = value;
    return this;
  }

  start(value) {
    this._config.start = value;
    return this;
  }

  end(value) {
    this._config.end = value;
    return this;
  }
}

export default ElementsAnimation;
