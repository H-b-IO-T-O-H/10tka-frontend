import React, {useCallback, useEffect, useState} from "react";
import "./ViewPost.scss"
import BlogTag from "@components/Blog/blogTag";
import {Link} from "react-router-dom";
import {useHistory, useLocation} from "react-router-dom";
import PostComment from "@components/PostCommentView";
import Hamster from "@media/hamster.webp"
import CommentView from "@components/PostCommentView";
import {Urls} from "@config/urls";
import {makeDelete, makeGet} from "@utils/network";
import HTMLReactParser from 'html-react-parser';
import StatusLabel from "@components/StatusLabel";

let answersExample = [
    {text: "first answer text"},
    {text: "second answer text"},
    {text: "third answer text"},
    {text: "forth answer text"},
]


type Props = {
    id: string | number;
    data: {
        post_id: 0,
        title: "",
        author_id: 0,
        tag_type: "",
        content: "",
        created: "",
        is_edited: false,
        comments: false
    }
}

type Comment = {
    commentId: string | number,
    author: string,
    authorAvatarPath?: string,
    text: string,
    date?: string
}

export const PostView: React.FC<Props> = ({id, data}) => {
    const [label, showLabel] = useState({content: "", success: false});
    const commentsForm = ["Комментарий", "Комментария", "Комментариев"];
    const history = useHistory();
    const location = useLocation();
    const [isOutputFull, changeOutputFull] = React.useState(false);
    const [isLiked, changeLiked] = React.useState(false);
    const [likesCnt, changeLikesCnt] = React.useState(0);
    const [commentsCnt, changeCommentsCnt] = React.useState(0);
    const [comments, changeComments] = React.useState<Array<Comment>>([]);
    const [postData, changePostData] = React.useState({
        post_id: 0,
        title: "",
        author_id: 0,
        tag_type: "",
        content: "",
        created: "",
        is_edited: false,
        comments: false
    });

    useEffect(() => {
        if (location.pathname.includes('/posts')) {
            changeOutputFull(true);
            let urlPath = location.pathname.split("/");
            const postId = parseInt(urlPath[urlPath.length - 1]);
            makeGet(Urls.post.getById(postId)).then((resp) => {
                if (resp.status === 200) {
                    changePostData(resp.data);
                    console.log(resp.data)
                }
            }).catch((err) => {
                if (err && err.message === "Network Error") {
                    showLabel({success: false, content: "Не удается связаться с сервером."})
                } else if (err.response) {
                    if (err.response.status === 404) {
                        showLabel({success: false, content: err.response.data})
                        history.replace("/*")
                        return
                    } else {
                        showLabel({success: false, content: err.response.data})
                    }
                }
            })
        } else {
            changePostData(data);
        }
    }, [])


    const declOfNum = (n: number, text_forms: Array<string>) => {
        n = Math.abs(n) % 100;
        let n1 = n % 10;
        if (n > 10 && n < 20) {
            return text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return text_forms[1];
        }
        if (n1 === 1) {
            return text_forms[0];
        }
        return text_forms[2];
    }

    const commentsRedirectHandler = () => {
        if (!isOutputFull) {
            history.push(`/posts/${data.post_id}`)
        }
        document.getElementById("go-to-comments")?.click()
    }

    const addComment = () => {
        const oldComments = [...comments];

        oldComments.push({authorAvatarPath: "", date: "", commentId: oldComments.length, text: "aaaa", author: "Vasya"})
        changeComments(oldComments);
    }

    const deleteComment = (commentId: string | number) => {
        const oldComments = [...comments];
        const idx = oldComments.findIndex((c) => (c.commentId === commentId))
        oldComments.splice(idx, 1);
        changeComments(oldComments);
    }

    const deletePost = React.useCallback(() => {
        makeDelete(Urls.post.delete(data.post_id), null).then((resp) => {
            if (resp.status === 200) {
                showLabel({success: true, content: "Пост успешно удален."});
            } else if (resp.status === 404) {
                showLabel({success: false, content: "Пост не найден."});
            }
            history.replace(Urls.feed.slugRoot)
        }).catch((err) => {
            if (err.status === 404) {
                showLabel({success: false, content: "Пост не найден."});
            } else {
                showLabel({success: false, content: err.content});
            }
        })
    }, [])

    return (
        <div
            className="container-fluid flex-column h-100 justify-content-center align-items-center col-md-10 col-xl-7">
            <StatusLabel info={label}/>
            <div className="card">
                <div className="card-header d-flex flex-row justify-content-between">
                    {isOutputFull ?
                        <p className="post-title">{postData.title}</p>
                        :
                        <Link to={`/posts/${postData.post_id}`}><p className="post-title">{postData.title}</p></Link>
                    }

                    <p className="date-time grey-text">{postData.created}</p>
                </div>
                <div className="card-body">
                    <BlogTag/>
                    <p>{postData.tag_type}</p>
                    {HTMLReactParser(postData.content)}
                    <button className="btn-post-social btn-post-like"
                            onClick={deletePost}><i className="fa fa-trash fa-lg"/></button>
                    <footer className="grey-text">
                        <hr/>
                        <div className="d-flex flex-nowrap flex-row justify-content-between">
                            <div className="ml-0">
                                <img className="post-avatar-sm" src="/public/img/hamster.webp"
                                     alt="img not loaded"/>
                                <Link to={Urls.user.getUser(1)}>
                                    Сергей Козлачков
                                </Link>
                            </div>

                            <div className="mr-3">
                                <a id="go-to-comments" className="href-transparent" href="#comments"/>
                                <button className="btn-post-social" onClick={commentsRedirectHandler}>
                                    <i className="fa fa-comments fa-lg post-icon-comment"/></button>
                                {'5 комментов'}
                                <button className="btn-post-social btn-post-like"
                                        onClick={() => {
                                            changeLiked(!isLiked);
                                            changeLikesCnt(isLiked ? likesCnt - 1 : likesCnt + 1);
                                        }}><i
                                    className="fa fa-heart fa-lg post-icon-like"
                                    style={isLiked ? {color: "#ff4a4a"} : undefined}/></button>
                                {likesCnt}
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            {isOutputFull ? <div>
                <button className="btn btn-success btn-sm" onClick={addComment}>comments+
                </button>
                <h1 className="m-3">
                    <span>{commentsCnt} </span>{declOfNum(commentsCnt, commentsForm)}
                </h1>

                <div data-spy="scroll" data-offset="0">
                    <div id="comments">
                        {comments.map((comment) => (
                            <CommentView key={comment.commentId} text={comment.text} viewByAuthor={true}
                                         onDeleteClick={() => (deleteComment(comment.commentId))}/>
                        ))}
                    </div>
                    {<div className="text-center">
                        <button className="btn-post-social btn-post-comment blue-color"
                                onClick={() => {
                                    alert(1)
                                }}>Показать следующие комментарии
                        </button>
                    </div>}
                </div>
            </div> : null}
        </div>
    )
}

export default PostView;