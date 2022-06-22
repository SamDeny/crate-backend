
interface DirectiveOptions {
    lazy: boolean
}

class Directive
{
    
    /**
     * Directive Name
     */
    private name: string;

    /**
     * Directive Handler
     */
    private handler: (target: HTMLElement) => void;

    /**
     * Lazy Directive (initialized when document is ready)
     */
    private lazy: boolean;

    /**
     * Create a new Directive
     * @param name 
     * @param handler 
     * @param lazy 
     */
    constructor(name: string, handler: (target: HTMLElement) => void, options: Partial<DirectiveOptions> = {})
    {
        this.name = name;
        this.handler = handler;
        this.lazy = 'lazy' in options? options.lazy: true;
    }

    /**
     * Get Directive Name
     * @returns 
     */
    public getName(): string
    {
        return this.name;
    }

    /**
     * Get Directive Handler
     * @returns 
     */
    public getHandler(): (target: HTMLElement) => void
    {
        return this.handler;
    }

    /**
     * Check if Directive is set to Lazy.
     * @returns 
     */
    public isLazy(): boolean
    {
        return this.lazy;
    }

}

// Export Module
export default Directive;
export { Directive };
