export default class Box {
  constructor(node, store) {
    this.rootNode = node;

    this.rootNode.addEventListener("input", this.onParagraph);
    this.rootNode.addEventListener("keydown", this.onEnter.bind(this));
    this.rootNode.addEventListener("focusin", this.onFocus);
    this.rootNode.addEventListener("focusout", this.animation);
  }

  onEnter(e) {
    this.animation(e);
    if (e.code === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  }

  onParagraph(e) {
    if (e.inputType === "insertParagraph") {
      e.preventDefault();
    }
  }

  animation(e) {
    const rippleEl = document.createElement('div');
    rippleEl.classList.add('ripple');

    
    const x = e.offsetX;
    const y = e.offsetY;
    
    e.currentTarget.appendChild(rippleEl);

    rippleEl.style.left =  "0";
    rippleEl.style.top = "0";
    
    
    requestAnimationFrame(() => {
      rippleEl.classList.add('run');
    });
    
    rippleEl.addEventListener('transitionend', () => {
      rippleEl.remove();
    });
  }

  onFocus(e) {
    if (e.target.hasAttribute("contenteditable")) {
      const range = document.createRange();
      range.selectNodeContents(e.target);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
