import { Link } from "react-router-dom"


const SeeProduct = ({link, bg, text}) => {
  return (
    <Link to="#" className={`uppercase bg-${bg} text-${text} text-[.8125rem] px-8 py-4 mt-[-10px] hover:opacity-[89%] border-2 border-black`}>
        see product
    </Link>
  )
}

export default SeeProduct