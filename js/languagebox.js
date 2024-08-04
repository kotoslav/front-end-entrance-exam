import Box from "./box";

export default class LanguageBox extends Box {
  constructor(node, store) {
    super(node, store);
    this._langKey = 0;

    this.languages = [];

    store.addToStore("languageBox", this, node);
    let stor = store.restore("languageBox");

    this.titleNode = this.rootNode.querySelector(".title");
    this.titleNode.addEventListener("focusout", this.titleInput.bind(this));

    if (!stor) {
      stor = {
        title: "Languages",
        languages: [
          {
            title: "English",
            progress: 50,
          },
          {
            title: "HDMI",
            progress: 10,
          },
          {
            title: "Russian",
            progress: 70,
          },
        ],
      };
    }

    this.title = stor.title;
    this.titleNode.innerHTML = this.title;

    stor = stor.languages;

    stor.forEach((lang) => {
      this.languages.push(
        new Language(lang.title, lang.progress, this.langKey)
      );
    });

    this.render();
  }

  get langKey() {
    this._langKey++;
    return this._langKey;
  }

  titleInput() {
    this.title = this.titleNode.textContent;
  }

  render() {
    const list = this.rootNode.querySelector(".languages-list");
    this.languages.forEach((lang) => {
      list.appendChild(lang.rootNode);
    });
  }
}

class Language {
  constructor(title, progress, key) {
    this.title = title;
    this.progress = progress;
    this.key = key;

    this.rootNode = this.render();

    this.langInput = this.rootNode.querySelector(".lang_title");
    this.langInput.addEventListener("focusout", this.titleInput.bind(this));

    this.rangeInput = this.rootNode.querySelector(".lang_progress-input");
    this.rangeInput.addEventListener("input", this.progressInput.bind(this));
    this.rangeInput.addEventListener("focusin", this.onRangeFocus);
    this.rangeInput.addEventListener("focusout", this.onRangeFocusOut);
  }

  render() {
    const template = `<div class="lang" data-key="${this.key}">
            <div class="lang_title" contenteditable="true" spellcheck="false">${this.title}</div>
            <div class="lang_progress-wrapper">
            <input class="lang_progress-input" type="range" min="0" max="100" value="${this.progress}">
            <div class="lang_progress" style="width: ${this.progress}%"></div>
            </div>
        </div>`;
    const el = document.createElement("div");
    el.innerHTML = template;
    return el;
  }

  titleInput() {
    this.title = this.langInput.innerHTML;
  }

  progressInput() {
    this.progress = this.rangeInput.value;
    this.rootNode.querySelector(".lang_progress").style.width =
      this.progress + "%";
  }

  onRangeFocus(e) {
    e.target.nextElementSibling.style.backgroundColor = "#4ab150";
  }

  onRangeFocusOut(e) {
    e.target.nextElementSibling.style.backgroundColor = "#28D979";
  }
}
