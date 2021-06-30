const MaxDisciplineLength = 25;
const MinDisciplineLength = 3;
const ERROR_TAG_FIELD = `Длина дисциплины должна быть от ${MinDisciplineLength} до ${MaxDisciplineLength} символов.`;
const ERROR_TAG_DUPLICATE = `Введенная дисциплина уже закреплена за преподавателем.`

export const isTagValid = (tags: Array<{ id: string, content: string }>, tagInfo: { content: string, noFocus: boolean, errMsg: string }) => {
    const length = tagInfo.content.length;

    tagInfo.errMsg = length < MinDisciplineLength || length > MaxDisciplineLength ? ERROR_TAG_FIELD : "";
    tags.forEach((tag) => {
        if (tag.content === tagInfo.content) {
            tagInfo.errMsg = ERROR_TAG_DUPLICATE;
            return;
        }
    })
    return tagInfo.errMsg;
}