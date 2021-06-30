import React from "react";
import {useHistory} from "react-router-dom";

import {Urls} from "@config/urls";

import "./NotFound.scss"

const NotFoundPage = () => {
    const history = useHistory()

    const homeRedirectHandler = React.useCallback(() => {
        history.replace(Urls.timetable.slugRoot)
    }, [history]);

    return (
        <div className="notFound">
            <div className="overlay"/>
            <div className="terminal">
                <h1>Error <span className="errCode">404</span></h1>
                <p className="output">The page you are looking for might have been removed, had its name changed or is
                    temporarily unavailable.</p>
                <p className="output">Please try to
                    <button type="button"
                            className="link-button notFound__back"
                            onClick={history.goBack}>
                        go back</button> or
                    <button type="button"
                            className="link-button notFound__back"
                            onClick={homeRedirectHandler}>
                        return to the homepage</button>.
                </p>
                <p className="output">Good luck.</p>
            </div>
        </div>
    )
}

export default React.memo(NotFoundPage);