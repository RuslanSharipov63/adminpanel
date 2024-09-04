import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { FC } from 'react';

type AlertMessageSuccesProps = {
    text: string;
}

const AlertMessageSuccess: FC<AlertMessageSuccesProps> = ({ text }) => {


    return (
        <Alert>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>Отлично!</AlertTitle>
            <AlertDescription>
                {text}
            </AlertDescription>
        </Alert>
    );
}

export default AlertMessageSuccess;

