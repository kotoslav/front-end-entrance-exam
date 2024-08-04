import Box from "./box";

export default class ExperienceBox extends Box {
  constructor(node, store) {
    super(node, store);

    this._uniqKey = 0;
    this.jobList = [];
    this.title = "";

    store.addToStore("experienceBox", this, node);
    let stor = store.restore("experienceBox");

    if (!stor) {
      stor = {
        title: "Experience",
        tag: "most-recent",
        jobList: [
          {
            date: "Aug. 2017 - Present",
            roleName: "Sysadmin",
            about: ["KKDB", "Full-time"],
            featuredPoints: [
              {
                text: "I set up the server and placed the library's website on it.",
              },
              {
                text: "I'm tired of carrying bookshelves and other furniture...",
              },
            ],
          },
          {
            date: "2022 - 2023",
            roleName: "Fullstack",
            about: ["Freelance"],
            featuredPoints: [
              {
                text: "I wrote and uploaded a website with funeral goods.",
              },
              {
                text: "I found out that everyone wants a wordpress site.",
              },
            ],
          },
          {
            date: "2015 - 2016",
            roleName: "Network rigger",
            about: ["IKIT", "Part-time"],
            featuredPoints: [
              {
                text: "I learned how to crimp a twisted pair.",
              },
            ],
          },
        ],
      };
    }

    this.title = stor.title;
    this.tag = stor.tag;
    this.titleNode = this.rootNode.querySelector(".title");
    this.titleNode.addEventListener("focusout", this.titleInput.bind(this));
    this.titleNode.innerHTML = this.title;

    stor.jobList.forEach((job) => {
      this.jobList.push(new Job(job, this.uniqKey));
    });

    this.render();
  }
  render() {
    this.jobList[0].rootNode.classList.add("last-job");
    const tag = document.createElement("div");
    tag.classList.add("job_tag");
    tag.textContent = this.tag;
    tag.setAttribute("contenteditable", "true");
    tag.setAttribute("spellcheck", "false");
    this.jobList[0].rootNode.querySelector(".job_top-bar").appendChild(tag);
    const list = this.rootNode.querySelector(".job-list");
    this.jobList.forEach((job) => {
      list.appendChild(job.rootNode);
    });
  }

  get uniqKey() {
    return this._uniqKey++;
  }

  titleInput() {
    this.title = this.titleNode.innerHTML;
  }
}

class Job {
  constructor(jobObj, key) {
    this._pointKey = 0;

    this.date = jobObj.date;
    this.roleName = jobObj.roleName;
    this.about = jobObj.about;
    this.featuredPoints = jobObj.featuredPoints;

    this.featuredPoints = this.featuredPoints.map((point) => {
      return new FeaturedPoint(point.text, this.pointKey);
    });

    this.rootNode = this.render();

    this.featuredList = this.rootNode.querySelector(".featured-list");
    this.featuredList.addEventListener("keydown", this.onKeyDown.bind(this));

    this.featuredPoints.forEach((point) => {
      this.featuredList.appendChild(point.rootNode);
    });

    this.dateNode = this.rootNode.querySelector(".job_date");
    this.dateNode.addEventListener("focusout", this.dateInput.bind(this));

    this.roleNode = this.rootNode.querySelector(".job_role-name");
    this.roleNode.addEventListener("focusout", this.roleInput.bind(this));

    this.aboutNode = this.rootNode.querySelector(".job_about");
    this.aboutNode.addEventListener("focusout", this.aboutInput.bind(this));
  }

  onKeyDown(e) {
    if (e.code === "Enter") {
      const newPoint = new FeaturedPoint("", this.pointKey);
      this.featuredPoints.push(newPoint);
      this.featuredList.appendChild(newPoint.rootNode);
      e.preventDefault();
      e.target.blur();
      newPoint.rootNode.focus();
    } else if (
      e.code === "Backspace" &&
      e.target.textContent == "" &&
      this.featuredPoints.length > 1
    ) {
      this.featuredPoints = this.featuredPoints.filter((point) => {
        return e.target.getAttribute("data-key") != point.key;
      });
      e.preventDefault();
      e.target.blur();
      e.target.previousElementSibling.focus();
      e.target.remove();
    }
  }

  get pointKey() {
    return this._pointKey++;
  }

  dateInput(e) {
    this.date = this.dateNode.textContent;
  }

  roleInput(e) {
    this.roleName = this.roleNode.textContent;
  }

  aboutInput(e) {
    if (e.target.classList.contains("job_company-name")) {
      this.about[1] = e.target.innerHTML;
    } else {
      this.about[0] = e.target.innerHTML;
    }
  }

  render() {
    const template = `
            <div class="job_top-bar">
              <span class="job_date" contenteditable="true" spellcheck="false">${
                this.date
              }</span>
            </div>
            <div class="job_content">
              <div class="job_info">
                <span class="job_role-name" contenteditable="true" spellcheck="false">${
                  this.roleName
                }</span>
                <div class="job_about">
                ${
                  this.about.length > 1
                    ? `
                        <span class="job_company-name" contenteditable="true" spellcheck="false">${this.about[1]}</span>
                        <span class="job_text_separator">|</span>
                        <span class="job_info" contenteditable="true" spellcheck="false">${this.about[0]}</span>
                    `
                    : `
                     <span class="job_info" contenteditable="true" spellcheck="false">${this.about[0]}</span>   
                    `
                }

                </div> 
              </div>
              <div class="job_featured-points">
                <ul class="featured-list">
                </ul>
              </div>
            </div>
        `;
    const el = document.createElement("div");
    el.classList.add("job");
    el.innerHTML = template;
    return el;
  }
}

class FeaturedPoint {
  constructor(text, key) {
    this.text = text;
    this.key = key;
    this.rootNode = this.render();

    this.rootNode.addEventListener("focusout", this.textInput.bind(this));
  }

  textInput() {
    this.text = this.rootNode.textContent;
  }

  render() {
    const el = document.createElement("li");
    el.setAttribute("contenteditable", "true");
    el.setAttribute("spellcheck", "false");
    el.setAttribute("data-key", String(this.key));
    el.innerHTML = this.text;
    return el;
  }
}
