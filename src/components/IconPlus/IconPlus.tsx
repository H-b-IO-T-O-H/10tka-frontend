import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import "./IconPlus.scss"

const IconPlus = () => (
    <FontAwesomeIcon className="icon-remover" icon={faTimes} size={"sm"}
                     color={"#e85050"}/>
)

export default React.memo(IconPlus);