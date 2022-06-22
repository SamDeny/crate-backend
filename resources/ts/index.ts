
import '../css/index.css';

import JaXCore from './core/jax';

import { IconsPlugin } from './components/icons';
import { OffcanvasPlugin } from './components/offcanvas';
import { PopoverPlugin } from './components/popover';
import { TemplatesPlugin } from './components/templates';

import { each, filter } from './utilities/stack';
import { live, on, trigger } from './utilities/event';

import crateThemeMenu from './theme/menu';
import crateColorScheme from './theme/scheme';
import crateDashboard from './theme/dashboard';

const JaX = new JaXCore
window['JaX'] = JaX;

JaX.utility('each', each);
JaX.utility('filter', filter);
JaX.utility('on', on);
JaX.utility('live', live);
JaX.utility('trigger', trigger);

JaX.plugin(IconsPlugin);
JaX.plugin(OffcanvasPlugin);
JaX.plugin(PopoverPlugin);
JaX.plugin(TemplatesPlugin);

crateThemeMenu(JaX);
crateColorScheme(JaX);
crateDashboard(JaX);

JaX.start();
export default JaX;
