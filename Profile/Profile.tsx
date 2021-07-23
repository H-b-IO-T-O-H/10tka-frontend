import React from "react";
import Admin from "@media/admin.jpg"
import Student from "@media/student.png"
import "./Profile.scss"
import TableMainInfo from "@components/TableMainInfo";
import TableAcademicPerformance from "@components/TableAcademicPerformance";
import TableWeek from "@components/TableWeek/TableWeek";



const Profile = () => {

    const [imgUrl, changeImgUrl] = React.useState(Student);
    const [postImgInput, changePostImgInput] = React.useState<HTMLInputElement | null>();

    const handleImgChange = () => {
        if (postImgInput && postImgInput.files && postImgInput.files[0]) {
            changeImgUrl(URL.createObjectURL(postImgInput.files[0]));
        }
    };

    React.useEffect(() => {
        changePostImgInput(document.getElementById("post-img") as HTMLInputElement);
    }, []);

    return (
        <div>
            <div className="col-2 d-flex flex-column flex-nowrap align-items-right">
                <div className="photo">
                    <img id="blah" src={imgUrl} alt="img not loaded" className="post-img"/>
                    <input className="post-img" type="file" id="post-img" accept="image/*"
                        onChange={handleImgChange}/>
                    <button className="btn-upload-img" type="button" onClick={() => {
                        postImgInput?.click()
                    }}>
                        <span className="btn-title">...</span>
                    </button>
                    <div className="full__name">
                        <p>FirstName</p>
                        <p>LastName</p>
                        <p>Patronymic</p>
                    </div>
                </div>
            </div>
            <TableMainInfo />
            <TableAcademicPerformance />
            <TableWeek />
        </div>
    )
}

export default Profile;
