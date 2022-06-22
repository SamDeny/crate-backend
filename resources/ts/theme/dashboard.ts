
import JaXCore from '../core/jax';
import dayjs from '../vendor/dayjs.js';

export default async function handleDashboard(JaX: JaXCore)
{
    const datetimes = JaX.query('[data-crate="date"],[data-crate="time"],[data-crate="datetime"]');
    JaX.each(datetimes, (element) => {
        const format = element.dataset.format || null;
        if (!format) {
            return;
        }

        setInterval(((element, format) => {
            element.innerText = dayjs().format(format);
        }).bind(null, element, format), 1000);
        element.innerText = dayjs().format(format);
    });
}
