import React, { useState } from "react";
import "./ViewPost.scss"
import BlogTag from "@components/BlogTag/BlogTag";
import {Link} from "react-router-dom";
import {useHistory, useLocation} from "react-router-dom";
import PostComment from "@components/PostCommentView";
import Hamster from "@media/hamster.webp"
import CommentView from "@components/PostCommentView";
import {Urls} from "@config/urls";
import BlogTagList from "@components/BlogTagList";

let answersExample = [
    {text: "first answer text"},
    {text: "second answer text"},
    {text: "third answer text"},
    {text: "forth answer text"},
]


type Props = {
    id: string | number;
}

type Comment = {
    commentId: string | number,
    author: string,
    authorAvatarPath?: string,
    text: string,
    date?: string
}

export const PostView: React.FC<Props> = ({id}) => {
    const commentsForm = ["Комментарий", "Комментария", "Комментариев"];
    const history = useHistory();
    const location = useLocation();
    const [isOutputFull, changeOutputFull] = useState(location.pathname.includes('/posts'));
    const [isLiked, changeLiked] = useState(false);
    const [likesCnt, changeLikesCnt] = useState(0);
    const [commentsCnt, changeCommentsCnt] = useState(0);
    const [comments, changeComments] = useState<Array<Comment>>([])


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
            history.push(`/posts/${id}`)
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


    return (
        <div
            className="container-fluid flex-column h-100 justify-content-center align-items-center col-lg-10 col-xl-8 p-0 px-md-3">
            <div className="card">
                <div className="card-header d-flex flex-row flex-lg-nowrap flex-wrap justify-content-between align-items-center">
                    {isOutputFull ?
                        <p className="post-title mr-lg-4 mb-lg-3 mb-2">Вручение сертификатов семестровых курсов 28 января</p>
                        :
                        <Link to={`/posts/${id}`}>
                            <p className="post-title mr-lg-4 mb-lg-3 mb-2">Вручение сертификатов семестровых курсов 28 января</p>
                        </Link>
                    }

                    <p className="date-time grey-text mb-lg-3 mb-md-2 mb-1">25 января 2021 г. в 12:58</p>
                </div>
                <div className="card-body pt-sm-3 pt-2">
                    <BlogTagList/>
                    <p className="mt-3">
                        &nbsp;Поздравляю студентов&nbsp; с окончанием семестровых курсов в
                        Технопарке!<br/>Мы
                        знаем, что это было непросто, но все вы – молодцы!&nbsp;<br/>Каждого&nbsp; успешного
                        выпускника&nbsp; ждет сертификат, который в будущем можно использовать в резюме или
                        портфолио.<br/><br/>Даже в режиме удаленки&nbsp;мы не просто отправляем сертификаты,
                        а вручаем их. Поэтому приглашаем всех выпускников на онлайн вручение, которое
                        начнется в четверг, <strong>28 января, в 16:00.</strong><br/><br/><strong>Программа
                        мероприятия:</strong><br/>- приветственные слова руководителя департамента
                        образования Mail.ru Group Анны Степановой,&nbsp;<br/>- специальный гость и
                        интерактивная часть,&nbsp;<br/>- Андрей Викторович Пролетарский и
                        преподаватели&nbsp; Технопарка скажут пару напутственных слов,&nbsp;<br/>-&nbsp; я
                        расскажу вам о тех курсах, которые&nbsp; мы запланировали в семестре Весна -
                        2021&nbsp;<br/>- вручение сертификатов.<br/><br/>Важно! Бумажную версию сертификата
                        каждый из вас сможет получить в феврале. Вся информация о выдаче будет на
                        портале.<br/><br/><strong>Ссылка на подключение:</strong><br/>Мероприятие будет
                        закрытым и пройдет в любимом Зуме. Ссылка на комнату&nbsp;<a
                        href="https://mailru.zoom.us/j/92900161419?pwd=UFZzbnl3TkgzbXRiWVBaU2txMEtrdz09"
                        target="_blank"
                        rel="noopener">https://mailru.zoom.us/j/92900161419?pwd=UFZzbnl3TkgzbXRiWVBaU2txMEtrdz09</a><br/><br/>Мы
                        пришлем напоминание и ссылку еще раз в день вручения за пару часов до старта.&nbsp;
                        <br/>Увидимся!&nbsp;&nbsp;</p>
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
                                    {'5'}
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