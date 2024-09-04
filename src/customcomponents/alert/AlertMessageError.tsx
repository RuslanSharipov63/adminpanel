import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { FC } from 'react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

type AlertMessageErrorProps = {
    text: string;
}

const AlertMessageError: FC<AlertMessageErrorProps> = ({
    text
}) => {
    return (
        <div className="w-[200px] h-24">
        <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Отмена</AlertTitle>
            <AlertDescription>
                {text}
            </AlertDescription>
        </Alert>
        </div>
    );
}

export default AlertMessageError;