
export const validationDateForInputDate = (paramDate: number): boolean => {
    let result: boolean = true;
    const currentDate = new Date();
    const milliseconds = currentDate.getTime(); /* текущая дата в миллисекундах */
    const dateDayLater = milliseconds - 86400000; /* дата на день позже */
    const dateTwoWeeksAhead = milliseconds + (86400000 * 14); /* дата на две недели вперед */
    if (paramDate <= dateDayLater || paramDate > dateTwoWeeksAhead) {
        result = false;
    }  
    return result;
}
