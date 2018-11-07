
import * as filters from './filters';

setInterval(() => {
    console.log(filters.formatYMD(new Date()))
}, 1000);
