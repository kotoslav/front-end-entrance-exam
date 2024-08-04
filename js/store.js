export default class Store {
  constructor() {
    this.storage = new Map();
  }

  addToStore(key, obj, rootNode) {
    this.storage.set(key, obj);
    rootNode.addEventListener("focusout", this.save.bind(this, key));
    rootNode.addEventListener("change", this.save.bind(this, key));
    rootNode.addEventListener("click", this.save.bind(this, key));
  }

  restore(key) {
    const objFromLS = JSON.parse(localStorage.getItem(key));
    return objFromLS;
  }

  save(key) {
    const obj = this.storage.get(key);
    localStorage.setItem(key, JSON.stringify(obj));
  }
}
