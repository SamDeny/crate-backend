
import Directive from "../core/directive";
import JaXCore from "../core/jax";

class Templates
{

    /**
     * Instance Storage
     */
    private static instance: Templates = null;

    /**
     * 
     * @returns 
     */
    public static getInstance(): Templates
    {
        if (!this.instance) {
            new this;
        }
        return this.instance;
    }


    /**
     * JaX instance
     */
    private JaX: JaXCore|null;

    /**
     * Stored Templates
     */
     private templates: Map<string, HTMLTemplateElement>;

     /**
      * Create a new Persistent Storage.
      */
     public constructor(JaX?: JaXCore)
     {
        if (Templates.instance) {
            throw new Error('The Persistent Storage class cannot be initialized twice.');
        }
        Templates.instance = this;
        
        this.JaX = JaX;
        this.templates = new Map;
    }

    /**
     * Check if a Template exists
     * @param key 
     * @returns 
     */
    public has(key: string): boolean
    {
        return this.templates.has(key);
    }

    /**
     * Get an existing Template
     * @param key 
     * @returns 
     */
    public get(key: string): HTMLTemplateElement|null
    {
        return this.templates.get(key) || null;
    }

    /**
     * Set a new Template
     * @param key 
     * @param template 
     */
    public set(key: string, template: HTMLTemplateElement): void
    {
        this.templates.set(key, template);
    }

    /**
     * Return prepared Template
     * @param key 
     */
    public render(key: string)
    {
        if (!this.templates.has(key)) {
            throw new Error(`The passed template name '${key}' does not exist.`);
        }
        const template = this.templates.get(key).cloneNode(true) as HTMLTemplateElement;

        let content = [].filter.call(template.content.childNodes, el => el instanceof HTMLElement);
        if (content.length > 1) {
            content = ((inner: HTMLElement[]) => {
                let result = document.createElement('DIV');
                inner.map(el => result.appendChild(el));
                return result;
            })(content);
        } else if (content.length < 1) {
            throw new Error(`The passed template '${key}' does not contain any valid HTMLElement.`);
        }

        return content[0];
    }
 
}

/**
 * JaX Plugin initializer
 * @param JaX 
 */
function TemplatesPlugin(JaX: JaXCore) 
{
    JaX.set('templates', new Templates(JaX));
    JaX.directive('template', new Directive('template', (target: HTMLTemplateElement) => {
        JaX.get('templates').set(target.dataset.template, target);
    }, { lazy: false }));
}

// exports
export default Templates;
export { Templates, TemplatesPlugin };
