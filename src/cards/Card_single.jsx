import Card_front from "./Card_front"
import Card_back from "./Card_back"

const Card_single = ({card}) =>{
    return (
        <div>
            <Card_front id={card.id}/>
            <Card_back/>
        </div>
    )
}

export default Card_single