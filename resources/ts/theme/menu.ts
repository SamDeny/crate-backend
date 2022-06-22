
import Icons from "../components/icons";
import { ready } from "../core/helper";
import JaXCore from "../core/jax";

export default async function handleMenu(JaX: JaXCore)
{
    const closeIcon = await (JaX.get('icons') as Icons).load('x-lg');

    await ready();
    
    // Get Menu Elements
    const menuButton = JaX.select('[data-crate="menu"]') as HTMLButtonElement;
    const menuIcon = menuButton.children[0];
    const menu = JaX.select('#crateMenu') as HTMLElement;

    // Menu actions
    const openMenu = () => {
        menuButton.classList.add('disabled');
        menuButton.dataset.menuVisible = '1';

        menu.classList.add('in-transition', 'show');
        setTimeout(() => {
            menu.classList.remove('in-transition');

            menuButton.classList.remove('disabled', 'btn-light');
            menuButton.classList.add('btn-dark');
            menuButton.innerHTML = '';
            menuButton.appendChild(closeIcon);
        }, 300);
    };

    const closeMenu = () => {
        menuButton.classList.add('disabled');
        delete menuButton.dataset.menuVisible;

        menu.classList.add('in-transition');
        menu.classList.remove('show');
        setTimeout(() => {
            menu.classList.remove('in-transition');

            menuButton.classList.remove('disabled', 'btn-dark');
            menuButton.classList.add('btn-light');
            menuButton.innerHTML = '';
            menuButton.appendChild(menuIcon);
        }, 300);
    };

    // Toggle Menu
    menuButton.addEventListener('click', (event) => {
        if ('menuVisible' in menuButton.dataset) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close Menu on Switch
    document.querySelector('#pinCrateMenu').addEventListener('click', () => {
        if ('menuVisible' in menuButton.dataset) {
            closeMenu();
        }
    });
};
