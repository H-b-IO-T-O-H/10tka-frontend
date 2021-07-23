import React from "react";
import {MDBCollapse} from "mdbreact";
import ButtonTimetable from "@components/ButtonTimetable";
import HiddenInput from "@components/HiddenInput";

import "./ButtonWithInput.scss"

type Props = {
    onInputChange?: (id: string, value: string) => void;
    onAreaChange?: (id: string, value: string) => void;
    onBtnChange?: () => void,
    inputs?: { maxInputLength: number, maxAreaLength: number }
    btn: { id: string, title?: string, color: string, disableInputs?: boolean }
}

const ButtonWithInput: React.FC<Props> = ({btn, onBtnChange, onInputChange, onAreaChange, inputs}) => {
    const [activeInput, setActive] = React.useState(true);
    const [areaValue, changeValueArea] = React.useState("");
    const [inputValue, changeValueInput] = React.useState("");
    const [collapseOpen, changeCollapse] = React.useState(false)

    const changeAreaValue = React.useCallback((value: string) => {
        if (inputs && inputs.maxAreaLength < value.length) {
            return;
        }
        changeValueArea(value);
        if (onAreaChange) {
            onAreaChange(btn.id, value);
        }
    }, [onAreaChange, btn.id, inputs])

    const setActiveElement = React.useCallback(() => {
        if (btn.disableInputs) {
            changeCollapse(!collapseOpen)
        } else {
            setActive(!activeInput);
            if (onBtnChange) {
                onBtnChange();
            }
        }
    }, [onBtnChange, activeInput, collapseOpen, btn.disableInputs])

    const changeInputValue = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (inputs && inputs.maxInputLength < value.length) {
            return;
        }
        changeValueInput(value);
        if (onInputChange) {
            onInputChange(btn.id, value);
        }
    }, [onInputChange, btn.id, inputs]);


    const buttonFields = React.useCallback(() => (
        <div className="d-flex flex-row align-content-center">
            <div className="m-1">
                <HiddenInput id={btn.id} value={areaValue}
                             onChange={changeAreaValue} disabled={activeInput} title={"Дисциплина"}/>
            </div>
            <div className="m-1">
                <input id={btn.id} value={inputValue} className="btn-mdb-input" type="text" placeholder="Ауд"
                       style={{display: activeInput ? "none" : ""}}
                       onChange={(e) => {
                           changeInputValue(e)
                       }}/>
            </div>
        </div>
    ), [btn.id, inputValue, changeInputValue, changeAreaValue, areaValue, activeInput]);

    const buttonCollapse = React.useCallback(() => (
        <MDBCollapse id={btn.id} isOpen={collapseOpen}>
            <span className="collapse-text m-1">
                Используйте для создания пропусков между парами.
            </span>
        </MDBCollapse>
    ), [btn.id, collapseOpen]);

    return (
        <div className="d-flex flex-row align-content-center">
            <ButtonTimetable disabled={false}
                             onChange={setActiveElement}
                             btn={btn}/>
            {!btn.disableInputs ? buttonFields() : buttonCollapse()}
        </div>
    )
}

export default ButtonWithInput;