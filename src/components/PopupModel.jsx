import React from "react";

function PopupModal({ title, message, buttons }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>

        <div className="flex flex-col gap-2">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className={`py-2 rounded-md ${
                btn.primary
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "border border-blue-500 text-blue-500 hover:bg-blue-50"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopupModal;
