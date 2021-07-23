import React, {useState} from "react";
import "./Tags.scss"
import IconPlus from "@components/IconPlus";
import StatusLabel from "@components/StatusLabel";
import AuthError from "@components/AuthError/AuthError";
import AutoInput from "@components/AutoCompleteInput";
import {isTagValid} from "@components/Tags/config";
import {v4 as uuid} from "uuid";

type Props = {
    placeholder?: string;
    tags: Array<{ id: string, content: string }>;
    selectList: Array<string>;
    changeTags: (tagsOld: Array<{ id: string, content: string }>) => void;
}

const Tags: React.FC<Props> = ({tags, changeTags, placeholder, selectList}) => {
    const [tagInput, setTagInp] = React.useState({content: "", noFocus: true, errMsg: ""})
    const [label, showLabel] = useState({content: "", success: false});

    const handleInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const tagInfo = {...tagInput};
        tagInfo.content = e.target.value;
        tagInfo.errMsg = isTagValid(tags, tagInfo);
        tagInfo.noFocus = false;
        setTagInp(tagInfo);
    }, [tagInput, tags]);

    const handleBlur = React.useCallback(() => {
        const tagInfo = {...tagInput};

        if (tags.length > 0 && tagInfo.content === "") {
            tagInfo.errMsg = "";
        }
        tagInfo.noFocus = true;
        setTagInp(tagInfo);
    }, [tagInput, tags]);

    const handleDelete = React.useCallback((id: string | number) => {
        const tagsOld = [...tags];
        const tagId = tagsOld.findIndex((obj) => (obj.id === id))
        tagsOld.splice(tagId, 1);
        changeTags(tagsOld);
    }, [changeTags, tags]);


    const addTag = React.useCallback(() => {
        const tagsOld = [...tags];
        const tagOld = {...tagInput};
        const id = `tag-${uuid()}`;

        if (tagInput.content === '') {
            showLabel({content: 'Введите дисциплину!', success: false})
            return;
        }
        if (tagInput.errMsg !== "") {
            return;
        }
        tagsOld.push({id: id, content: tagInput.content})
        changeTags(tagsOld)
        tagOld.content = "";
        setTagInp(tagOld);
    }, [tags, tagInput, changeTags])

    return (
        <div>
            <StatusLabel info={label}/>
            <div className="mb-2">{tags.map((tag) => (
                <div className="tag" key={tag.id}>
                    <div className="tag-block">
                        {tag.content}
                    </div>
                    <button className="btn-delete" onClick={() => handleDelete(tag.id)}><IconPlus/></button>
                </div>
            ))}</div>
            {(tagInput.noFocus && tagInput.errMsg) &&
            <AuthError msg={tagInput.errMsg}/>}
            <div className="d-flex flex-row align-items-center">
                <AutoInput id="input-auto_tag" className="users-control_input"
                           list={selectList}
                           inputProps={{
                               value: tagInput.content,
                               onChange: handleInput,
                               onBlur: handleBlur,
                               placeholder: placeholder
                           }}
                />
                <button type="button" onClick={addTag} className="tag-btn ml-1">+</button>
            </div>
        </div>
    )
}

export default Tags;