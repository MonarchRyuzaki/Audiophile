import {Items} from "./index"
import headphoneImg from "../assets/shared/desktop/image-category-thumbnail-headphones.png"
import speakerImg from "../assets/shared/desktop/image-category-thumbnail-speakers.png"
import earphoneImg from "../assets/shared/desktop/image-category-thumbnail-earphones.png"

const ItemsList = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between items-center sm:gap-4 mt-28 gap-20'>
        <Items title="Headphones" img={headphoneImg}/>
        <Items title="Speaker" img={speakerImg}/>
        <Items title="Earphone" img={earphoneImg}/>
    </div>
  )
}

export default ItemsList