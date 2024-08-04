import Box from "./box";

export default class EducationBox extends Box {
  constructor(node, store) {
    super(node, store);

    this._uniqKey = 0;

    store.addToStore("educationBox", this, node);
    let stor = store.restore("educationBox");

    if (!stor) {
      stor = {
        title: "Educationss",
        educationList: [
          {
            date: "2023",
            like: true,
            spec: "QA Engineer(WEB)",
            tags: ["postman", "jester", "git", "kanban", "music quiz", "Playwright", "API"],
            school: "Tinkoff fintech",
          },
          {
            date: "2013-2017",
            like: false,
            spec: "circuit engineer",
            tags: ["circuit design", "transistors", "Boolean algebra", "С++", "Networks", "Server administration"],
            school: "SFU IKIT",
          },
          {
            date: "2002-2013",
            like: false,
            spec: "shked",
            tags: ["html", "cs 1.6", "dendy", "Bible"],
            school: "MBOU SoSH",
          },
        ],
      };
    }

    this.title = stor.title;
    this.educationList = stor.educationList;

    this.titleNode = this.rootNode.querySelector(".title");
    this.titleNode.addEventListener("focusout", this.titleInput.bind(this));
    this.listNode = this.rootNode.querySelector(".education_content");

    this.educationList = this.educationList.map((edu) => {
      return new Education(edu, this.uniqKey);
    });

    this.titleNode.innerHTML = this.title;

    this.render();
  }

  titleInput() {
    this.title = this.titleNode.textContent;
  }

  render() {
    this.educationList.forEach((element) => {
      this.listNode.appendChild(element.rootNode);
    });
  }

  get uniqKey() {
    return this._uniqKey++;
  }
}

class Education {
  constructor(eduObj, key) {
    this.date = eduObj.date;
    this.like = eduObj.like;
    this.spec = eduObj.spec;
    this.tags = eduObj.tags;
    this.school = eduObj.school;

    this.rootNode = this.render();

    this.tagsNode = this.rootNode.querySelector(".education-card_tags");
    this.tagsNode.addEventListener("keydown", this.onKeyDown.bind(this));
    this.tagsNode.addEventListener("focusout", this.getTags.bind(this));

    this.likeNode = this.rootNode.querySelector(".education-card_like");
    this.likeNode.addEventListener("click", this.setLike.bind(this));

    this.dateNode = this.rootNode.querySelector(".education-card_time");
    this.dateNode.addEventListener("focusout", this.inputDate.bind(this));

    this.specNode = this.rootNode.querySelector(".education-card_spec");
    this.specNode.addEventListener("focusout", this.inputSpec.bind(this));

    this.schoolNode = this.rootNode.querySelector(
      ".education-card_school-name"
    );
    this.schoolNode.addEventListener("focusout", this.inputSchool.bind(this));
  }

  inputSchool() {
    this.school = this.schoolNode.textContent;
  }

  inputSpec() {
    this.spec = this.specNode.textContent;
  }

  inputDate() {
    this.date = this.dateNode.textContent;
  }

  setLike(e) {
    this.like = !this.like;
    e.target
      .closest(".education_card")
      .classList.toggle("education-card_liked");
  }

  getTags() {
    let pointer = this.tagsNode.firstElementChild;
    this.tags = [];
    while (pointer) {
      if (pointer.textContent.length > 1)
        this.tags.push(pointer.textContent.slice(1));
      pointer = pointer.nextElementSibling;
    }
  }

  onKeyDown(e) {
    if (e.code === "Enter") {
      const tag = document.createElement("span");
      tag.setAttribute("contenteditable", "true");
      tag.setAttribute("spellcheck", "false");
      tag.textContent = "#";
      this.tagsNode.appendChild(tag);
      tag.after(" ");
      e.preventDefault();
      e.target.blur();
      tag.focus();
    } else if (e.code === "Backspace" && e.target.textContent.length == 1) {
      e.preventDefault();
      if (e.target != e.target.parentElement.firstElementChild) {
        e.target.previousElementSibling.focus();
        e.target.remove();
      }
    }
  }

  render() {
    const template = `
            <div class="education_card ${
              this.like ? "education-card_liked" : ""
            } ">
            <div class="education-card_top-bar">
                <div class="education-card_time" contenteditable="true" spellcheck="false">${
                  this.date
                }</div>
                <button class="education-card_like">
                    <img src="like.svg" alt="like image" class="like_img">
                </button>
              </div>
                <div class="education-card_content">
                  <div class="education-card_spec" contenteditable="true" spellcheck="false">${
                    this.spec
                  }</div>
                  <div class="education-card_tags">
                    ${this.tags
                      .map((tag) => {
                        return `<span contenteditable="true" spellcheck="false">#${tag}</span>`;
                      })
                      .join(" ")}
                  </div>
                </div>
                <div class="education-card_school-name" contenteditable="true" spellcheck="false">${
                  this.school
                }</div>
                </div>
        `;
    const el = document.createElement("div");
    el.classList.add("education_wrap");
    el.innerHTML = template;
    return el;
  }
}
