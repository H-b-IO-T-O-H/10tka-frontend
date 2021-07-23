import React, {useCallback, useEffect, useState} from "react";
import "./InputNumber.scss"

type Props = {
    disabled?: boolean;
    placeholder: string;
    id: string;
    min: number;
    max: number;
    onChange?: (id: string, value: number) => void;
    defaultValue: number
}

const InputNumber: React.FC<Props> = ({id, min, max, onChange, placeholder, disabled, defaultValue}) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(defaultValue.toString());
    }, [defaultValue])

    const changeInputValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let intValue = parseInt(value);
        if (intValue < min || intValue > max) {
            return;
        }
        setValue(value);
        if (onChange) {
            onChange(id, intValue);
        }
    }, [onChange, id, min, max])

    return (
        <input disabled={disabled} type="number" placeholder={placeholder} className="input-number"
               value={value}
               onChange={changeInputValue}/>
    );

}

export default InputNumber;