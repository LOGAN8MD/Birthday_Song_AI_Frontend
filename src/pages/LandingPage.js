import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-center bg-[#280051] relative transition-all duration-300 hover:bg-opacity-90"
      onClick={() => navigate("/user-details")}
    >
      <div className="flex flex-col items-center justify-center h-full w-full px-4">
        <img
          src="/assets/Celebrationsbg1.png"
          alt="Celebrations"
          className="w-48 sm:w-72 md:w-96 lg:w-[400px] mb-6 drop-shadow-2xl"
        />

        <h2 className="text-white text-base sm:text-xl md:text-2xl mb-3 leading-snug">
          A unique birthday song for everyone!
        </h2>

        <h4 className="text-white text-sm sm:text-lg md:text-xl mb-6 leading-snug">
          इस birthday, पर कुछ अच्छा हो जाए कुछ मीठा हो जाए.
        </h4>

        <p className="text-white text-xs sm:text-sm opacity-80 animate-pulse">
          Tap anywhere to continue
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
