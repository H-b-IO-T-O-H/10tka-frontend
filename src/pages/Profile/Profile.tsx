import React from "react";
import Admin from "@media/admin.jpg"



const Profile = () => {

    const [imgUrl, changeImgUrl] = React.useState(Admin);
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
        <div className="col-2 d-flex flex-column flex-nowrap align-items-center">
            <img id="blah" src={imgUrl} alt="img not loaded" className="post-img"/>
            <input className="post-img" type="file" id="post-img" accept="image/*"
                   onChange={handleImgChange}/>
            <button className="btn-upload-img" type="button" onClick={() => {
                postImgInput?.click()
            }}>
                <span className="btn-title">...</span>
            </button>
        </div>
    )
}

export default Profile;