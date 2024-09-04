import {FC} from 'react';

type TypographyProps = {
    text: string
}

const Typography: FC<TypographyProps> = ({text}) => {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            {text}
        </p>
    )
}

export default Typography;