import React from "react";
import axios from "axios";
import { apiHost } from "./Home/utils";
import Preview from "./Home/Preview";
import ProgressBar from "./Home/ProgressBar";
import Upload from "./upload.svg";
class Home extends React.Component {
  constructor(props) {
    // Wakeup the API 💤
    axios.get(`${apiHost()}/api/uploaders`);

    super(props);

    this.state = {
      image_preview: null,
      progress: null,
      selectedFile: null,
    };
  }

  setSelectedFile(file) {
    let formData = new FormData();
    formData.append("uploader[image]", file);

    axios
      .post(`${apiHost()}/api/uploaders`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (data) => {
          this.setState({
            progress: Math.round((100 * data.loaded) / data.total),
          });
        },
      })
      .then(({ data: { data } }) => {
        this.setState({ progress: null, image_preview: data });
      });
  }

  setImagePreview() {
    const path = window.location.pathname.replace(/^\//, "");

    if (path === "" || this.state.image_preview) {
      return this.state.image_preview;
    } else {
      axios
        .get(`${apiHost()}/api/uploaders/${path}`)
        .then(({ data: { data } }) => {
          this.setState({ progress: null, image_preview: data });
        });
    }
  }

  render() {
    const image_preview = this.setImagePreview();
    return (
      (image_preview && <Preview {...image_preview} />) ||
      (this.state.progress && <ProgressBar now={this.state.progress} />) || (
        <div className="flex flex-col items-center bg-white rounded-lg p-8 space-y-6 shadow-lg">
          <header className="w-full text-center space-y-3">
            <h2 className="text-gray-700 text-2xl">Upload your image</h2>
            <h3 className="text-gray-500 text-sm">
              File should be Jpeg, Png...
            </h3>
          </header>

          <div
            onDrop={(e) => {
              const valid_inputs = ["image/jpeg", "image/jpg", "image/png"];
              e.preventDefault();
              const upload = e.dataTransfer.files[0];

              if (valid_inputs.includes(upload.type)) {
                this.setSelectedFile(upload);
              } else {
                // eslint-disable-next-line no-unused-vars
                const [_, extension] = upload.type.split("/");
                document.getElementById(
                  "drag-text"
                ).innerText = `Extension ${extension} is not valid!`;
              }
            }}
            onDragOver={(e) => {
              e.stopPropagation();
              e.preventDefault();
              document.getElementById("drag-text").innerText =
                "Release to upload your image";
            }}
            onDragLeave={(_) => {
              const dragText = document.getElementById("drag-text");
              dragText.innerText = dragText.dataset.defaultText;
            }}
            className="flex flex-col items-center space-y-6 w-full bg-gray-100 p-5 rounded-lg border-2 border-blue-300 border-dashed"
          >
            <img className="w-48" src={Upload} alt="Upload icon" />

            <span
              id="drag-text"
              data-default-text="Drag & Drop your image here"
              className="text-gray-500"
            >
              Drag & Drop your image here
            </span>
          </div>

          <span className="text-gray-500">Or</span>

          <label
            htmlFor="imageUpload"
            className="text-white bg-blue-500 rounded-xl px-3 py-2 cursor-pointer"
          >
            Choose a file
          </label>

          <input
            className="hidden"
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => {
              this.setState({ progress: 0 });
              this.setSelectedFile(e.target.files[0]);
            }}
          />
        </div>
      )
    );
  }
}
export default Home;
