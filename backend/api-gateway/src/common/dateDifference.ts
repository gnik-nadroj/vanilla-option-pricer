export const dateDifference =
    (date1: Date, date2: Date): number => {

        if (date1.toLocaleDateString() === date2.toLocaleDateString())
            return 0.0;

        var diff = Math.abs(date1.getTime() - date2.getTime());

        return Math.ceil(diff / (1000 * 3600 * 24)) / 365;
    } 