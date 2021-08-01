import React, {useCallback, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";

import Timer from "@components/Timer";
import Avatar from "@media/student.png"
import Admin from "@media/admin.jpg"
import {Urls} from "@config/urls";

import {Logout} from "../../pages/Authorization";
import "./Header.scss"


const Header = () => {
    const location = useLocation();
    const history = useHistory();

    const Rendered = () => {
        const path = location.pathname;
        let postId = 0;
        if (path.includes("posts")) {
            let urlPath = path.split("/");
            postId = parseInt(urlPath[urlPath.length - 1]);
        }
        return [Urls.feed.slugRoot, Urls.timetable.slugEdit,
        Urls.panel.slugRoot, Urls.root,
        `${Urls.post.slugRoot}/${postId}`, Urls.post.slugCreate,
        Urls.user.slugMe, Urls.user.slugRoot, Urls.user.slugProfile].includes(path)

    }

    const [collapseCondition, setCollapseCondition] = useState('closed');

    const toggleCollapse = useCallback(() => {
        collapseCondition === 'opened' ? setCollapseCondition('closed') : setCollapseCondition('opened');
    }, [collapseCondition]);

    return (
        <React.Fragment>
            {Rendered() ? <div className={`navbar__main`}>
                <MDBNavbar color="teal lighten-2" dark expand="lg">
                    <MDBNavbarToggler onClick={toggleCollapse}/>

                    <MDBNavbarBrand className="navbar__brand mr-0 mr-lg-3">
                        <strong className="white-text">10-tka</strong>
                    </MDBNavbarBrand>

                    <div className="order-lg-last d-inline-flex">
                        <MDBNavbarNav>
                            <div className="d-flex align-items-center justify-content-end flex-nowrap">
                                <MDBNavItem className="px-3 px-lg-0">
                                    <img className="navbar__avatar"
                                         onClick={() => {
                                             history.push(Urls.user.slugMe)
                                         }}
                                         src={localStorage.getItem("user_role") === "admin" ? Admin : Avatar}
                                         alt="oops"/>
                                </MDBNavItem>
                                <MDBNavItem
                                    className="container-fluid flex-column justify-content-center text-center d-none d-lg-block">
                                <span
                                    className="main__title">{localStorage.getItem("user_role") === "admin" ? "Admin" : "Вася Пупкин"}</span>
                                    <div className="text-black-50">
                                        <Timer size={{sm: true}} onZero={() => {
                                            Logout(history);
                                        }}/>
                                    </div>
                                </MDBNavItem>
                                <MDBNavItem className="d-none d-lg-block">
                                    <MDBDropdown>
                                        <MDBDropdownToggle className="dropdown-toggle navbar__dropdown">
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu right basic>
                                            <MDBDropdownItem onClick={() => {
                                                history.push(Urls.user.slugMe)
                                            }}>Профиль</MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => {
                                                Logout(history);
                                            }}>Выйти</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </div>
                        </MDBNavbarNav>
                    </div>

                    <div className={`navbar__collapse mr-auto p-3 p-lg-0 ${collapseCondition}`}>
                        <MDBNavbarNav left onClick={toggleCollapse}>
                            <MDBNavItem active>
                                <MDBNavLink className="navbar__main_link" to={Urls.feed.slugRoot}>
                                    <div className="navbar__main_strong">Главная</div>
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem active>
                                <MDBNavLink className="navbar__main_link" to={Urls.post.slugCreate}>
                                    <div className="navbar__main_strong">Создать пост</div>
                                </MDBNavLink>
                            </MDBNavItem>
                            {localStorage.getItem("user_role") === "admin" ?
                                <MDBNavItem active>
                                    <MDBNavLink className="navbar__main_link" to={Urls.timetable.slugEdit}>
                                        <div className="navbar__main_strong">Конструктор расписания</div>
                                    </MDBNavLink>
                                </MDBNavItem> : null}
                            {localStorage.getItem("user_role") === "admin" ?
                                <MDBNavItem active>
                                    <MDBNavLink className="navbar__main_link" to={Urls.panel.slugRoot}>
                                        <div className="navbar__main_strong">Пользователи</div>
                                    </MDBNavLink>
                                </MDBNavItem> : null}

                            <MDBNavItem active className="d-lg-none">
                                <button type="button"
                                        className="link-logout"
                                        onClick={() => {
                                            Logout(history)
                                        }}>
                                    <div className="navbar__main_strong">Выход</div>
                                </button>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </div>
                </MDBNavbar>
            </div> : null}
        </React.Fragment>
    );
}

export default Header;

