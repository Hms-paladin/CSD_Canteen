/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./UploadComponent.css";


class UploadComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileName: "",
            error: "",
            imageData: []
        }
    }
    uploadFile = (e) => {
        if (e.target.files && e.target.files[0].type == "video/mp4") {
            alert("video format not supported")
        }
        if (e.target.files.length !== 0 && e.target.files[0].type !== "video/mp4") {
            this.setState({ fileName: e.target.files[0].name, imageData: e.target.files[0] })
        }
    }
    uploadDocument = () => {
        this.props.getFileName && this.props.getFileName(this.state.fileName, this.state.imageData)
        this.setState({ fileName: "" })
    }
    getInstructionFileName = (data) => {
        this.setState({ fileName: data })
    }
    componentWillReceiveProps(props) {
        if (props.value !== "") {
            this.setState({ fileName: props.value })
        }
    }

    render() {
        return (
            <div>
                <label className="label">{this.props.title && this.props.title}</label>
                <div className="upload__container_advertise-upload drop_doc_upload referal_rowone">
                    <input type="text" value={this.state.fileName} className="html__input-box" placeholder="Upload Document or Image" onClick={() => document.getElementById("fileupload").click()} />
                    <div className="upload__container--btn">
                        <img class="file_icon" src={this.props.icon && this.props.icon} />
                        <button className="button_browse-icon upload__pics--btn" onClick={this.uploadDocument}> Upload </button>
                    </div>
                    <input type="file" id={"fileupload"} onChange={(e) => this.uploadFile(e)} className="hideFile" onClick={(e) => e.currentTarget.value = null} accept={this.props.accept && this.props.accept} />
                </div>
            </div>
        )
    }
}


export default UploadComponent;