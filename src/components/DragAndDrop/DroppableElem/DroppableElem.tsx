import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";

import ButtonsLogo from "@components/ButtonsLogo/ButtonsLogo";

type Props = {
    isEmpty: boolean;
    sourceIdx: number;
    header: string;
    footer: string;
}

const DroppableElem: React.FC<Props> = ({sourceIdx, header, footer, isEmpty}) => {
    return (
        <div>
            <div className="DAndD-item__header">
                <div className="DAndD-item__header__text">{header}</div>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <ButtonsLogo idx={sourceIdx}/>
                {isEmpty ? null :
                    <div className="DAndD-item__footer mt-1 mr-1">
                        <FontAwesomeIcon className="mr-1" icon={faMapMarkerAlt}/>
                        <span>{footer}</span>
                    </div>}
            </div>
        </div>
    )
}

export default React.memo(DroppableElem);