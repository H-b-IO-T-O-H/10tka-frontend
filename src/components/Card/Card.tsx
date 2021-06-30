import React from "react";
import "./Card.scss";

type Props = {
    id: number;
    title: string;
    currentDay: number;
    items: Array<React.ReactNode>;
}

const Card: React.FC<Props> = ({id, title, currentDay, items}) => {
    return (
        <div className="Home-Card">
            <h5 className="Home-Card__title"
                style={{backgroundColor: id < currentDay ? "#b4bdbd" : "#5bc3c3"}}>{title}</h5>
            <div className="list-group Home-Card__list">
                {
                    items?.length > 0 ?
                    items.map((elem, index) => (
                    <div key={index} className="list-group-item Home-Card-list__item">{elem}</div>)
                    ) : <div className="list_empty">Нет расписания</div>
                }
            </div>
        </div>
    )
}

export default Card;