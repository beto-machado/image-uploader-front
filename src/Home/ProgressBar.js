function ProgressBar({ now }) {
  return (
    <div className="w-11/12 sm:w-1/2 flex flex-col p-8 bg-white rounded-lg shadow-lg space-y-5 text-gray-700">
      <span>Uploading...</span>

      <div className="w-full bg-gray-200 rounded-full">
        <div
          style={{ width: `${now}%` }}
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
        >
          {now}%
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
