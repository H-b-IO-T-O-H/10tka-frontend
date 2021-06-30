import React from "react";
import {buttonsContent} from "@config/config";

import "./ButtonsLogo.scss"

const classNames = require('classnames/bind');

const styles = {
    btn: 'btn-logo',
    btnXs: 'btn-logo__xs',
};

const btnLogo = classNames.bind(styles);

type Props = {
    idx: number;
    xs?: boolean;
}

const ButtonsLogo: React.FC<Props> = ({idx, xs}) => {
    let className = btnLogo({
        btn: true,
        btnXs: !!xs
    });

    return (
        <div className={className} style={{backgroundColor: buttonsContent[idx].color}}>
            {buttonsContent[idx].title}
        </div>
    )
}

export default React.memo(ButtonsLogo);