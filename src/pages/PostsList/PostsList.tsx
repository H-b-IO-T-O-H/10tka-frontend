import React, {Component} from 'react';
import ViewPost from "@components/ViewPost";
import Pagination from "@components/Pagination";


const PostsList = () => {

    const [posts, changePosts] = React.useState<Array<React.ReactNode>>([])

    React.useEffect(() => {
        const oldPosts = [];
        for (let i = 1; i < 4; ++i) {
            oldPosts.push(<div className="m-3" key={i}><ViewPost id={i}/></div>)
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