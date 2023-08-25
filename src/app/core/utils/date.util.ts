function parseDateToInputFormat(date: Date): string{
    return `${date.getFullYear()}-${parseMonth(date.getMonth())}-${parseDate(date.getDate())}`
}

function parseDate(date: number): string {
    return date < 10 ? `0${date}` : date.toString();   
}

function parseMonth(month: number): string {
    month += 1;
    return parseDate(month);
}

export { parseDateToInputFormat }