class Loader extends HTMLImageElement
{
    constructor(parentElement, src = "../src/img/loading.svg")
    {
        super();
        if(parentElement instanceof HTMLElement)
        {
            this.src = src;
            this.classList.add("loader");
            parentElement.appendChild(this);
        }
        else
        {
            throw `${parentElement} is not an HTMLElement!`;
        }
    }

    start()
    {
        this.hidden = false;
    }

    stop()
    {
        this.hidden = true;
    }

    toggle()
    {
        this.hidden = !this.hidden;
    }

    remove()
    {
        this.parentElement.removeChild(this);
    }
};

customElements.define('img-loader', Loader, {extends: 'img'});

export default Loader;