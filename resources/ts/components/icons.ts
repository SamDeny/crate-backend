
import JaXCore from "../core/jax";

class Icons
{

    /**
     * Cached Items
     */
    private icons: Map<string, SVGElement>;
    
    /**
     * Create new Icons Repository
     */
    constructor()
    {
        this.icons = new Map;
    }

    /**
     * Get or Load an Icon
     * @param icon 
     * @param size 
     * @returns 
     */
    public async load(icon: string, size: number = 16)
    {
        if (!icon.endsWith('.svg')) {
            icon += '.svg';
        }
        if (this.icons.has(icon)) {
            return this.render(icon, size);
        }

        // Request Icon
        let base = window.location.origin;
        let request = await fetch(`${base}/@crate/backend/icons/${icon}`, {
            method: 'GET'
        });
        let response = await request.text();

        // Validate
        response = response.trim();
        if (!response.startsWith('<svg')) {
            throw new Error(`The passed icon name '${icon}' is invalid or an request error occured.`);
        }

        // Cache
        const element = ((icon) => {
            let temp = document.createElement('DIV');
            temp.innerHTML = icon;
            return temp.children[0];
        })(response) as SVGElement;
        this.icons.set(icon, element);

        // Return
        return this.render(icon, size);
    }

    /**
     * Render a Cached Item
     * @param icon 
     * @param size 
     * @returns 
     */
    public render(icon: string, size: number = 16)
    {
        if (!this.icons.has(icon)) {
            throw new Error(`The passed icon name '${icon}' is not available.`);
        }

        let result = this.icons.get(icon).cloneNode(true) as SVGElement;
        if (size !== 16) {
            result.setAttribute('width', `${size}px`);
            result.setAttribute('height', `${size}px`);
        }
        return result;
    }

}

/**
 * Register JaX Plugin
 * @param JaX 
 */
function IconsPlugin(JaX: JaXCore) {
    JaX.set('icons', new Icons);
}

// Export Module
export default Icons;
export { Icons, IconsPlugin };
