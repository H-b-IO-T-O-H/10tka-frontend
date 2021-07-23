import React from "react";
import "./TableMainInfo.scss"

const TableMainInfo = () => {
    return (
        <div className="main__info">
            <p className="main__info__text">Основная информация</p>
            <table className="table__main__info">
                <tr className="third__line">
                    <th>Группа</th>
                    <td>n</td>
                </tr>
                <tr className="fourth__line">
                    <th>Общежитие</th>
                    <td>номер n</td>
                </tr>
                <tr className="fifth__line">
                    <th>Стипендия</th>
                    <td>Да/Нет</td>
                </tr>
                <tr className="sixth__line">
                    <th>Военка</th>
                    <td>???</td>
                </tr>
            </table>
        </div>
    );
}

export default TableMainInfo;
