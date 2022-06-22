
import type { JaX_EoS } from '../types/jax';
import JaXCore from "../core/jax";

/**
 * Loop through each element of an element stack.
 * @param eos Element(s) or Selector string.
 * @param handler Callback handler for each single element.
 * @returns 
 */
function each(this: JaXCore, eos: JaX_EoS, handler: (el: HTMLElement) => void): void 
{
    if (typeof eos === 'string') {
        eos = this.query(eos);
    }
    
    if (eos !== null && typeof eos[Symbol.iterator] === 'function') {
        [].forEach.call(eos, handler);
    }
};

/**
 * Filter an element stack.
 * @param eos Element(s) or Selector string.
 * @param handler Callback handler for each single element.
 * @returns 
 */
function filter(this: JaXCore, eos: JaX_EoS, handler: (el: HTMLElement) => boolean): HTMLElement[] 
{
    if (typeof eos === 'string') {
        eos = this.query(eos);
    }

    if (eos !== null && typeof eos[Symbol.iterator] === 'function') {
        return [].filter.call(eos, handler);
    } else {
        return [];
    }
}

// Export Module
export { each, filter };