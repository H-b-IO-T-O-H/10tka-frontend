import React, {useCallback, useEffect, useState} from "react";
import "./BlogTag.scss"

type Tag = {
    id: string,
    title: string,
    color: string,
    hoverColor: string,
}

type Props = {
    tag: Tag,
    openedTag: string,
    toggleTag: (id: string) => void,
}

type Style = {
    backgroundColor: string,
}

export const BlogTag: React.FC<Props> = ({tag, openedTag, toggleTag}) => {
    const {id, title, color, hoverColor} = tag;
    const [tagCondition, setTagCondition] = useState('closed');
    const [backgroundColor, setBackgroundColor] = useState(color);

    useEffect(() => {
        id === openedTag ? setTagCondition('opened') : setTagCondition('closed')
    }, [openedTag, id])

    const handleClick = () => {
        toggleTag(id);
    }

    const toggleColor = useCallback(() => {
        backgroundColor === color ? setBackgroundColor(hoverColor) : setBackgroundColor(color);
    }, [backgroundColor, color, hoverColor]);

    const tagStyle: Style = {
        backgroundColor: backgroundColor,
    }

    return (
        <button type="button"
                onClick={handleClick}
                onMouseEnter={toggleColor}
                onMouseLeave={toggleColor}
                className={`btn-tag ${tagCondition}`}
                style={tagStyle}>
            {`#${title}`}
        </button>
    )
}

export default BlogTag;