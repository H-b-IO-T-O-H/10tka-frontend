import React, {useState} from "react";
import { TAGS } from "@config/config";
import BlogTag from "@components/BlogTag";
import "./BlogTagList.scss"

const BlogTagList = () => {
    const [openedTag, setOpenedTag] = useState<string>('');

    const toggleTag = (id: string): void => {
        openedTag === id ? setOpenedTag('') : setOpenedTag(id);
    }

    return (
        <div>
            {TAGS.map((tag) => (
                <BlogTag key={tag.id}
                         tag={tag}
                         openedTag={openedTag}
                         toggleTag={toggleTag}/>
            ))}
        </div>
    )
}

export default BlogTagList;