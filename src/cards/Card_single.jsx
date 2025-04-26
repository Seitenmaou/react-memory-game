import Card_front from "./Card_front"
import Card_back from "./Card_back"

const Card_single = ({card, handleChoice, isFlipped, disabled, skipAnim}) =>{
    const handleClick = () => {
      if (!disabled) {
        handleChoice(card)
      }
    }

    return (
        <div className={`card ${skipAnim ? "no-transition" : ""}`}>
          <div className={isFlipped ? "flipped" : ""}>
            <Card_front id={card.id} value={card.visual}/>
            <Card_back onClick={handleClick}/>
          </div>
        </div>
    )
}

export default Card_single;