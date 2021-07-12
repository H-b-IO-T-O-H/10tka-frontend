import React, { useState, useEffect } from 'react';
import ViewPost from "@components/ViewPost";
import Pagination from "@components/Pagination";


const PostsList = () => {

    const [posts, changePosts] = useState<Array<React.ReactNode>>([])

    useEffect(() => {
        const oldPosts = [];
        for (let i = 1; i < 4; ++i) {
            oldPosts.push(<div className="my-3" key={i}><ViewPost id={i}/></div>)
        }
        changePosts(oldPosts)
    }, [posts]);

    return (
        <div>
            <div className="container-fluid">
                {posts}
                <div className="d-flex flex-center">
                    <Pagination/>
                </div>
            </div>
        </div>
    )
}

export default PostsList;