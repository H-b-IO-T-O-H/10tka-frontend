import React, { useCallback, useEffect, useState} from "react";
import "./ViewPost.scss"
import {Link} from "react-router-dom";
import {useHistory, useLocation} from "react-router-dom";
import Hamster from "@media/hamster.webp"
import CommentView from "@components/PostCommentView";
import {Urls} from "@config/urls";
import {makeDelete, makeGet} from "@utils/network";
import HTMLReactParser from 'html-react-parser';
import StatusLabel from "@components/StatusLabel";
import BlogTagList from "@components/BlogTagList";

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

    const [isOutputFull, changeOutputFull] = useState(false);
    const [isLiked, changeLiked] = useState(false);
    const [likesCnt, changeLikesCnt] = useState(0);
    const [commentsCnt, changeCommentsCnt] = useState(0);
    const [comments, changeComments] = useState<Array<Comment>>([]);
    const [expandState, changeExpandState] = useState('unexpanded');
    const [isScrollable, changeIsScrollable] = useState(false)
    const [postData, changePostData] = useState({
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

    const deletePost = useCallback(() => {
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


    useEffect(() => {
        const postText: (HTMLElement | null) = document.querySelector(`#postContent-${postData.post_id}`);
        const postTextHeight: (number | undefined) = postText?.clientHeight;
        const postTextScrollHeight: (number | undefined) = postText?.scrollHeight;

        if (typeof postTextHeight === "number" &&
            typeof postTextScrollHeight === "number" &&
            postTextHeight !== postTextScrollHeight) {
            changeIsScrollable(true);
        }
    })


    const expandText = (e: any) => {
        e.preventDefault()
        expandState === 'unexpanded' ? changeExpandState('expanded') : changeExpandState('unexpanded');
    }

    return (
        <div className="container-fluid flex-column h-100 justify-content-center align-items-center col-lg-10 col-xl-8 p-3">
            <StatusLabel info={label}/>
            <div className="card">
                <div className="card-header d-flex flex-row flex-lg-nowrap flex-wrap justify-content-between align-items-center">
                    {isOutputFull ?
                        <p className="post-title mr-lg-4 mb-lg-3 mb-2">{postData.title}</p>
                        :
                        <Link to={`/posts/${postData.post_id}`}><p className="post-title mr-lg-4 mb-lg-3 mb-2">{postData.title}</p></Link>
                    }

                    <p className="date-time grey-text mb-lg-3 mb-md-2 mb-1">{postData.created}</p>
                </div>
                <div className="card-body pt-sm-3 pt-2">
                    <BlogTagList/>
                    <p>{postData.tag_type}</p>

                    <div className={`post__content mt-3 ${expandState}`} id={`postContent-${postData.post_id}`}>
                        {HTMLReactParser(postData.content)}
                    </div>

                    <a className={`read-more mt-3 ${isScrollable ? 'd-block' : 'd-none'}`}
                       href="#"
                       onClick={expandText}>
                        {expandState === 'unexpanded' ? `Читать далее` : `Скрыть текст`}
                    </a>
                    <button className="btn-post-social btn-post-like mt-2"
                            onClick={deletePost}>
                        <i className="fa fa-trash fa-lg"/>
                    </button>

                    <footer className="grey-text">
                        <hr/>
                        <div className="d-flex flex-nowrap flex-row justify-content-between">
                            <div className="ml-0">
                                <Link to={Urls.user.getUser(1)}>
                                    <img className="post-avatar-sm" src={Hamster}
                                         alt="img not loaded"/>
                                    <span className="d-none d-sm-inline">{'Сергей Козлачков'}</span>
                                </Link>
                            </div>

                            <div className="mr-3">
                                <a id="go-to-comments" className="href-transparent" href="#comments"/>
                                <button className="btn-post-social" onClick={commentsRedirectHandler}>
                                    <i className="fa fa-comments fa-lg post-icon-comment"/>
                                </button>
                                <p className="d-inline">
                                    {commentsCnt}
                                    <span  className="d-none d-lg-inline">
                                        {' комментов'}
                                    </span>

                                </p>
                                <button className="btn-post-social btn-post-like"
                                        onClick={() => {
                                            changeLiked(!isLiked);
                                            changeLikesCnt(isLiked ? likesCnt - 1 : likesCnt + 1);
                                        }}><i
                                    className="fa fa-heart fa-lg post-icon-like"
                                    style={isLiked ? {color: "#ff4a4a"} : undefined}/>
                                </button>
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