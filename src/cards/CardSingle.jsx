import CardFront from "./CardFront"
import CardBack from "./CardBack"

const Card_single = ({card, handleChoice, isFlipped, disabled, skipAnim}) =>{
    const handleClick = () => {
      if (!disabled) {
        handleChoice(card)
      }
    }

    return (
        <div className={`card ${skipAnim ? "no-transition" : ""}`}>
          <div className={isFlipped ? "flipped" : ""}>
            <CardFront id={card.id} value={card.visual}/>
            <CardBack onClick={handleClick}/>
          </div>
        </div>
    )
}

export default Card_single;