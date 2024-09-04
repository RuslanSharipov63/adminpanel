export interface IlistOrder {
        id: number,
        date: string,
        companyname: string,
        comments: string,
        address: string,
        dataorder: { gaz: string, countgaz: number }[],
}

export interface IListPropane {
        id: number,
        date: string,
        countСylinders: number,
        operatorName: string
}