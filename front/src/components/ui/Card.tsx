import Image from "next/image"

interface Card {
    title: string
    content: string
}

const Card : React.FC<Card> = () => {
    return (
        <section className="card">
            <Image src={""} alt={""} fill={true} className="card__img" />
            <div className="card__content">
                <h3 className="card__title" />
                <div className="card__text" />
            </div>
        </section>
    )
}

export default Card;