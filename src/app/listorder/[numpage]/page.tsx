import ListOrder from "@/customcomponents/listorder/ListOrder";
import { getListOrder } from "@/api/getListOrder";


const ListOrderPage = async ({ params }: { params: { numpage: string } }) => {

    const listOrderArr = await getListOrder(params.numpage);   

     listOrderArr.map((el: any) => {
        let b = JSON.parse(el.dataorder);
        el.dataorder = b;
    }); 
    return (
        <>
            <ListOrder listOrderArr={listOrderArr} />
        </>);
}

export default ListOrderPage;