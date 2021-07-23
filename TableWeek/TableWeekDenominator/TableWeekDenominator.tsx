import React from "react";
import "./TableWeekDenominator.scss"
import ButtonChangeWeek from "@components/ButtonChangeWeek";



const TableWeekDenominator = () => {

    return (
        <div className="timetable">
            <ButtonChangeWeek />
            <table className="timetable__denominator" id="timetable__denominator">
                <tr>
                    <th>Числитель</th>
                    <td>Предмет</td>
                    <td>Преподаватель</td>
                    <td>Аудитория</td>
                </tr>
                <tr>
                    <th>1 пара<br/>8:30-10:05</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>2 пара<br/>10:15-11:50</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>3 пара<br/>12:00-13:35</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>4 пара<br/>13:50-15:25</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>5 пара<br/>15:40-17:15</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th>6 пара<br/>17:25-19:00</th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}

export default TableWeekDenominator;
