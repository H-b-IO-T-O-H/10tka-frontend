import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {PrivateRoute} from "@utils/privateRoute"
import Header from "@components/Header";
import {Urls} from "@config/urls"
import Timetable from "../pages/Timetable";
import Auth from "../pages/Authorization";
import NotFoundPage from "../pages/NotFound";
import Home from "../pages/Home";
import UsersControl from "../pages/UsersControl";
import "../styles/main.scss"
import "../styles/fontawesome-free-5.15.3-web/css/all.min.css"
import CreatePost from "../pages/PostCreate";
import ViewPost from "@components/ViewPost";
import Profile from "../pages/Profile";

export const TEMP: { posts: Array<JSX.Element> } = {
    posts: [],
}

const App = () => {
    return (
        <BrowserRouter>
            <div className="App h-100">
                <Header/>
                <Switch>
                    <PrivateRoute exact path={Urls.root}
                                  component={Home}/>
                    <PrivateRoute exact path={Urls.feed.slugRoot}
                                  component={Home}/>
                    <PrivateRoute exact path={Urls.timetable.slugEdit}
                                  component={Timetable}/>
                    <PrivateRoute exact path={Urls.panel.slugRoot}
                                  component={UsersControl}/>
                    <PrivateRoute exact path={Urls.post.slugCreate}
                                  component={CreatePost}/>
                    <PrivateRoute path="/posts/:id" component={ViewPost} />
                    <PrivateRoute exact path={Urls.user.slugMe} component={Profile} />
                    <PrivateRoute path={Urls.user.slugProfile} component={()=>(<div>Profile</div>)} />
                    <Route exact path={Urls.auth} component={Auth}/>
                    <Route path={Urls.notFound} component={NotFoundPage}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}


// const App = () => {
//     return (
//         <BrowserRouter>
//             <div className="App h-100">
//                 <CreatePost/>
//             </div>
//         </BrowserRouter>
//     )
// }

export default App;

//https://github.com/ktsstudio/kts-school-frontend