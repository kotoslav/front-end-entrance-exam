export default class Box {
  constructor(node, store) {
    this.rootNode = node;

    this.rootNode.addEventListener("input", this.onParagraph);
    this.rootNode.addEventListener("keydown", this.onEnter.bind(this));
    this.rootNode.addEventListener("focusin", this.onFocus);
    this.rootNode.addEventListener("click", this.animation);
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
    const elPositionX = e.currentTarget.getBoundingClientRect().x + window.pageXOffset;
    const elPositionY = e.currentTarget.getBoundingClientRect().y + window.pageYOffset;
    
    const x = e.pageX - elPositionX;
    const y = e.pageY - elPositionY;
    
    e.currentTarget.appendChild(rippleEl);

    rippleEl.style.left = x + "px";
    rippleEl.style.top = y + "px";
    
    
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
