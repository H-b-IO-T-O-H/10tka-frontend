import React, {FormEvent} from "react";
import {MDBBtn, MDBInput} from "mdbreact";
import {Editor} from "@tinymce/tinymce-react";
import PulseCheckBox from "@components/PulseCheckBox";
import {TAG_EDUCATIONAL, TAG_GENERAL, TAG_IMPORTANT} from "@config/config";
import {useHistory} from "react-router-dom";
import {getTinymce} from "@tinymce/tinymce-react/lib/es2015/main/ts/TinyMCE";
import Admin from "@media/admin.jpg"

import "./createPost.scss";

type PostInfo = {
    title: string,
    postImgUrl: string,
    tag: string,
    allowComments: boolean,
    content: string,
    buttonText: string
}

const CreatePost = () => {
    const [postInfo, changePostInfo] = React.useState<PostInfo>({
        title: "",
        postImgUrl: Admin,
        tag: "",
        allowComments: false,
        content: "",
        buttonText: "Предпросмотр"
    })
    const [tagContent, changeTagContent] = React.useState("")
    const [tag, changeTag] = React.useState<HTMLElement | null>()
    const [postImgInput, changePostImgInput] = React.useState<HTMLInputElement | null>();
    const [isTextChanged, changeTextFlag] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        changeTag(document.getElementById("post-tag"));
        changePostImgInput(document.getElementById("post-img") as HTMLInputElement);
    }, []);

    const handleTitleChange = React.useCallback((e: FormEvent<HTMLInputElement>) => {
        const oldInfo = postInfo;
        oldInfo.title = (e.target as HTMLInputElement).value;
        changePostInfo(oldInfo);
    }, [postInfo]);

    const handleEditorChange = React.useCallback((content: string, editor: any) => {
        const oldInfo = {...postInfo};
        oldInfo.content = content;
        oldInfo.buttonText = "Предпросмотр";
        changeTextFlag(false);
        changePostInfo(oldInfo);
    }, [postInfo]);

    const handleButtonChange = React.useCallback(() => {
        if (!isTextChanged) {
            getTinymce()?.activeEditor.execCommand("mcePreview");
            //tinymce.get("post-create-editor").execCommand("mcePreview");
        } else {
            console.log(postInfo);
            //history.push("/posts");
        }
        changeTextFlag(true);
        const oldInfo = {...postInfo};
        oldInfo.buttonText = "Опубликовать";
        changePostInfo(oldInfo);
        //TEMP.posts.push(Parser(postInfo.content) as JSX.Element);
        //console.log(TEMP);
        //this.setState({buttonText: "Опубликовать"});
    }, [isTextChanged, postInfo]);

    const handleSelectChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!tag) {
            return;
        }
        switch (e.target.value) {
            case "1":
                tag.style.color = "#34a8bb";
                break;
            case "2":
                tag.style.color = "#e86262";
                break;
            default:
                tag.style.color = "#59b759";
        }
    }, [tag]);

    const handleImgChange = () => {
        const oldPost = {...postInfo};
        if (postImgInput && postImgInput.files && postImgInput.files[0]) {
            oldPost.postImgUrl = URL.createObjectURL(postImgInput.files[0]);
            changePostInfo(oldPost);
            console.log(postInfo)
        }
    };

    const handleCheckBoxChange = React.useCallback((isChecked: boolean) => {
        const oldInfo = {...postInfo};
        oldInfo.allowComments = isChecked;
        changePostInfo(oldInfo);
    }, [postInfo])

    const filePickerCb = React.useCallback((callback: Function, value: any, meta: Record<string, any>) => {
        if (meta.filetype === 'image') {
            let input = document.createElement("input");
            let file: File;
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = () => {
                if (input.files) {
                    file = input.files[0];
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    callback(e.target?.result, {
                        alt: file.name
                    });
                }
                reader.readAsDataURL(file);
            };
            input.click();
        }
    }, []);

    return (
        <div>
            <div
                className="post-card container-fluid d-flex h-100 justify-content-center align-items-center col-xl-10">
                <form className="post-create-card container">
                    <p className="h5 text-center mb-4">Создние поста</p>
                    <div className="d-flex flex-row">
                        <div className="col-2 d-flex flex-column flex-nowrap align-items-center">
                            <img id="blah" src={postInfo.postImgUrl} alt="img not loaded" className="post-img"/>
                            {/*<input className="post-img" type="file" id="post-img" accept="image/*"*/}
                            {/*       onChange={handleImgChange}/>*/}
                            {/*<button className="btn-upload-img" type="button" onClick={() => {*/}
                            {/*    postImgInput?.click()*/}
                            {/*}}>*/}
                            {/*    <span className="btn-title">...</span>*/}
                            {/*</button>*/}
                        </div>
                        <div className="col-10">
                            <div className="grey-text">
                                <MDBInput label="Заголовок" icon="heading" group type="text"
                                          onChange={handleTitleChange}/>
                                <div className="d-flex flex-row">
                                    <i id="post-tag" className="fa fa-tag fa-lg position-absolute"/>
                                    <select className="post-tag" defaultValue="0" onChange={handleSelectChange}>
                                        <option value="0" hidden disabled>ТЭГ</option>
                                        <option value="1">{TAG_GENERAL}</option>
                                        <option value="2">{TAG_IMPORTANT}</option>
                                        <option value="3">{TAG_EDUCATIONAL}</option>
                                    </select>
                                </div>
                                <div className="d-flex flex-row">
                                    <i className="fa fa-pencil-alt fa-lg position-absolute"/>
                                    <div className="editor-with-tag">
                                        <Editor
                                            id="post-create-editor"
                                            apiKey="i2ukwtg8ixnvv92anoj0cspm5r696rucv5oxdaten85488x4"
                                            init={{
                                                language: "ru",
                                                min_height: 350,
                                                height: 500,
                                                max_height: 750,
                                                plugins: [
                                                    "advlist autolink lists link image charmap print preview anchor",
                                                    "searchreplace visualblocks code fullscreen ",
                                                    "insertdatetime media table paste code help wordcount emoticons hr imagetools", //TODO: check imagetools proxy
                                                ],
                                                toolbar:
                                                    "undo redo | image hr| formatselect | bold italic forecolor backcolor | \
                                                    alignleft aligncenter alignright alignjustify | \
                                                    numlist bullist outdent indent | removeformat",
                                                style_formats_merge: true,
                                                style_formats: [
                                                    {
                                                        title: 'Image Top', selector: 'img', styles: {
                                                            'vertical-align': 'top'
                                                        }
                                                    },
                                                    {
                                                        title: 'Image Middle', selector: 'img', styles: {
                                                            'vertical-align': 'middle'
                                                        }
                                                    },
                                                    {
                                                        title: 'Image Bottom', selector: 'img', styles: {
                                                            'vertical-align': 'bottom'
                                                        }
                                                    },
                                                ],
                                                insertdatetime_formats: ['%H:%M:%S', '%d-%m-%Y', '%I:%M:%S %p'],
                                                image_advtab: true,
                                                fullscreen_native: true,
                                                automatic_uploads: true,
                                                image_description: false,
                                                file_picker_types: "image",
                                                paste_webkit_styles: 'color font-size',
                                                paste_retain_style_properties: 'color font-size',
                                                paste_data_images: false,
                                                paste_as_text: false,
                                                file_picker_callback: filePickerCb,
                                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                                            }}
                                            value={postInfo.content}
                                            onEditorChange={handleEditorChange}
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <PulseCheckBox description="Разрешить комментарии" isChecked={handleCheckBoxChange}/>
                                </div>
                            </div>
                            <div className="text-center">
                                <MDBBtn outline color="cyan" onClick={handleButtonChange}>
                                    <span>{postInfo.buttonText}</span>
                                </MDBBtn>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;