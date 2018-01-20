import { PERCENT_VAT } from '../constants/finance.consts';

export { genUniqId };

function genUniqId(currentIds: string[]): string {
    let id;
    do {
        id = guid();
    } while (currentIds.includes(id));
    return id;
}

function guid(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
