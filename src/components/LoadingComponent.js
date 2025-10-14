import React from "react";


const LoadingComponent = ({ text = "Please wait...", image = "/assets/Desi_.png" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 max-w-sm w-full">
        <p className="bg-purple-900 rounded-3xl text-white text-lg font-semibold text-center">{text}</p>
        <img src={image} alt="loading" className="w-32 h-32 object-contain" />
      </div>
    </div>
  );
};

export default LoadingComponent;