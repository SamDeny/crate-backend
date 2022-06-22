
/**
 * Merge default options with passed one or element dataset ones.
 * @param defOptions 
 * @param options 
 * @param element 
 * @param prefix 
 * @returns 
 */
function mergeOptions(defOptions: { [key: string]: any }, options: { [key: string]: any }, element: HTMLElement, prefix: string)
{
    const result = {};
    for (const [key, val] of Object.entries(defOptions)) {
        const datasetKey = prefix + key.charAt(0).toUpperCase() + key.slice(1);

        if (key in options) {
            result[key] = options[key];
        } else if (datasetKey in element.dataset) {
            let value: any = element.dataset[datasetKey];
            let temp = element.dataset[datasetKey];

            if (typeof val === 'boolean') {
                value = temp === '' || temp.toLowerCase() === 'true' || temp.toLowerCase() === 'on' || temp.toLowerCase() === 'yes';
            } else if (typeof val === 'number') {
                value = val === +val && val !== (val|0)? parseFloat(temp): parseInt(temp);
            }

            result[key] = value;
        } else {
            result[key] = val;
        }
    }
    return result;
}

/**
 * Ready Promise
 * @returns 
 */
function ready() {
    return new Promise((resolve, reject) => {
        const isReady = () => {
            if (document.readyState !== 'loading') {
                resolve(true);
                return;
            }
            setTimeout(isReady, 100);
        };
        isReady();
    });
} 

// Export Module
export { mergeOptions, ready };
