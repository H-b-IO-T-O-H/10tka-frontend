import React from "react";
import "./ButtonTimetable.scss"

type Props = {
    onChange: (id: string) => void,
    disabled?: boolean
    btn: {id: string, title?: string, color: string }
}

const ButtonTimetable: React.FC<Props> = ({onChange, disabled, btn, children}) => {
    return (
        <button className="btn-custom" type="button"
                disabled={disabled}
                onClick={() => {
                    onChange(btn.id)
                }}
                style={{background: btn ? btn.color : ""}}>
            {btn.title ? <span className="btn-custom__title">{btn.title}</span> : children}
        </button>
    )
}

export default ButtonTimetable;