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

    const [collapseIsOpen, collapseChange] = useState(false);

    const toggleCollapse = useCallback(() => {
        collapseChange(!collapseIsOpen);
    }, [collapseIsOpen]);

    return (
        <div>
            {Rendered() ? <div className="navbar__main">
                <MDBNavbar className="mb-3" color="teal lighten-2" dark expand="md">
                    <MDBNavbarBrand>
                        <strong className="white-text">10-tka</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={toggleCollapse}/>
                    <MDBCollapse id="navbarCollapse3" isOpen={collapseIsOpen} navbar>
                        <MDBNavbarNav left className="col-lg-8">
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
                            <MDBNavItem active>
                                <MDBNavLink className="navbar__main_link" to={Urls.timetable.slugEdit}>
                                    <div className="navbar__main_strong">Конструктор расписания</div>
                                </MDBNavLink>
                            </MDBNavItem>
                            {localStorage.getItem("user_role") === "admin" ?
                                <MDBNavItem active>
                                    <MDBNavLink className="navbar__main_link" to={Urls.panel.slugRoot}>
                                        <div className="navbar__main_strong">Пользователи</div>
                                    </MDBNavLink>
                                </MDBNavItem> : null}

                            <MDBNavItem active className="d-md-none">
                                <button type="button"
                                        className="link-logout"
                                        onClick={() => {
                                            Logout(history)
                                        }}>
                                    <div className="navbar__main_strong">Выход</div>
                                </button>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right className=" d-none d-md-block">
                            <div
                                className="d-flex align-items-center justify-content-end flex-nowrap">
                                <MDBNavItem>
                                    <img className="navbar__avatar"
                                         src={localStorage.getItem("user_role") === "admin" ? Admin : Avatar}
                                         alt="oops"/>
                                </MDBNavItem>
                                <MDBNavItem
                                    className="container-fluid flex-column justify-content-center text-center">
                                    <span
                                        className="main__title">{localStorage.getItem("user_role") === "admin" ? "Admin" : "Вася Пупкин"}</span>
                                    <div className="text-black-50">
                                        <Timer size={{sm: true}} onZero={() => {
                                            Logout(history);
                                        }}/>
                                    </div>
                                </MDBNavItem>
                                <MDBNavItem>
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
                    </MDBCollapse>
                </MDBNavbar>
            </div> : null}
        </div>
    );
}

export default Header;

