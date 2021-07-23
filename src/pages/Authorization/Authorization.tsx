import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"

import {DOMAIN, LOGIN, LOGOUT, Urls} from "@config/urls";

import {
    DEFAULT_SESSION_TIME,
    EMPTY_EMAIL_FIELD,
    EMPTY_PASSWORD_FIELD,
    ERROR_AUTHORIZATION,
    ERROR_EMAIL_FIELD,
    ERROR_PASSWORD_FIELD,
    ERROR_SERVER,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    SERVER_UNAVAILABLE
} from "./config";
import "./Authorization.scss"
import AuthError from "@components/AuthError";
import {makePost} from "@utils/network";
import {addUsers} from "@utils/addUsers";

export const Logout = (history: any) => {
    makePost(`${DOMAIN}${LOGOUT}`, null).then((r) => {
    }).catch((e) => {
    })
    localStorage.clear()
    history.replace(Urls.auth);
}

export const DefaultCheckLogin = () => {
    const lastAuthTime = parseInt(localStorage.getItem("loginTime") as string);
    return lastAuthTime != null && Date.now() - lastAuthTime < DEFAULT_SESSION_TIME;
}

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState(EMPTY_EMAIL_FIELD);
    const [passwordError, setPasswordError] = useState(EMPTY_PASSWORD_FIELD);
    const [formValid, setFormValid] = useState(false);
    const [userError, setUserError] = useState('');
    const [checkBox, setCheckBox] = useState(false);
    const history = useHistory();

    const CheckBoxHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckBox(e.target.checked);
    }, []);

    const HandleSubmit = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        //addUsers();

        // localStorage.setItem("loginTime", Date.now().toString());
        // localStorage.setItem("user_role", 'admin')
        // const userGroup = "IU10-83";
        // history.push(Urls.feed.slugRoot);

        makePost(`${DOMAIN}${LOGIN}`, {
            email: email,
            password: password,
            checkbox: checkBox
        }).then((response) => {
            localStorage.setItem("loginTime", Date.now().toString());
            const userGroup = response.data.user.group;
            //console.log("User = ", response.data.user)
            if (userGroup !== "") {
                localStorage.setItem("user_group", response.data.user.group)
            }
            localStorage.setItem("user_role", response.data.user.role)
            history.push(Urls.feed.slugRoot);
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 404) {
                    setUserError(ERROR_AUTHORIZATION);
                } else {
                    setUserError(ERROR_SERVER);
                }
            } else {
                setUserError(SERVER_UNAVAILABLE);
            }
            return;
        });

    }, [email, password, checkBox, history]);

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailError, passwordError]);

    const EmailHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const emailNew = e.target.value;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(emailNew).toLowerCase())) {
            setEmailError(ERROR_EMAIL_FIELD)
        } else setEmailError('');
        setEmail(emailNew);
    }, []);

    const PasswordHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const passwdNew = e.target.value;
        if (passwdNew.length < PASSWORD_MIN_LENGTH || passwdNew.length > PASSWORD_MAX_LENGTH) {
            setPasswordError(ERROR_PASSWORD_FIELD);
            if (!passwdNew.length) {
                setPasswordError(EMPTY_PASSWORD_FIELD);
            }
        } else setPasswordError('');
        setPassword(passwdNew);
    }, []);

    const BlurHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setEmailDirty(true);
        } else {
            setPasswordDirty(true);
        }
        setUserError("");
    }, []);

    return (
        <div className="container-fluid d-flex h-100 justify-content-center align-items-center text-center">
            <div className="row bg-white shadow-sm m-1">
                <div className="col border rounded p-4">
                    <form>
                        <div className="form-group">
                            <div>Email</div>
                            {(emailDirty && emailError) && <AuthError msg={emailError}/>}
                            <input onBlur={BlurHandler} onChange={EmailHandler} value={email}
                                   type="text" className="form-control" name="email" placeholder="Введите email..."/>
                            <small id="emailHelp" className="form-text text-muted">Мы не передаем ваши данные
                                сторонним источникам</small>
                        </div>
                        <div className="form-group">
                            <div>Пароль</div>
                            {(passwordDirty && passwordError) && <AuthError msg={passwordError}/>}
                            <input onBlur={BlurHandler} onChange={PasswordHandler} value={password}
                                   className="form-control" type="password"
                                   placeholder="Введите пароль..."/>
                        </div>
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <input className="mr-1" onChange={CheckBoxHandler} type="checkbox"/>
                            <div>Запомнить меня</div>
                        </div>
                        <div className="p-0"> {(userError) && <AuthError msg={userError}/>}</div>
                        <div className="p-3">
                            <button disabled={!formValid} onClick={HandleSubmit} type="submit"
                                    className="btn Auth__btn mt-2">Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;
