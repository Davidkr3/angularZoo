export class Utils {
    public static getTwoDigits(num: number): string {
        return num < 10 ? "0" + num.toString() : num.toString();
    }
}

export class DateTools {
    public static getLittleEndianDateTimeString(date: Date, dateSeparator: string, dateTimeSeparator: string, timeSeparator: string): string { //(spain)
        //getDay -> day of week; getMonth starts at 0
        //optional time
        if (dateTimeSeparator) {
            return Utils.getTwoDigits(date.getDate()) + dateSeparator + Utils.getTwoDigits(date.getMonth() + 1)
                + dateSeparator + date.getFullYear().toString() + dateTimeSeparator + Utils.getTwoDigits(date.getHours()) + timeSeparator
                + Utils.getTwoDigits(date.getMinutes()) + timeSeparator + Utils.getTwoDigits(date.getSeconds());
        }
        else {
            return Utils.getTwoDigits(date.getDate()) + dateSeparator + Utils.getTwoDigits(date.getMonth() + 1)
                + dateSeparator + date.getFullYear().toString();
        }

    }

    public static getBigEndianDateTimeString(date: Date, dateSeparator: string,
        dateTimeSeparator: string, timeSeparator: string): string {
        //only date
        if (dateTimeSeparator == null) {
            return date.getFullYear().toString() + dateSeparator + Utils.getTwoDigits(date.getMonth() + 1) + dateSeparator
                + Utils.getTwoDigits(date.getDate());
        }
        return date.getFullYear().toString() + dateSeparator + Utils.getTwoDigits(date.getMonth() + 1) + dateSeparator
            + Utils.getTwoDigits(date.getDate()) + dateTimeSeparator + Utils.getTwoDigits(date.getHours()) + ':' + Utils.getTwoDigits(date.getMinutes())
            + timeSeparator + Utils.getTwoDigits(date.getSeconds());
    }

    //for calendar events
    public static getBigEndianDateTimeUTCString(date: Date, dateSeparator: string,
        dateTimeSeparator: string, timeSeparator: string): string {
        return date.getFullYear().toString() + dateSeparator + Utils.getTwoDigits(date.getMonth() + 1) + dateSeparator
            + Utils.getTwoDigits(date.getDate()) + dateTimeSeparator + Utils.getTwoDigits(date.getUTCHours()) + ':' + Utils.getTwoDigits(date.getMinutes())
            + timeSeparator + Utils.getTwoDigits(date.getSeconds());
    }

    public static getAmericanDateTimeString(date: Date, dateSeparator: string, dateTimeSeparator: string,
        timeSeparator: string): string {
        if (dateTimeSeparator) {
            return Utils.getTwoDigits(date.getMonth() + 1) + dateSeparator + Utils.getTwoDigits(date.getDate())
                + dateSeparator + date.getFullYear().toString() + dateTimeSeparator + Utils.getTwoDigits(date.getHours()) + timeSeparator
                + Utils.getTwoDigits(date.getMinutes()) + timeSeparator + Utils.getTwoDigits(date.getSeconds());
        }
        else {
            return Utils.getTwoDigits(date.getMonth() + 1) + dateSeparator + Utils.getTwoDigits(date.getDate())
                + dateSeparator + date.getFullYear().toString();
        }
    }

    public static getDateTimeFromBigEndianString(date: string, dateSeparator: string,
        dateTimeSeparator: string, timeSeparator: string): Date {
        let auxDate: string[] = date.split(dateSeparator);
        let auxDateTime: string[] = auxDate[2].split(dateTimeSeparator);
        //time
        let auxTime: string[];
        //month starts at 0         
        //optional time
        if (auxDateTime[1]) {
            //optional seconds
            auxTime = auxDateTime[1].split(timeSeparator);
            return new Date(Number.parseInt(auxDate[0]), Number.parseInt(auxDate[1]) - 1, Number.parseInt(auxDateTime[0]),
                Number.parseInt(auxTime[0]), Number.parseInt(auxTime[1]), Number.parseInt(auxTime[2]) ? Number.parseInt(auxTime[2]) : 0);
        }
        else {
            return new Date(Number.parseInt(auxDate[0]), Number.parseInt(auxDate[1]) - 1, Number.parseInt(auxDateTime[0]));
        }
    }

    public static getTimeFromString(time: string): Date {
        let auxTime = time.split(':');
        return new Date(null, null, null, Number.parseInt(auxTime[0]), Number.parseInt(auxTime[1]), null, null);
    }

    public static getInternationalizedDateTimeString(date: Date, locale: string, separator: string,
        dateTimeSeparator: string, timeSeparator: string): string {
        switch (locale) {
            case "en":
                return DateTools.getAmericanDateTimeString(date, separator, dateTimeSeparator, timeSeparator);
            default:
                return DateTools.getLittleEndianDateTimeString(date, separator, dateTimeSeparator, timeSeparator); //es, ca...
        }
    }
    public static getTimePart(date: Date): Date {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }
    public static getTimeFromDate(_date: Date, timeSeparator: string): string {
        return Utils.getTwoDigits(_date.getHours()) + timeSeparator 
            + Utils.getTwoDigits(_date.getMinutes()) + timeSeparator + Utils.getTwoDigits(_date.getSeconds());
    }

}