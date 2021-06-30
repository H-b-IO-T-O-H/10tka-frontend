import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock"
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt"

import "./Lesson.scss";

type Props = {
    title: string;
    time: string,
    auditorium: string,
    isEmpty: boolean
}

const Lesson: React.FC<Props> = ({title, time, auditorium, isEmpty, children}) => {
    return (
        <div className="Lesson">
            <div className="Lesson__header">
                <div className="Lesson__header__text">
                    {title}</div>
            </div>
            {children}
            <div className="Lesson__param d-flex flex-row ">
                {isEmpty ? null :
                    <div className="d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt}/>
                        <div className="ml-1">{auditorium}</div>
                    </div>}

                <div className="d-flex justify-content-end w-100">
                    <div className="d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={faClock}/>
                        <div className="ml-1">{time}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lesson;