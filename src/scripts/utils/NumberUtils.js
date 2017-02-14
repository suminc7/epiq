import numeral from 'numeral';

export default class NumberUtils {
    constructor(){

    }


    static getCount(count){

        return count >= 99999 ? '99,999' : numeral(count).format('0,0');
//        return numeral(count).format('0,0');
    }



}