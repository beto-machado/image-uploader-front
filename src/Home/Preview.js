import { apiHost } from "./utils";

function ImagePreview(data) {
  return (
    <div className="w-11/12 max-w-screen-sm flex flex-col items-center bg-white rounded-2xl p-3 sm:p-10 shadow-xl space-y-10">
      <div className="flex flex-col items-center space-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 fill-green-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>

        <span className="text-xl sm:text-3xl">Uploaded Successfully!</span>
      </div>
      <img
        className="max-h-96"
        src={`${apiHost()}/${data.image_url}`}
        alt="Upload Preview"
      />

      <div className="flex items-center justify-between w-full sm:bg-gray-100 p-1 rounded-2xl sm:border-2 sm:border-gray-200">
        <span
          id="image-link"
          className="hidden sm:inline-block ml-2"
        >{`${document.location.origin}/${data.slug}`}</span>

        <button
          onClick={(e) => {
            if ("clipboard" in navigator) {
              navigator.clipboard.writeText(
                document.getElementById("image-link").innerText
              );
              e.currentTarget.innerText = "Copied ✅";
            } else {
              alert("Sorry, your browser does not support clipboard copy.");
            }
          }}
          className="text-white bg-blue-500 rounded-xl px-3 py-2 cursor-pointer w-full sm:w-auto"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}

export default ImagePreview;
