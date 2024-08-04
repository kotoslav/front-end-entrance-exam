import Box from "./box";

export default class ContactBox extends Box {
  constructor(node, store) {
    super(node, store);

    store.addToStore("contactBox", this, node);
    let stor = store.restore("contactBox");

    if (!stor) {
      stor = {
        title: "Lets bazar!",
        email: "zalll007@yandex.ru",
      };
    }
    this.title = stor.title;
    this.email = stor.email;

    this.titleNode = this.rootNode.querySelector(".title");
    this.titleNode.innerHTML = this.title;

    this.emailNode = this.rootNode.querySelector(".contact_email");
    this.emailNode.innerHTML = this.email;

    this.titleNode.addEventListener("focusout", this.titleInput.bind(this));
    this.emailNode.addEventListener("focusout", this.emailInput.bind(this));
  }

  titleInput() {
    this.title = this.titleNode.textContent;
  }

  emailInput() {
    this.email = this.emailNode.textContent;
  }
}
