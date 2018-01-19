import { PERCENT_VAT } from '../constants/finance.consts';

export { genUniqId, getPriceIncludingVat };

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

function getPriceIncludingVat(price: number): number {
    const exact = price * (1 + (PERCENT_VAT / 100));
    return Math.round(exact * 100) / 100;
}
