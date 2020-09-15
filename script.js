(function () {
    const template = document.createElement("template");
    template.innerHTML = /*html*/`
  
  <style>
  
  
  :host {
  display: block;
  width: 100%;

  }
  
  :host([aspect="1/1"]) figure {
  --aspect-ratio: 100%;
  }
  
  :host([aspect="16/9"]) figure {
  --aspect-ratio: 56.25%;
  }
  
  :host([aspect="3/2"]) figure {
  --aspect-ratio: 66.7%;
  }
  
  :host([aspect="4/3"]) figure {
  --aspect-ratio: 75%;
  }
  
  .wrapper {
    --saturation: 60%;
    --lightness: 70%;
    --spacing: 4px;
    --contrast: 0.5;
    position: relative;
    background-color: hsla(
      calc(var(--hue) + 30),
      var(--saturation),
      var(--lightness),
      1
    );
    padding: var(--spacing);
    position: relative;
  }
  
  
  figure {
  display: block;
  margin: 0;
  padding-bottom: var(--aspect-ratio);
  position: relative;
  overflow:hidden;
  }
  
  .wrapper img {
    filter: grayscale(1) contrast(var(--contrast));
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: multiply;
    position: absolute;
    display: block;
  }
  
  figure:before {
    background-color: hsla(var(--hue), var(--saturation), var(--lightness), 1);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    mix-blend-mode: overlay;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  </style>
  <div class="wrapper">
  <figure>
  <img src="" alt="">
  </figure>
  
      </div>
  `;
  
    class DuotoneImage extends HTMLElement {
      constructor() {
        super();
  
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
  
      static get observedAttributes() {
        return ["src","hue"];
      }
  
  
      get hue() {
        return this.getAttribute("hue");
      }
  
      set hue(val) {
        if (val) {
          this.setAttribute("hue", val);
        } else {
          this.removeAttribute("hue");
        }
      }
  
      get contrast() {
        return this.getAttribute("contrast");
      }
  
      set contrast(val) {
        if (val) {
          this.setAttribute("contrast", val);
        } else {
          this.removeAttribute("contrast");
        }
      }
  
      get src() {
        return this.getAttribute("src");
      }
  
      set src(val) {
        if (val) {
          this.setAttribute("src", val);
        } else {
          this.removeAttribute("src");
        }
      }
  
      get alt() {
        return this.getAttribute("alt");
      }
  
      set alt(val) {
        if (val) {
          this.setAttribute("alt", val);
        } else {
          this.removeAttribute("alt");
        }
      }
  
      checkHue() {
        var hue = this.getAttribute("hue");
        var shadow = this.shadowRoot;
        var element = shadow.querySelector(".wrapper");
        element.style.setProperty("--hue", hue);
      }
  
      checkSrc() {
        var src = this.getAttribute("src");
        var shadow = this.shadowRoot;
        var image = shadow.querySelector("img");
        image.src = src;
      }
  
      checkAlt() {
        var alt = this.getAttribute("alt");
        var shadow = this.shadowRoot;
        var image = shadow.querySelector("img");
        image.alt = alt;
      }
  
      checkContrast() {
        var contrast = this.getAttribute("contrast");
        var shadow = this.shadowRoot;
        var element = shadow.querySelector(".wrapper");
        element.style.setProperty("--contrast", contrast);
      }
  
      connectedCallback() {
        this.checkSrc();
        this.checkHue();
        this.checkAlt();
        this.checkContrast();
      }

      attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            // Case value is the name of the attribute that has changed
          case 'hue':
            console.log(`${name} changed from ${oldValue} to ${newValue}`);
            this.checkHue()
            break;
        }
      }
    }
    window.customElements.define("duotone-image", DuotoneImage);
  })();
  

var images = document.querySelectorAll('duotone-image');

images.forEach((image,index) =>{
    image.hue = 150 + (index*5)
    console.log(image)
})