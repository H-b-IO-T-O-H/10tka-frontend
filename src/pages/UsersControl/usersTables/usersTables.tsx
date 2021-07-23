import React, {useEffect, useState} from 'react';
import {MDBDataTable} from 'mdbreact';

import StatusLabel from "@components/StatusLabel";
import {makeGet} from "@utils/network";

import "./userTables.scss"
import {USER_TYPE_PROFESSOR, USER_TYPE_STUDENT} from "../../Authorization/config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedoAlt} from "@fortawesome/free-solid-svg-icons/faRedoAlt";

type PropsData = {
    columns: {
        label?: string;
        field?: string;
        sort?: string;
        width?: number;
        searchable?: boolean;
        [rest: string]: any;
    }[];
    rows: {
        clickEvent: () => void;
        [rest: string]: any;
    }[];
}

type resp = {
    [rest: string]: any;
}


type Props = {
    url: string,
    id: number,
    title: string,
    userType: string,
    rowClickEvent: (user: resp) => void,
};

const UsersTable: React.FC<Props> = ({title, url, userType, rowClickEvent}) => {
    const [err, showLabel] = useState({content: "", success: false});
    const [needDownload, setDownload] = useState(false);
    const [timerRedo, setTimerRedo] = useState(-1);
    const [isReady, setReady] = useState(true);
    const [data, setData] = useState<PropsData>({columns: [], rows: []});

    const handleClick = React.useCallback(() => {
        setDownload(true);
    }, []);


    useEffect(() => {
        if (needDownload && timerRedo !== 0) {
            setReady(false);
            const timer = setTimeout(() => {
                makeGet(url).then((response) => {
                    if (response && response.data && response.data.users) {
                        setData(responseConverter(response.data.users, userType));
                    } else {
                        showLabel({content: "Ничего не найдено", success: false});
                    }
                }).catch((error) => {
                    showLabel({content: "Ошибка сервера. Попробуйте позже", success: false});
                }).finally(() => setReady(true))
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [needDownload, url, userType, timerRedo]);

    const responseConverter = (data: Array<resp>, userType: string) => {
        const tableDataTemplate = {
            columns: [
                {
                    label: 'Фамилия',
                    field: 'surname',
                    sort: 'asc',
                },
                {
                    label: "Имя",
                    field: 'name',
                    sort: 'asc',
                },
                {
                    label: 'Отчество',
                    field: 'patronymic',
                    sort: 'asc',
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc',
                },
                {
                    label: 'Телефон',
                    field: 'phone',
                    sort: 'asc',
                },
            ],
            rows: data.map((user) => ({
                name: user.name,
                surname: user.surname,
                patronymic: user.patronymic,
                email: user.email,
                phone: user.phone,
                group: user.student_group,
                disciplines: user.prof_disciplines_str.substring(1, user.prof_disciplines_str.length - 1).split(",").join(", "),
                about: user.about,
                clickEvent: () => rowClickEvent(user)
            }))
        };

        if (userType === USER_TYPE_STUDENT) {
            tableDataTemplate.columns.push({
                label: 'Учебная группа',
                field: 'group',
                sort: 'asc',
            });
        } else if (userType === USER_TYPE_PROFESSOR) {
            tableDataTemplate.columns.push({
                label: 'Дисциплины',
                field: 'disciplines',
                sort: 'asc',
            }, {
                label: 'Описание',
                field: 'about',
                sort: 'asc',
            });
        }
        return tableDataTemplate;
    }

    const handleRedo = React.useCallback(() => {
        console.log(timerRedo)
        if (timerRedo > 0) {
            return;
        }
        setTimerRedo(window.setTimeout(() => {
            setTimerRedo(0);
        }, 3000));

    }, [timerRedo]);

    return (
        <div className="users-table">
            <StatusLabel info={err}/>
            <div className="panel__header">
                <div>{title}</div>
                {needDownload ?
                    <button type="button" onClick={handleRedo} disabled={timerRedo !== 0 && timerRedo !== -1}
                            className="tag-btn users-table__redo ml-1">
                        <FontAwesomeIcon className="icon-reload"
                                         icon={faRedoAlt}
                                         size={"sm"}
                                         color={"#ffffff"}/>
                    </button> : null}
            </div>
            <div className="users-table__body p-1">
                {!isReady ?
                    <i className="fa fa-spinner fa-spin fa-2x fa-fw"/> : null}
                {isReady && needDownload ? <MDBDataTable
                    className="users-table"
                    data={data}
                    hover
                    striped
                    infoLabel={["Показано с", "по", "из", "записей"]}
                    paginationLabel={["Назад", "Вперед"]}
                    noRecordsFoundLabel="Ничего не найдено"
                    bordered
                    responsive
                    small>
                </MDBDataTable> : null}
                {!needDownload ?
                    <button className="btn btn-link btn-download" onClick={handleClick}>Загрузить данные</button> : null
                }
            </div>


        </div>
    );
}

export default UsersTable;
