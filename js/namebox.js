import Box from "./box";

export default class NameBox extends Box {
  constructor(node, store) {
    super(node, store);

    store.addToStore("nameBox", this, node);
    let stor = store.restore("nameBox");

    if (!stor) {
      stor = {
        name: "Slava Syromyatnikov",
        role: "JS nedocoder",
        greet: "Hi! I'm",
      };
    }

    this.name = stor.name;
    this.role = stor.role;
    this.greet = stor.greet;

    this.nameNode = this.rootNode.querySelector(".name");
    this.nameNode.addEventListener("focusout", this.nameInput.bind(this));

    this.roleNode = this.rootNode.querySelector(".role");
    this.roleNode.addEventListener("focusout", this.roleInput.bind(this));

    this.greetNode = this.rootNode.querySelector(".greeting-phrase");
    this.greetNode.addEventListener("focusout", this.greetInput.bind(this));

    this.nameNode.innerHTML = this.name;
    this.roleNode.innerHTML = this.role;
    this.greetNode.innerHTML = this.greet;
  }

  nameInput() {
    this.name = this.nameNode.textContent;
  }

  roleInput() {
    this.role = this.roleNode.textContent;
  }

  greetInput() {
    this.greet = this.greetNode.textContent;
  }
}
