
import Directive from "../core/directive";
import JaXCore from "../core/jax";
import Templates from "./templates";
import { 
    arrow, 
    computePosition, 
    ComputePositionConfig, 
    offset, 
    Placement 
} from "../vendor/floating.js";

class Popover
{

    /**
     * Popover Target
     */
    private target: HTMLElement;

    /**
     * Crate a new Popover.
     */
    constructor(target: HTMLElement)
    {
        this.target = target;
        this.target.addEventListener('click', this.toggle.bind(this));
        document.addEventListener('click', this.outside.bind(this));
    }

    /**
     * Hide when click outside
     * @param event 
     * @returns
     */
    public outside(event: Event): void
    {
        if (!('popoverVisible' in this.target.dataset)) {
            return;
        }

        const target = event.target as HTMLElement;
        if (!target.closest(`#${this.target.dataset.popoverVisible}`)) {
            if (!target.closest(`[data-popover-visible="${this.target.dataset.popoverVisible}"]`)) {
                this.hide(event);
            }
        }
    }

    /**
     * Toggle Popover
     * @param event 
     * @returns
     */
    public toggle(event: Event): void
    {
        if ('popoverVisible' in this.target.dataset) {
            this.hide(event);
        } else {
            this.show(event);
        }
    }

    /**
     * Show Popover
     * @param event 
     * @returns
     */
    public show(event: Event): void
    {
        const templates: Templates = window['JaX'].get('templates');
        const template = this.target.dataset.popover;
        if (!templates.has(template)) {
            throw new Error(`The popover template '${template}' does not exist.`);
        }

        // Render Popover Template
        let popover = templates.render(template);
        if (!popover.classList.contains('popover')) {
            popover = ((child) => {
                let temp = document.createElement('DIV');
                temp.className = 'popover';
                temp.appendChild(child);
                return temp;
            })(popover);
        }
        popover.id = `popover__${template}`;

        // Set Visibility
        this.target.dataset.popoverVisible = popover.id;

        // Add Popover Arrow
        let popoverArrow = popover.querySelector('.popover-arrow') as HTMLElement;
        if (!popoverArrow) {
            popoverArrow = document.createElement('DIV') as HTMLDivElement;
            popoverArrow.className = 'popover-arrow';
            popover.appendChild(popoverArrow);
        }

        // Popover Placement
        const options: Partial<ComputePositionConfig> = {
            middleware: [
                offset(10),
                arrow({
                    element: popoverArrow
                })
            ]
        };
        if ('popoverPlacement' in this.target.dataset) {
            options.placement = this.target.dataset.popoverPlacement as Placement;
        }

        // Append & Positionate
        document.body.appendChild(popover);
        computePosition(this.target, popover, options).then(({ x, y, placement, middlewareData }) => {
            popover.style.top = `${y}px`;
            popover.style.left = `${x}px`;

            const { x: arrowX, y: arrowY } = middlewareData.arrow;
            if (arrowY !== null) {
                popoverArrow.style.top = `${arrowY}px`;
            }
            if (arrowY !== null) {
                popoverArrow.style.left = `${arrowX}px`;
            }
        });
    }

    /**
     * Hide Popover
     * @param event 
     * @returns
     */
    public hide(event: Event): void
    {
        let popover = document.querySelector(`#${this.target.dataset.popoverVisible}`);

        if (popover) {
            popover.remove();
        }
        delete this.target.dataset.popoverVisible;
    }

}

/**
 * Register JaX Plugin
 * @param JaX 
 */
function PopoverPlugin(JaX: JaXCore) {
    JaX.component('Popover', Popover);
    JaX.directive('popover', new Directive('popover', (target: HTMLElement) => {
        new Popover(target);
    }));
}

// Export Module
export default Popover;
export { Popover, PopoverPlugin };