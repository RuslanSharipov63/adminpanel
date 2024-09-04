import { FC } from "react"

type TitleHOneProps = {
  text: string
}
const TitleHOne: FC<TitleHOneProps> = ({text}) => {
    return (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl mb-4 text-blue-600">
        {text}
      </h1>
    )
  }

  export default TitleHOne
  