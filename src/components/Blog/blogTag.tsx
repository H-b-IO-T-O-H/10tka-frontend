import React from "react";
import {TAG_EDUCATIONAL, TAG_GENERAL, TAG_IMPORTANT} from "@config/config";
import "./blogTag.scss"

const BlogTag = () => {
    return (
        <div>
            <button type="button" className="btn-tag btn-tag-general">#{TAG_GENERAL}</button>
            <button type="button" className="btn-tag btn-tag-important">#{TAG_IMPORTANT}</button>
            <button type="button" className="btn-tag btn-tag-educational">#{TAG_EDUCATIONAL}</button>
        </div>
    )
}

export default BlogTag;