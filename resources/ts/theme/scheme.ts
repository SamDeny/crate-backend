
import JaXCore from "../core/jax";

export default async function handleColorScheme(JaX: JaXCore)
{
    JaX.live(document.body, '[data-crate="color-scheme"]', 'click', (event) => {
        event.preventDefault();
        const target = event.target.closest('[data-crate]');
        const value = target.dataset.value;
        const current = localStorage.getItem('color-scheme') || 'light';
        const indicator = JaX.select('[data-popover="crate_color_scheme"] > div');
        const popover = JaX.select('#popover__crate_color_scheme');

        // Set new Value
        localStorage.setItem('color-scheme', value);

        // Append transition styles
        let styles = document.createElement('style');
        styles.innerHTML = '*, *::before, *::after { transition: all 300ms ease-in-out; }';
        document.head.appendChild(styles);

        // Remove Previous Color Scheme
        if (current === 'light' || current === 'dark') {
            document.documentElement.classList.remove(current);
        } else if (current === 'focus') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.remove('focus');
        }
        indicator.classList.remove(`scheme-${current}`);

        // Add New Color Scheme
        if (value === 'light' || value === 'dark') {
            document.documentElement.classList.add(value);
        } else if (value === 'focus') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.add('focus');
        }
        indicator.classList.add(`scheme-${value}`);

        // Select on Popover
        if (popover) {
            popover.querySelector('.current').classList.remove('current');
            popover.querySelector(`[data-value="${value}"]`).classList.add('current');
        }

        // Remove transition styles
        setTimeout(() => styles.remove(), 320);
    });
}
