
import type { JaX_EoS } from "../types/jax";
import JaXCore from "../core/jax";

/**
 * Event Binding
 * @param eos 
 * @param events 
 * @param handler 
 * @returns
 */
function on(this: JaXCore, eos: JaX_EoS, events: string | string[], handler: (event: EventListener) => void): void
{
    if (typeof eos === 'string') {
        eos = this.query(eos);
    }

    if (typeof events === 'string') {
        events = events.split(',').map(e => e.trim());
    }

    [].forEach.call(eos, target => {
        (events as string[]).forEach(event => {
            target.addEventListener(event, handler);
        });
    });
}

/**
 * Live Event Binding
 * @param context 
 * @param selector 
 * @param events 
 * @param handler 
 * @returns
 */
function live(this: JaXCore, context: Document | HTMLElement, selector: string, events: string | string[], handler: (event: EventListener) => void): void
{
    if (typeof events === 'string') {
        events = events.split(',').map(e => e.trim());
    }

    (events as string[]).forEach(event => {
        context.addEventListener(event, (event: Event) => {
            let target = (event.target as HTMLElement);
            let found = target.closest(selector);
            if (found) {
                handler.call(target, event);
            }
        });
    });
}

/**
 * Trigger an Event
 * @param target 
 * @param event 
 * @param eventDict 
 * @returns
 */
function trigger(this: JaXCore, target: HTMLElement, event: string, eventDict: CustomEventInit): void {
    const ev = new CustomEvent(event, eventDict);
    target.dispatchEvent(ev);
}

// Export Module
export { on, live, trigger };
