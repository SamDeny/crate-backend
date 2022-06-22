
import Directive from "./directive";

class JaXCore
{

    /**
     * Container Storage
     */
    private container: Map<string, any>;

    /**
     * Directive Storage
     */
    private directives: Map<string, Directive>;

    /**
     * Component Storage
     */
    private components: Map<string, any>;

    /**
     * Create a new JaXCore instance.
     */
    constructor()
    {
        this.container = new Map;
        this.directives = new Map;
        this.components = new Map;
    }

    /**
     * Basic querySelector helper
     * @param selector 
     * @param context 
     * @returns 
     */
    public select(selector: string, context: HTMLElement | Document = null)
    {
        return (context || document).querySelector(selector);
    }

    /**
     * Basic querySelectorAll Helper
     * @param selector 
     * @param context 
     * @returns 
     */
    public query(selector: string, context: HTMLElement | Document = null)
    {
        return (context || document).querySelectorAll(selector);
    }

    /**
     * Get something from the container.
     * @param key 
     * @param defValue 
     * @returns 
     */
    public get(key: string, defValue: any = null): any
    {
        return this.container.has(key)? this.container.get(key): defValue;
    }

    /**
     * Set something into the container.
     * @param key 
     * @param value 
     * @returns
     */
    public set(key: string, value: any): void
    {
        if (this.container.has(key)) {
            throw new Error(`The container key '${key}' has already been registered.`);
        }
        this.container.set(key, value);
    }

    /**
     * Register a new HTML directive.
     * @param name 
     * @param handler 
     * @param targetTypes 
     * @returns
     */
    public directive(name: string, directive: Directive): void
    {
        if (this.directives.has(name)) {
            throw new Error(`The directive '${name}' has already been registered.`);
        }
        this.directives.set(name, directive);
    }

    /**
     * Register a new Component.
     * @param alias 
     * @param cls 
     * @returns
     */
    public component(alias: string, cls: any)
    {
        alias = alias.charAt(0).toUpperCase() + alias.slice(1);

        if (this.components.has(alias)) {
            throw new Error(`The component '${alias}' has already been registered.`);
        }

        this[alias] = cls;
        this.components.set(alias, cls);
    }

    /**
     * Initialize a new plugin
     * @param handler 
     * @returns
     */
    public plugin(handler: (jax: JaXCore) => void)
    {
        handler.call(globalThis, this);
    }

    /**
     * Register a utility function
     * @param key 
     * @param callback 
     */
    public utility(key: string, callback: Function)
    {
        if (key.toLowerCase() in this) {
            throw new Error(`The utility key '${key}' cannot be registered.`);
        }
        this[key.toLowerCase()] = callback;
    }

    /**
     * Wait for
     * @param selector 
     * @param handler 
     */
    public waitFor(selector: string, handler: Function)
    {
        const observer = new MutationObserver(() => {
            let elements = document.querySelectorAll(`${selector}:not([data-jdone])`);
            if (elements.length > 0) {
                [].map.call(elements, el => {
                    el.dataset.jdone = true;
                    handler(el);
                });
            }

            if (document.readyState === 'complete') {
                observer.disconnect();
            }
        });
        observer.observe(document.body, {
            childList: true, 
            subtree: true
        });

        const interval = setInterval(() => {
            if (document.readyState === 'complete') {
                observer.disconnect();
                clearInterval(interval);
            }
        }, 1000);
    }

    /**
     * Start JaX environment
     */
    public start()
    {
        const onReady = new Map;
        for (const [name, directive] of this.directives.entries()) {
            if (directive.isLazy()) {
                onReady.set(name, directive.getHandler());
            } else {
                if (document.readyState !== 'loading') {
                    [].map.call(this.query(`[data-${name}]`), el => directive.getHandler()(el));
                } else {
                    this.waitFor(`[data-${name}]`, directive.getHandler());
                }
            }
        }

        const handler = () => {
            for (const [name, handler] of onReady) {
                [].map.call(this.query(`[data-${name}]`), el => handler(el));
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', handler.bind(this));
        } else {
            handler();
        }
    }

}

// Export Module
export default JaXCore;
export { JaXCore };
