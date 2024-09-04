export const parserDate = (param: Date | undefined) => {

    if (typeof param != undefined) {
        const year = param?.getFullYear();
        const month = param?.getMonth();
        const day = param?.getDate();
        return day + '.' + month + '.' + year;
    }

}