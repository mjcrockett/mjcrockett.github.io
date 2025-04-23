export function ConvertTimeStringToSeconds(interval: string): number {
    let decimal: number = 0;
    let decimalStr: string = interval.substring(interval.indexOf('.'));
    if (decimalStr?.length > 0) {
        decimal = parseInt(decimalStr.substring(1), 10) * .001;
    }

    const integerArr: string[] = interval.split(":");
    const seconds: number = (parseInt(integerArr[0], 10) * 60 * 60) + (parseInt(integerArr[1], 10) * 60) + parseInt(integerArr[2], 10) + decimal;
    return seconds
};