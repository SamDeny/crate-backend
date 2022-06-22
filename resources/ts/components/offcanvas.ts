
import Directive from "../core/directive";
import { mergeOptions } from "../core/helper";
import JaXCore from "../core/jax";
import Templates from "./templates";

interface OffcanvasOptions {

    /**
     * Toggle Animation
     */
    animation: 'slide' | 'bubble';

    /**
     * Apply a Backdrop on the body
     */
    backdrop: boolean;

    /**
     * Support Keyboard interactions
     */
    keyboard: boolean;

    /**
     * Offcanvas Body scrollable
     */
    scrollable: boolean;

}

class Offcanvas
{

    /**
     * Offcanvas Target
     */
    private target: HTMLElement;

    /**
     * Offcanvas Options
     */
    private options: OffcanvasOptions;

    /**
     * Offcanvas Backdrop Element
     */
    private backdrop: HTMLElement|null;

    /**
     * Crate a new Offcanvas.
     */
    constructor(target: HTMLElement, options: Partial<OffcanvasOptions> = {})
    {
        this.target = target;
        this.target.addEventListener('click', this.toggle.bind(this));
        document.addEventListener('click', this.outside.bind(this));

        this.options = mergeOptions({
            animation: 'slide',
            backdrop: true,
            keyboard: true,
            scrollable: true
        }, options, target, 'offcanvas') as OffcanvasOptions;
    }

    /**
     * Hide when click outside
     * @param event 
     * @returns
     */
    public outside(event: Event): void
    {
        if (!('offcanvasVisible' in this.target.dataset)) {
            return;
        }

        const target = event.target as HTMLElement;
        if (!target.closest(`#${this.target.dataset.offcanvasVisible}`)) {
            if (!target.closest(`[data-offcanvas-visible="${this.target.dataset.offcanvasVisible}"]`)) {
                this.hide(event);
            }
        }
    }

    /**
     * Toggle Offcanvas Screen
     * @param event 
     */
    public toggle(event: Event): void
    {
        if ('offcanvasVisible' in this.target.dataset) {
            this.hide(event);
        } else {
            this.show(event);
        }
    }

    /**
     * Show Offcanvas
     * @param event 
     * @returns
     */
    public show(event: Event): void
    {
        const templates: Templates = window['JaX'].get('templates');
        const template = this.target.dataset.offcanvas;
        if (!templates.has(template)) {
            throw new Error(`The offcanvas template '${template}' does not exist.`);
        }

        // Render Offcanvas Template
        let offcanvas = templates.render(template);
        if (!offcanvas.classList.contains('offcanvas')) {
            throw new Error(`The offcanvas template '${template}' is invalid.`);
        }
        offcanvas.id = `offcanvas__${template}`;

        // Set Visibility
        this.target.dataset.offcanvasVisible = offcanvas.id;
        
        // Append Offcanvas
        if (this.options.backdrop) {
            this.backdrop = document.createElement('DIV');
            this.backdrop.className = 'backdrop';
            document.body.appendChild(this.backdrop);
        }
        document.body.appendChild(offcanvas);
        setTimeout(() => { offcanvas.classList.add('show'); }, 10);
    }
 
    /**
     * Hide Offcanvas
     * @param event 
     * @returns
     */
    public hide(event: Event): void
    {
        let offcanvas = document.querySelector(`#${this.target.dataset.offcanvasVisible}`);
        offcanvas.classList.remove('show');

        setTimeout(() => {
            offcanvas.remove();
            if (this.backdrop) {
                this.backdrop.remove();
                this.backdrop = null;
            }
            delete this.target.dataset.offcanvasVisible;
        }, 310);
    }
     
}


/**
 * Register JaX Plugin
 * @param JaX 
 */
 function OffcanvasPlugin(JaX: JaXCore) {
    JaX.component('Offcanvas', Offcanvas);
    JaX.directive('offcanvas', new Directive('offcanvas', (target: HTMLElement) => {
        new Offcanvas(target);
    }));
}

// Export Module
export default Offcanvas;
export { Offcanvas, OffcanvasPlugin };