import Box from "./box";

export default class InterestsBox extends Box {
  constructor(node, store) {
    super(node, store);

    store.addToStore("interestsBox", this, node);
    let stor = store.restore("interestsBox");

    if (!stor) {
      stor = {
        title: "Interests",
        hobbies: ["gaming", "microcontrollers", "weightlifting", "gachimuchi", "JS"],
      };
    }
    this.title = stor.title;
    this.hobbies = stor.hobbies;

    this.titleNode = this.rootNode.querySelector(".title");
    this.titleNode.innerHTML = this.title;

    this.hobbiesNode = this.rootNode.querySelector(".interests_content");
    this.hobbiesNode.innerHTML = this.hobbies
      .map((el) => {
        return `<div class="interests_hobby" contenteditable="true" spellcheck="false">${el}</div>`;
      })
      .join("");

    this.hobbiesNode.addEventListener("keydown", this.onKeyDown.bind(this));
    this.hobbiesNode.addEventListener("keydown", this.getTags.bind(this));
    this.hobbiesNode.addEventListener("focusout", this.getTags.bind(this));

    this.titleNode = this.rootNode.querySelector(".title");
    this.titleNode.addEventListener("focusout", this.titleInput.bind(this));
  }

  titleInput() {
    this.title = this.titleNode.textContent;
  }

  getTags() {
    let pointer = this.hobbiesNode.firstElementChild;
    this.hobbies = [];
    while (pointer) {
      this.hobbies.push(pointer.textContent);
      pointer = pointer.nextElementSibling;
    }
  }

  onKeyDown(e) {
    if (e.code === "Enter" || e.code === "Space") {
      const tag = document.createElement("div");
      tag.setAttribute("contenteditable", "true");
      tag.setAttribute("spellcheck", "false");
      tag.classList.add("interests_hobby");
      tag.textContent = "";
      this.hobbiesNode.appendChild(tag);
      e.preventDefault();
      e.target.blur();
      tag.focus();
    } else if (e.code === "Backspace" && e.target.textContent.length == 0) {
      e.preventDefault();
      if (e.target != e.target.parentElement.firstElementChild) {
        e.target.previousElementSibling.focus();
        e.target.remove();
      }
    }
  }
}
