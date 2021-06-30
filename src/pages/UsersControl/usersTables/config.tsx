import {makeGet} from "@utils/network";

export const getUsersData = (url: string, showLabel: any): any => {
    makeGet(url).then((response) => {
        return response.data;
    }).catch((error) => {
        showLabel({content: "Ничего не найдено", success: false});
    });
}