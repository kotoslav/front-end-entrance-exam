import Box from "./box";

export default class ToolsBox extends Box {
  constructor(node, store) {
    super(node, store);

    store.addToStore("toolsBox", this, node);
    let stor = store.restore("toolsBox");

    if (!stor) {
      stor = {
        title: "Tools",
        toolsCards: [
          {
            tag: "programming",
            toolsList: [
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
            ],
          },
          {
            tag: "no-code",
            toolsList: [
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
            ],
          },
          {
            tag: "AI",
            toolsList: [
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
              {
                src: "./icon _adobe photoshop.png",
                alt: "photoshop icon",
              },
            ],
          },
        ],
      };
    }
    this.title = stor.title;
    this.toolsCards = stor.toolsCards;

    this.toolsCards = this.toolsCards.map((el) => {
      return new ToolCard(el);
    });

    this.titleNode = this.rootNode.querySelector(".title");
    this.titleNode.innerHTML = this.title;

    this.toolsNode = this.rootNode.querySelector(".tool-categories");

    this.titleNode.addEventListener("focusout", this.titleInput.bind(this));
    this.render();
  }

  titleInput() {
    this.title = this.titleNode.textContent;
  }

  render() {
    this.toolsCards.forEach((el) => {
      this.toolsNode.appendChild(el.rootNode);
    });
  }
}

class ToolCard {
  constructor(cardObj) {
    this.toolsList = cardObj.toolsList;
    this.tag = cardObj.tag;

    this.rootNode = this.render();

    this.tagNode = this.rootNode.querySelector(".tool_tag");
    this.tagNode.addEventListener("focusout", this.tagInput.bind(this));
  }

  tagInput() {
    this.tag = this.tagNode.textContent;
  }

  render() {
    const template = `
            <div class="tag_wrapper">
            <div class="tool_tag" contenteditable="true" spellcheck="false">
            ${this.tag}
            </div>
            </div>
            <div class="tool_icons">
            ${this.toolsList
              .map((el) => {
                return `<img class="tool_icon" src="${el.src}" alt="${el.alt}"/>`;
              })
              .join("")}
            </div>`;
    const el = document.createElement("div");
    el.classList.add("tool");
    el.innerHTML = template;
    return el;
  }
}
