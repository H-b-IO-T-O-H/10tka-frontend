import React from 'react';
import Pagination from "@components/Pagination";
import Footer from "@components/Footer";
import PostView from "@components/ViewPost/ViewPost"

const Blog = () => {
    const [posts, changePosts] = React.useState<React.ReactNode>([])

    React.useEffect(() => {
        const oldPosts = [];
        for (let i = 1; i < 4; ++i) {
            oldPosts.push(<div className="m-3" key={i}><PostView id={i}/></div>)
        }
        changePosts(oldPosts);
    }, [changePosts])

    return (
        <div>
            <div className="container-fluid">
                {posts}
                <div className="d-flex flex-center">
                    <Pagination/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Blog;