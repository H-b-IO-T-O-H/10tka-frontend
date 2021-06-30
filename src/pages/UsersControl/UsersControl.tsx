import React, {useCallback, useState} from "react";
import "./UsersControl.scss"
import InputNumber from "@components/InputNumber";
import Tags from "@components/Tags";
import StatusLabel from "@components/StatusLabel";
import {
    btnPasswd, checkRussian, ERROR_ABOUT_FIELD,
    ERROR_NAME_FIELD,
    ERROR_PATRONYMIC_FIELD, ERROR_PHONE_FIELD,
    ERROR_SURNAME_FIELD, isValid, MAX_ABOUT,
    MAX_SNP,
    MIN_SNP, notEmpty,
} from "./config";

import {makeGet, makePost, makePut} from "@utils/network";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedoAlt} from "@fortawesome/free-solid-svg-icons/faRedoAlt";
import UsersTable from "./usersTables";
import {Urls} from "@config/urls";
import AuthError from "@components/AuthError/AuthError";
import {ERROR_EMAIL_FIELD, USER_TYPE_METHODIST, USER_TYPE_PROFESSOR, USER_TYPE_STUDENT} from "../Authorization/config";
import {v4 as uuid} from "uuid";

type UserProps = {
    id: string,
    role: string,
    email: string,
    phone: string,
    name: string,
    surname: string,
    patronymic: string,
    password: string,
    about: string,
    disciplines: Array<{ id: string, content: string }>,
    group: number,
    sem: number
}

const InitialUser = {
    id: "",
    role: USER_TYPE_STUDENT,
    email: "",
    phone: "",
    name: "",
    surname: "",
    patronymic: "",
    password: "",
    about: "",
    disciplines: [],
    group: NaN,
    sem: NaN
};

const UsersControl = () => {
    const [label, showLabel] = useState({content: "", success: false});
    const [inputPasswd, setInputPasswd] = useState<HTMLInputElement | null>(null);
    const [userInfo, setUserInfo] = useState<UserProps>(InitialUser);
    const [timer, setTimer] = useState(0);
    const [disciplines, setDisciplines] = useState<Array<{ discipline_id: number, discipline_content: string, prof_cnt: number }>>([]);
    const [isDataForEdit, changeEditFlag] = useState({wasEdit: false, oldPhone: "", oldEmail: ""});
    const [btnText, setBtnText] = useState("Сохранить")

    const [userValid, setUserValid] = useState({
        role: {noFocus: false, msg: ""},
        email: {noFocus: false, msg: ""},
        phone: {noFocus: false, msg: ""},
        name: {noFocus: false, msg: ""},
        surname: {noFocus: false, msg: ""},
        patronymic: {noFocus: false, msg: ""},
        password: {noFocus: false, msg: ""},
        about: {noFocus: false, msg: ""},
    });

    React.useEffect(() => {
        const inputElem = document.getElementById("input-password") as HTMLInputElement;

        setInputPasswd(inputElem);
        if (userInfo.role === USER_TYPE_PROFESSOR) {
            makeGet(Urls.discipline.getAll()).then((resp) => {
                if (resp.status === 200) {
                    if (resp.data && resp.data.disciplines && resp.data.disciplines.length > 0) {
                        setDisciplines(resp.data.disciplines)
                    }
                }
            }).catch((err) => {
                showLabel({content: "Не удалось загрузить список дисциплин.", success: false})
            })
        }
    }, [userInfo.role])

    const handleSubmit = useCallback(() => {
        let fieldsCanBeEmpty = ["about", "sem", "group"];

        if (!isValid(userValid)) {
            showLabel({content: "Заполните поля корректно.", success: false});
            return;
        }

        if (userInfo.role === USER_TYPE_METHODIST) {
            fieldsCanBeEmpty.push("disciplines");
        } else if (userInfo.role === USER_TYPE_STUDENT) {
            fieldsCanBeEmpty = ["about", "disciplines"];
        }

        if (isDataForEdit.wasEdit) {
            fieldsCanBeEmpty.push("password");
        } else {
            fieldsCanBeEmpty.push("id");
        }

        console.log(userInfo)
        if (!notEmpty(userInfo, fieldsCanBeEmpty)) {
            showLabel({content: "Заполните пустые поля.", success: false});
            return;
        }

        const newUser = {
            id: userInfo.id,
            role: userInfo.role.trim(),
            password: userInfo.password,
            name: userInfo.name.trim(),
            surname: userInfo.surname.trim(),
            patronymic: userInfo.patronymic.trim(),
            email: userInfo.email.trim(),
            phone: userInfo.phone.trim(),
            student_group: userInfo.role === USER_TYPE_STUDENT ? `${userInfo.sem}${userInfo.group}` : "",
            prof_disciplines: userInfo.disciplines.map((dis) => (dis.content)),
        }

        console.log(userInfo.id)

        if (isDataForEdit.wasEdit) {
            makePut(Urls.user.postCreate(), newUser).then((resp) => {
                if (resp.status === 201) {
                    showLabel({content: "Успех!", success: true});
                    setUserInfo(InitialUser);
                    changeEditFlag({wasEdit: false, oldEmail: "", oldPhone: ""});
                    setBtnText("Сохранить")
                }
            }).catch((err) => {
                if (err && err.response && err.response.status === 409) {
                    showLabel({
                        content: "Пользователь с данным email или телефоном уже зарегистрирован.",
                        success: false
                    });
                } else {
                    showLabel({content: "Ошибка сервера. Попробуйте позже.", success: false});
                }
            });
        } else {
            makePost(Urls.user.postCreate(), newUser).then((resp) => {
                if (resp.status === 201) {
                    showLabel({content: "Успех!", success: true});
                    setUserInfo(InitialUser);
                    changeEditFlag({wasEdit: false, oldEmail: "", oldPhone: ""});
                    setBtnText("Сохранить")
                }
            }).catch((err) => {
                if (err && err.response && err.response.status === 409) {
                    showLabel({
                        content: "Пользователь с данным email или телефоном уже зарегистрирован.",
                        success: false
                    });
                } else {
                    showLabel({content: "Ошибка сервера. Попробуйте позже.", success: false});
                }
            });
        }


    }, [userValid, userInfo, isDataForEdit]);


    const handlePassword = useCallback(() => {
        const oldUser = {...userInfo};

        if (inputPasswd) {
            if (timer !== 0) {
                clearTimeout(timer);
            }
            setTimer(window.setTimeout(() => {
                inputPasswd.type = "password";
                clearTimeout(timer);
            }, 2000));
            inputPasswd.type = "text";
        }
        oldUser.password = btnPasswd.genPasswd(15);
        setUserInfo(oldUser);
    }, [inputPasswd, timer, userInfo]);

    const handleBlur = useCallback(() => {
        const oldUserValid = {...userValid};

        Object.keys(oldUserValid).forEach((key) => {
            oldUserValid[key].noFocus = true;
            if (userInfo[key] === "") {
                oldUserValid[key].msg = "";
            }
        });

        setUserValid(oldUserValid);
    }, [userInfo, userValid]);


    const handleUserInfo = useCallback((e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const oldUser = {...userInfo};
        const oldUserValid = {...userValid};
        const value = e.target.value;
        const length = value.length;

        if (isDataForEdit.wasEdit) {
            setBtnText("Редактировать");
        } else {
            setBtnText("Сохранить");
        }

        switch (e.target.id) {
            case "input-name":
                oldUserValid.name.msg = length < MIN_SNP || length >= MAX_SNP || !checkRussian(value) ? ERROR_NAME_FIELD : ""
                oldUserValid.name.noFocus = false;
                oldUser.name = value;
                break;
            case "input-surname":
                oldUserValid.surname.msg = length < MIN_SNP || length >= MAX_SNP || !checkRussian(value) ? ERROR_SURNAME_FIELD : ""
                oldUserValid.surname.noFocus = false;
                oldUser.surname = value;
                break;
            case "input-patronymic":
                oldUserValid.patronymic.msg = length < MIN_SNP || length >= MAX_SNP || !checkRussian(value) ? ERROR_PATRONYMIC_FIELD : ""
                oldUserValid.patronymic.noFocus = false;
                oldUser.patronymic = value;
                break;
            case "input-password":
                oldUserValid.patronymic.msg = length < MIN_SNP || length >= MAX_SNP ? ERROR_PATRONYMIC_FIELD : ""
                oldUserValid.patronymic.noFocus = false;
                oldUser.password = value;
                break;
            case "select-usertype":
                oldUser.role = value;
                break;
            case "input-email":
                const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                oldUserValid.email.msg = !reEmail.test(String(value).toLowerCase()) ? ERROR_EMAIL_FIELD : "";
                oldUserValid.email.noFocus = false;
                oldUser.email = value;
                if (value === isDataForEdit.oldEmail) {
                    setBtnText("Редактировать");
                } else {
                    changeEditFlag({wasEdit: false, oldEmail: oldUser.email, oldPhone: isDataForEdit.oldPhone});
                    setBtnText("Сохранить");
                }
                break;
            case "input-phone":
                const rePhone = /^[\d]{1} \([\d]{2,3}\) [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/;
                oldUserValid.phone.msg = !rePhone.test(String(value).toLowerCase()) ? ERROR_PHONE_FIELD : "";
                oldUserValid.phone.noFocus = false;

                let telephone = "";
                let numbersOld = oldUser.phone.replace(/\D/g, "").split('');
                const numbersNew = value.replace(/\D/g, "").split('');

                if (numbersOld.length === numbersNew.length && telephone.length < value.length) {
                    telephone = value;
                } else {
                    for (let i = 0; i < 11 && i < numbersNew.length; ++i) {
                        if (i === 4) {
                            telephone += ") ";
                        } else if (i === 7 || i === 9) {
                            telephone += "-";
                        }
                        telephone += numbersNew[i];
                        if (i === 0) {
                            telephone += " (";
                        }
                    }
                }

                oldUser.phone = telephone.trim();
                if (oldUser.phone === isDataForEdit.oldPhone) {
                    setBtnText("Редактировать");
                } else {
                    changeEditFlag({wasEdit: false, oldEmail: isDataForEdit.oldEmail, oldPhone: oldUser.phone});
                    setBtnText("Сохранить");
                }
                break;
            case "input-about":
                oldUserValid.about.msg = length > MAX_ABOUT ? ERROR_ABOUT_FIELD + ` (${length})` : "";
                oldUserValid.about.noFocus = false;
                oldUser.about = value;
                break;
        }
        setUserInfo(oldUser);
        setUserValid(oldUserValid);
    }, [isDataForEdit, userInfo, userValid]);

    const handleInputId = useCallback((id: string, value: number) => {
        const oldUser = {...userInfo};

        if (id === "input_nmb_sem") {
            oldUser.sem = value;
        } else {
            oldUser.group = value;
        }
        setUserInfo(oldUser);
    }, [userInfo]);

    const handleUserEdit = React.useCallback((user: any) => {
        let sem = NaN;
        let group = NaN;
        //console.log(user.student_group)
        if (user.student_group.length === 3) {
            sem = user.student_group.slice(0, 2);
            group = user.student_group[2];
        } else if (user.student_group.length === 2) {
            sem = user.student_group[0];
            group = user.student_group[1];
        }

        const prepareUser = {
            id: user.id,
            role: user.role,
            email: user.email,
            phone: user.phone,
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
            password: "",
            about: user.about,
            disciplines: user.prof_disciplines_str.substring(1, user.prof_disciplines_str.length - 1).split(",").map((d: string) => ({
                id: `tag-${uuid()}`,
                content: d
            })),
            group: group,
            sem: sem
        }

        changeEditFlag({wasEdit: true, oldEmail: user.email, oldPhone: user.phone});
        setBtnText("Редактировать");
        setUserInfo(prepareUser);
    }, []);

    const defineRole = () => {
        if (userInfo.role === USER_TYPE_STUDENT) {
            return (
                <div>
                    <div className="d-flex justify-content-center">
                        <div className="mr-1">
                            <InputNumber placeholder={"Сем"} onChange={handleInputId} id={"input_nmb_sem"} min={1}
                                         max={12} defaultValue={userInfo.sem}/>
                        </div>
                        <div className="ml-1">
                            <InputNumber placeholder={"Группа"} onChange={handleInputId} id={"input_nmb_group"} min={1}
                                         max={5} defaultValue={userInfo.group}/>
                        </div>
                    </div>
                    {!isNaN(userInfo.sem) && !isNaN(userInfo.group) ?
                        <div className="IU">{`Группа: ИУ10-${userInfo.sem}${userInfo.group}`}</div> : null}
                </div>
            )
        } else if (userInfo.role === USER_TYPE_PROFESSOR) {
            return (
                <div>
                    <div className="users-control_label">Дисциплина</div>
                    <Tags tags={userInfo.disciplines}
                          selectList={disciplines.map(d => (d.discipline_content))}
                          changeTags={(newTags) => {
                              const oldInfo = {...userInfo};
                              oldInfo.disciplines = newTags;
                              setUserInfo(oldInfo);
                          }
                          }/>
                    {(userValid.about.noFocus && userValid.about.msg) &&
                    <AuthError msg={userValid.about.msg}/>}
                    <div className="prof-info mt-2">
                        <div className="users-control_label">Общая информация</div>
                        <input id="input-about" className="users-control_input"
                               onChange={handleUserInfo} onBlur={handleBlur}/>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <StatusLabel info={label}/>
            <div className="users">
                <div className="users-control">
                    <div className="panel__header">
                        Добавление пользователей
                    </div>
                    <div className="users-control_block">
                        <div className="mt-1">
                            {(userValid.surname.noFocus && userValid.surname.msg) &&
                            <AuthError msg={userValid.surname.msg}/>}
                            <div className="users-control_label">Фамилия</div>
                            <input id="input-surname" className="users-control_input" value={userInfo.surname}
                                   onChange={handleUserInfo} onBlur={handleBlur}/>
                        </div>
                        <div className="mt-1">
                            {(userValid.name.noFocus && userValid.name.msg) &&
                            <AuthError msg={userValid.name.msg}/>}
                            <div className="users-control_label">Имя</div>
                            <input id="input-name" className="users-control_input" value={userInfo.name}
                                   onChange={handleUserInfo} onBlur={handleBlur}/>
                        </div>
                        <div className="mt-1">
                            {(userValid.patronymic.noFocus && userValid.patronymic.msg) &&
                            <AuthError msg={userValid.patronymic.msg}/>}
                            <div className="users-control_label">Отчество</div>
                            <input id="input-patronymic" className="users-control_input" value={userInfo.patronymic}
                                   onChange={handleUserInfo} onBlur={handleBlur}/>
                        </div>
                        <div className="mt-1">
                            {(userValid.phone.noFocus && userValid.phone.msg) &&
                            <AuthError msg={userValid.phone.msg}/>}
                            <div className="users-control_label">Телефон</div>
                            <small className="users-control_advice">Формат: 8 (888) 888-88-88</small>
                            <input id="input-phone" className="users-control_input" value={userInfo.phone}
                                   onChange={handleUserInfo} onBlur={handleBlur}/>
                        </div>
                        <div className="mt-1">
                            {(userValid.email.noFocus && userValid.email.msg) &&
                            <AuthError msg={userValid.email.msg}/>}
                            <div className="users-control_label">Email</div>
                            <input id="input-email" className="users-control_input" value={userInfo.email}
                                   onChange={handleUserInfo} onBlur={handleBlur}/>
                        </div>
                        <div className="mt-1">
                            <div className="users-control_label">Пароль</div>
                            <small className="users-control_advice">Не заполняется, если нет необходимости обновлять
                                пароль существующего пользователя.</small>
                            <div className="d-flex flex-row align-items-center">
                                <input id="input-password" className="users-control_input"
                                       value={userInfo.password} onChange={handleUserInfo}
                                       disabled={true} onBlur={handleBlur}/>
                                <button type="button" onClick={handlePassword}
                                        className="tag-btn ml-1"><FontAwesomeIcon className="icon-reload"
                                                                                  icon={faRedoAlt}
                                                                                  size={"sm"}
                                                                                  color={"#ffffff"}/></button>
                            </div>
                        </div>

                        <div className="mt-3 mb-2">
                            <div className="users-control_label">Тип пользователя</div>
                            <select id="select-usertype" className="users-control_select" value={userInfo.role}
                                    onChange={handleUserInfo} onBlur={handleBlur}>
                                <option value={USER_TYPE_STUDENT}>Студент</option>
                                <option value={USER_TYPE_PROFESSOR}>Преподаватель</option>
                                <option value={USER_TYPE_METHODIST}>Методист</option>
                            </select>
                        </div>
                        {defineRole()}

                        <button type="button" className="btn users-control_load mt-3 mb-3"
                                onClick={handleSubmit}>{btnText}
                        </button>
                    </div>
                </div>
                <UsersTable id={1} url={Urls.user.getProfessorsAll()} userType={USER_TYPE_PROFESSOR}
                            title={"Список преподавателей"} rowClickEvent={handleUserEdit}/>
                <UsersTable id={2} url={Urls.user.getStudentsAll()} userType={USER_TYPE_STUDENT}
                            title={"Список студентов"} rowClickEvent={handleUserEdit}/>
            </div>
        </div>
    )
}

export default UsersControl;