import {Redirect, Route, useHistory} from "react-router-dom";
import {DOMAIN, ME, Urls} from "@config/urls"
import React, {useEffect} from "react";
import {makeGet} from "@utils/network";
import {DefaultCheckLogin} from "../pages/Authorization";

type Props = {
    component: any;
    path: string;
    exact?: boolean;
}

export const PrivateRoute: React.FC<Props> = ({component: Component, ...rest}) => {
    // const history = useHistory()
    //
    // useEffect(() => {
    //     const ServerCheckLogin = async () => {
    //         return makeGet(`${DOMAIN}${ME}`);
    //     }
    //
    //     ServerCheckLogin().then((r) => {
    //         if (r.status !== 200) {
    //             localStorage.setItem("loginTime", "");
    //             history.push(Urls.auth)
    //         }
    //     }).catch(() => {
    //         localStorage.setItem("loginTime", "");
    //         history.push(Urls.auth)
    //     })
    // }, [history, history.location.pathname])

    //const authed = DefaultCheckLogin();
    const authed = true;

    return (
        <Route {...rest}
               render={props => authed ?
                   props.location.pathname === "/" ?
                       <Redirect to={{
                           pathname: Urls.feed.slugRoot,
                           state: {from: props.location}
                       }}
                       /> :
                       (<Component {...props} />) :
                   <Redirect to={{
                       pathname: Urls.auth,
                       state: {from: props.location}
                   }}
                   />
               }
        />
    )
}