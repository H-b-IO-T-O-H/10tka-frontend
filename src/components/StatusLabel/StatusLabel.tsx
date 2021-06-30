import React, {useState} from "react";
import "./StatusLabel.scss"

type Props = {
    info: { content: string, success: boolean };
}


const StatusLabel: React.FC<Props> = ({info}) => {
    const [shown, isShown] = useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            isShown(false);
        }, 2000);
        isShown(info.content !== "");
        return () => clearTimeout(timer);
    }, [info])


    return (
        <div className="StatusLabel"
             style={{backgroundColor: info.success ? "rgba(23,127,19,0.7)" : "rgba(175, 37, 37, 0.9)"}}>
            {shown ? <div className="StatusLabel__content text-center">
                <div>{info.content}</div>
            </div> : null}
        </div>
    )
}

export default StatusLabel