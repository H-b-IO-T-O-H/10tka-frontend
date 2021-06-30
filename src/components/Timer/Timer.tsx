import React, {useEffect, useState, useCallback} from "react";

import {PROTECTED_SESSION_TIME} from "../../pages/Authorization/config";

const secondsToTime = (s: number) => {
    const h = Math.trunc(s / 3600);
    const m = Math.trunc(s / 60 - 60 * h);
    s = s - 3600 * h - 60 * m
    return {
        h: h,
        m: m,
        s: s
    };
}

type Props = {
    id?: string,
    onZero?: () => void,
    size: { sm?: boolean, xs?: boolean, lg?: boolean }
}

const Timer: React.FC<Props> = ({id, onZero, size}) => {

    const [time, changeTime] = useState({time: secondsToTime(PROTECTED_SESSION_TIME), seconds: PROTECTED_SESSION_TIME});
    const [isActive, setActive] = useState(true);

    const OnStopCallback = useCallback(
        () => {
            if (onZero) {
                onZero();
            }
        },
        [onZero],
    );

    const getSize = () => {
        if (size.xs) {
            return "0.7rem";
        }
        return size.lg ? "1.2rem" : "0.9rem";
    }

    useEffect(() => {
        let timer = 0;
        if (isActive) {
            timer = window.setInterval(() => {
                let seconds = time.seconds - 1;
                changeTime({
                    time: secondsToTime(seconds),
                    seconds: seconds,
                });
                if (seconds === 0 && isActive) {
                    setActive(!isActive);
                    OnStopCallback();
                }
            }, 1000);
        } else if (!isActive && time.seconds !== 0) {
            window.clearInterval(timer);
        }
        return () => window.clearInterval(timer);
    }, [isActive, time.seconds, OnStopCallback]);

    return (
        <div key={id} className="d-flex">
            <div style={{fontSize: getSize()}}>
                {time.time.h}:{time.time.m}:{time.time.s}
            </div>
        </div>
    );
}

export default Timer;

