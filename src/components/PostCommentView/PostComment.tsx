import React from "react";
import {Link} from "react-router-dom";
import IconPlus from "@components/IconPlus";

type Props = {
    key: string | number,
    text: string,
    answers?: [],
    commentAuthor?: string,
    viewByAuthor?: boolean,
    onDeleteClick?: () => void
}

const CommentView: React.FC<Props> = ({key, text, answers, commentAuthor, viewByAuthor, onDeleteClick}) => (
    <div className="post-comment" key={key}>
        <div className="card-header d-flex flex-row justify-content-between">
            <div>
                <img className="post-comment-avatar" src="/public/img/hamster.webp"
                     alt="img not loaded"/>
                <Link className="ml-3" to="/profile">Вася Пупкин</Link>
            </div>
            <span>
                <p className="date-time grey-text"> 25 января 2021 г. в 12:58</p>
                {viewByAuthor ?
                    <button type="button"
                            className="link-button"
                            onClick={onDeleteClick}
                    >
                        <IconPlus/>
                    </button>
                    : null}
            </span>
        </div>
        <div className="card-body">
            <div>{text ? <p>{text}</p> :
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            }</div>
        </div>
    </div>
)

export default CommentView;