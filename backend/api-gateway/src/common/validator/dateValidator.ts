export const checkMaturity = (maturity: Date): boolean => {
    if (maturity.valueOf() < new Date().valueOf()) {
        console.log("error");
        return false
    }


    return true;
}
