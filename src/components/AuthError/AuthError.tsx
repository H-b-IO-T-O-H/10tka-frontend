import React from "react";
import "./AuthError.scss"

type Props = {
    msg: string
}

const AuthError:React.FC<Props> = ({msg}) => {
    return (
        <div className="Auth__error">{msg}</div>
    )
}

export default React.memo(AuthError);