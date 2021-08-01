import React, { Component, useState, useEffect } from 'react';
import ViewPost from "@components/ViewPost";
import Pagination from "@components/Pagination";
import {makeGet} from "@utils/network";
import {Urls} from "@config/urls";
import PostView from "@components/ViewPost";
import StatusLabel from "@components/StatusLabel";


const PostsList = () => {
    const [label, showLabel] = useState({content: "", success: false});
    const [posts, changePosts] = useState<Array<React.ReactNode>>([])

    useEffect(() => {
        const oldPosts: Array<React.ReactNode> = [];

        makeGet(Urls.post.getList(0, 0)).then((resp) => {
            if (resp.status != 200) {
                showLabel({content: "Не удалось загрузить посты", success: false})
            } else if (resp.data !== null && resp.data.length > 0) {
                let postsList = resp.data;
                console.log(resp.data)
                for (let i = 0; i < postsList.length; ++i) {
                    oldPosts.push(<div key={i}><PostView id={i} data={postsList[i]}/></div>)
                }
                changePosts(oldPosts);
            }
        }).catch((err) => {
            showLabel({content: `Не удалось загрузить посты:${err}`, success: false})
        })


    }, [])

    return (
        <div>
            <StatusLabel info={label}/>
            <div className="container-fluid p-0">
                {posts.length > 0 ? posts : <div className="d-flex flex-center">Посты не найдены</div>}
                <div className="d-flex flex-center">
                    <Pagination/>
                </div>
            </div>
        </div>
    )
}

export default PostsList;