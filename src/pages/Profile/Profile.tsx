import React, { useState, useEffect } from "react";
import "./Profile.scss";
import Admin from "@media/admin.jpg";


const Profile = () => {

    const [imgUrl, changeImgUrl] = useState(Admin);
    const [postImgInput, changePostImgInput] = useState<HTMLInputElement | null>();

    const handleImgChange = () => {
        if (postImgInput && postImgInput.files && postImgInput.files[0]) {
            changeImgUrl(URL.createObjectURL(postImgInput.files[0]));
        }
    };

    useEffect(() => {
        changePostImgInput(document.getElementById("post-img") as HTMLInputElement);
    }, []);

    return (
        <div className="profile container-fluid d-flex flex-row h-100">
            <div className="profile__sidebar col-3 d-flex flex-column flex-nowrap align-items-center">
                <img id="blah" src={imgUrl} alt="img not loaded" className="post-img"/>
                <input className="post-img" type="file" id="post-img" accept="image/*"
                       onChange={handleImgChange}/>
                <button className="btn-upload-img"
                        type="button"
                        onClick={() => {
                            postImgInput?.click()
                        }}>
                    <i className="fas fa-camera"/>
                    <span className="btn-title ml-2">Сменить фото</span>
                </button>
            </div>

            <div className="personal-data">
                <h1 className="personal-data__title mb-4">Личные данные</h1>
                <form className="row">
                    <div className="form-group col-3 pr-2">
                        <label className="personal-data__subtitle" htmlFor="profileNameInput">Имя</label>
                        <input type="text" className="personal-data__form form-control" id="profileNameInput"
                               placeholder="Сергей"/>
                    </div>
                    <div className="form-group col-3 pl-2">
                        <label className="personal-data__subtitle" htmlFor="profileSurnameInput">Фамилия</label>
                        <input type="text" className="personal-data__form form-control" id="profileSurnameInput"
                               placeholder="Галицкий"/>
                    </div>
                </form>

                <form className="row">
                    <div className="col-3 pr-2">
                        <label className="personal-data__subtitle" htmlFor="profileSexInput">Пол</label>
                        <select className="personal-data__form custom-select" id="profileSexInput">
                            <option value="1" selected>Мужской</option>
                            <option value="2">Женский</option>
                        </select>
                    </div>
                    <div className="form-group col-1 pl-2">
                        <label className="personal-data__subtitle" htmlFor="profileGroupInput">Группа</label>
                        <select className="personal-data__form custom-select mr-2" id="profileGroupInput">
                            <option selected>54</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>19</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;