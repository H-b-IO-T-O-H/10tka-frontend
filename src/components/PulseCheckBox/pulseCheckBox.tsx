import "./pulseCheckBox.scss"
import React from "react";

type Props = {
    description: string
    isChecked: (arg0: boolean) => void;
}

const PulseCheckBox: React.FC<Props> = ({description, isChecked}) => {
    const [checked, changeChecked] = React.useState(false);

    const handleClick = React.useCallback(() => {
        changeChecked(!checked);
        isChecked(checked);
    }, [checked, isChecked])

    return (
        <div className="d-flex flex-nowrap flex-row align-items-bottom">
            <input type="checkbox" className="option-input checkbox" onChange={handleClick}/>
            <p className="pulse-description">{description}</p>
        </div>
    )
}

export default PulseCheckBox;