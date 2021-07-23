import {Week} from "@config/config";
import {v4 as uuid} from "uuid";
import {makeDelete, makePost} from "@utils/network";
import {Urls} from "@config/urls";

export const Labels = {'sem': 0, 'lek': 1, 'lr': 2, 'dz': 3, 'rk': 4, 'cons': 5, 'exam': 6, 'free': 7}
const LabelsInt = {0: 'sem', 1: 'lek', 2: 'lr', 3: 'dz', 4: 'rk', 5: 'cons', 6: 'exam', 7: 'free'}


export const findNextDay = (Lists: object) => {
    let idx = 0;
    const isFull = !Week.some((item) => {
        if (!Lists[item.id]) {
            idx = item.id;
            return true;
        }
        return false;
    })
    return isFull ? -1 : idx;
}

export const reorder = (list: Array<object>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const copy = (item: object, destination: Array<object>, droppableIndex: number) => {
    const destClone = Array.from(destination);
    destClone.splice(droppableIndex, 0, {...item, id: uuid()});

    return destClone;
};

export const checkFill = (header_text: string, footer_text: string): boolean => {
    return header_text?.length >= 2 && footer_text?.length >= 2
}

export const getDayDataFromList = (day: Array<{ id: string, props: any }>) => {
    return day.map((lesson, index) => ({
        lesson_order: index + 1,
        lesson_id: lesson.id,
        title: lesson.props.header,
        auditorium: lesson.props.footer,
        lesson_type: LabelsInt[lesson.props.sourceIdx]
    }))
}

const changeWeekType = (week_type: string) => {
    return week_type === "Чc" ? "numerator" : "denominator";
}

const postWeekData = (week: object, showLabel: (err: any) => void) => {
    makePost(Urls.timetable.post(), week).then((resp) => {
        console.log(resp)
        if (resp.status !== 201) {
            showLabel({content: "Не удалось сохранить изменения!", success: false})
        } else {
            showLabel({content: "Успех!", success: true})
        }
    }).catch(() => {
        showLabel({content: "Не удалось сохранить изменения!", success: false})
    })
}

export const saveTimetable = (Lists: object, deleted: { lessons: Array<string> }, panelData: { group: number; semester: number; week: number; weekType: string },
                              showLabel: any) => {
    const week = {
        group: `IU10-${panelData.semester}${panelData.group}`,
        week_type: changeWeekType(panelData.weekType),
        week_number: panelData.weekType === "Чс" ? 1 : 2,
        days: <Array<object>>[]
    }
    const idx = Object.keys(Lists)
    idx.forEach((i) => {
        week.days.push(
            {
                day_order: parseInt(i) + 1,
                lessons: getDayDataFromList(Lists[i])
            }
        )
    });
    showLabel({content: "", success: false});

    console.log(week)


    makeDelete(Urls.timetable.delete(), {lessons_ids: deleted.lessons}).then((response) => {
        if (response.status === 200) {
            postWeekData(week, showLabel)
        } else {
            showLabel({content: "Ошибка при удалении записей!", success: false})
        }
    }).catch((err) => {
        if (err.response && err.response.status === 403) {
            showLabel({content: "Недостаточно прав для изменения!", success: false})
        } else {
            showLabel({content: "Ошибка при удалении записей!", success: false})
        }
    })
}
