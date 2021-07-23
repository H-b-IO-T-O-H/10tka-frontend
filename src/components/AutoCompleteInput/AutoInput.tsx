import React from "react";

import "./AutoInput.scss"

type Props = {
    id: string;
    list: Array<string>;
    className: string;
    inputProps: any;
    //autoCompete: boolean,
}
const AutoInput: React.FC<Props> = ({id, className, list,inputProps}) => {
    React.useEffect(() => {
        const dataList = document.createElement("datalist");
        const input = document.getElementById(id);
        dataList.setAttribute('id', `datalist-${id}`);
        list.forEach((option) => {
            const dataListOption = document.createElement("option");
            dataListOption.value = option;
            dataList.appendChild(dataListOption);
        });
        input?.appendChild(dataList);
    }, [id, list])

    return (
        <input className={className} id={id} type="text"
               list={`datalist-${id}`}
               {...inputProps}
        />
    )
}

export default AutoInput;