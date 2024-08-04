import "../css/style.css";
import NameBox from "./namebox";
import Store from "./store";
import LanguageBox from "./languagebox";
import ExperienceBox from "./experiencebox";
import EducationBox from "./educationbox";
import InterestsBox from "./interestsbox";
import ContactBox from "./contactbox";
import ToolsBox from "./toolsbox";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const stor = new Store();

const nameBox = new NameBox(document.querySelector(".name-box"), stor);

const languageBox = new LanguageBox(
  document.querySelector(".languages-box"),
  stor
);

const experienceBox = new ExperienceBox(
  document.querySelector(".experience-box"),
  stor
);

const educationBox = new EducationBox(
  document.querySelector(".education-box"),
  stor
);

const interestsBox = new InterestsBox(
  document.querySelector(".interests-box"),
  stor
);

const contactBox = new ContactBox(document.querySelector(".contact-box"), stor);

const toolsBox = new ToolsBox(document.querySelector(".tools-box"), stor);

document
  .querySelector(".generatePDFButton")
  .addEventListener("click", generatePDF);

async function generatePDF() {
  const pdfNode = document.querySelector(".grid");

  html2canvas(pdfNode, {
    scale: 2,
    useCORS: true,
    windowWidth: 1200
  })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 10, 10, imgWidth - 20, imgHeight - 40);
      pdf.save("resume.pdf");
    })
    .catch((err) => {
      console.error("Error while generating PDF", err);
    });
}
