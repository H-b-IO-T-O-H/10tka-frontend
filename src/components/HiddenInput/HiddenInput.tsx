import React from "react";
import "./HiddenInput.scss"

type Props = {
    value: string,
    onChange: (s: string, id: string) => void,
    id: string,
    disabled?: boolean,
    title?: string
    buttonId?: string,
}

const HiddenInput: React.FC<Props> = ({id, disabled, title, onChange, value}) => {
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e.target.value, id);
        }
    }, [onChange, id]);

    return (
        <div key={id} className="hidden d-flex flex-column text-black-50">
            <textarea value={value} onChange={handleChange} placeholder={title && !disabled ? title : ""}
                      className="hidden__text"
                      style={{display: disabled ? "none" : ""}}/>
        </div>
    )
}

export default HiddenInput;