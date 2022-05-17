export const dateRegex = /^(\d{4})-(\d{2})-(\d{2})#(\d{2}):(\d{2}):(\d{2})$/;
export const debitOrCredit = (value:string) => {
    return parseFloat(value) > 0 ? 'value credit': 'value debit';
};
export const printPrice = (price:number) => {
    return price.toFixed(2).replace('-','').replace('.',',');
}