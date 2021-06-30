import React from "react";
import {v4 as uuid} from "uuid";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {faCogs} from "@fortawesome/free-solid-svg-icons/faCogs";

import ButtonTimetable from "@components/ButtonTimetable";
import InputNumber from "@components/InputNumber";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Week} from "@config/config";
import "./AdminPanel.scss"


type Props = {
    dayIdx: number;
    changeDay: () => void;
    getPanelData: (group: number, semester: number, week: number, weekType: string) => void;
}

const AdminPanel: React.FC<Props> = ({dayIdx, changeDay, getPanelData}) => {
    const [panelLabel, setLabel] = React.useState("")
    const [groupInfo, setInfo] = React.useState({week: 0, group: 0, semester: 0, weekType: "Чс"})

    const changeLabelInfo = React.useCallback((id, value) => {
        const newInfo = groupInfo;
        switch (id) {
            case "input-for-week":
                newInfo.week = value;
                break;
            case "input-for-group":
                newInfo.group = value;
                break;
            case "input-for-sem":
                newInfo.semester = value;
                break;
            case "input-for-week-type":
                newInfo.weekType = value;
                break;
        }
        /*if (newInfo.week !== 0 && !isNaN(newInfo.week) && newInfo.weekType !== "" && newInfo.semester !== 0
            && !isNaN(newInfo.semester) && newInfo.group !== 0 && !isNaN(newInfo.group)) {
            const newLabel = `${newInfo.week}-я Неделя, ${newInfo.weekType}, Группа ИУ10-${newInfo.semester}${newInfo.group}`
            setLabel(newLabel)
            getPanelData(newInfo.group, newInfo.semester, newInfo.week, newInfo.weekType)*/
        if (newInfo.weekType !== "" && newInfo.semester !== 0
            && !isNaN(newInfo.semester) && newInfo.group !== 0 && !isNaN(newInfo.group)) {
            const newLabel = `Группа ИУ10-${newInfo.semester}${newInfo.group}, ${newInfo.weekType}`
            setLabel(newLabel)
            getPanelData(newInfo.group, newInfo.semester, newInfo.week, newInfo.weekType)
        } else {
            setLabel("");
        }
        setInfo(newInfo);
    }, [groupInfo, getPanelData])

    return (
        <div>
            <div className="panel d-flex flex-column">
                <div className="panel__header">
                    Настройка параметров учебной группы
                    <FontAwesomeIcon icon={faCogs} size={"lg"}
                                     color={"white"}/>
                </div>
                <div className="panel__body">
                    {dayIdx !== -1 ?
                        <ButtonTimetable
                            onChange={changeDay}
                            disabled={false}
                            btn={{id: uuid(), color: "#4fbfb4"}}
                        >
                            <div className="d-flex flex-row flex-nowrap justify-content-around">
                                <FontAwesomeIcon icon={faPlus} size={"lg"}
                                                 color={"white"}/>
                                <span
                                    className="DAndD-container__header__text_white">{Week[dayIdx].day}</span>
                            </div>
                        </ButtonTimetable>
                        : null}
                    <div className="ml-1">
                        <InputNumber disabled placeholder="Неделя" id="input-for-week" min={1} max={17}
                                     onChange={changeLabelInfo} defaultValue={NaN}/>
                    </div>
                    <InputNumber placeholder="Группа" id="input-for-group" min={1} max={5} onChange={changeLabelInfo}
                                 defaultValue={NaN}/>
                    <InputNumber placeholder="Семестр" id="input-for-sem" min={1} max={12} onChange={changeLabelInfo}
                                 defaultValue={NaN}/>
                    <div className="mr-1">
                        <select id="input-for-week-type" defaultValue={"1"} className="panel__select" onChange={(e) => {
                            changeLabelInfo("input-for-week-type", e.target.value)
                        }}>
                            <option value="Чс">Чс</option>
                            <option value="Зн">Зн</option>
                        </select>
                    </div>
                </div>
                <div className="panel__footer">
                    {panelLabel}
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;