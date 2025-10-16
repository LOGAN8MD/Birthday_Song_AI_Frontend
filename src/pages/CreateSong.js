import React, {useState, useRef as useReactRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../components/api";

const CreateSong = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const {  audioUrl, person } = state || {};

  
  const audioRef = useReactRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const x = person.gender === "Female" ? "girl" : "boy";

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => setIsPlaying(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `birthday-song-${person?.name || "friend"}.mp3`;
    link.click();
  };

  const handleCreateAgain = () => {
    navigate("/person-details");
  };

  return (
    <div className="min-h-screen pt-20 text-white bg-transparent">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-6 text-center">
          <img
            src="/assets/progress bar5.png"
            alt="Progress"
            className="w-48 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">Your unique song is ready!</h2>
          <p className="text-yellow-300">Enjoy your special tune below 🎶</p>
        </div>

        {/* Center Section: icons + card + icons */}
        <div className="flex justify-center items-center gap-4 sm:gap-6 flex-row relative">
          {/* Left icons (desktop) */}
          <div className="hidden sm:flex flex-col justify-between items-center h-[420px] sm:h-[360px]">
            <img src="/assets/Asset 1.png" alt="Icon" className="w-10" />
            <img src="/assets/Purple Music Tone.png" alt="Tone" className="w-10" />
            <img src="/assets/Balloon.png" alt="Balloon" className="w-10" />
          </div>

          {/* Song Card (Centered) */}
          <div className="relative flex items-center justify-center">
            {/* Left icons (mobile) */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex sm:hidden flex-col justify-between items-center h-[420px] -ml-10">
              <img src="/assets/Asset 1.png" alt="Icon" className="w-8" />
              <img src="/assets/Purple Music Tone.png" alt="Tone" className="w-8" />
              <img src="/assets/Balloon.png" alt="Balloon" className="w-8" />
            </div>

            {/* Card */}
            <div className="max-w-sm sm:max-w-md w-full bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8  text-center min-h-[420px] sm:min-h-[360px] flex flex-col justify-center">
              <h1 className="text-xl font-bold text-yellow-400 mb-4">
                Happy Birthday {person?.name || "Friend"}!
              </h1>

              <img
                src="/assets/Celebrationsbg1.png"
                alt="Celebrations"
                className="w-44 mx-auto mb-4 sm:w-48"
              />

              <p className="text-yellow-200 mb-6">
                It’s your {x}! Let’s give a shoutout to{" "}
                <span className="text-yellow-400 font-semibold">
                  {person?.name || "Friend"}
                </span>
                🎉
              </p>

              <div className="flex justify-center flex-wrap gap-3 mt-4">
                <button
                  onClick={handlePlayPause}
                  className="px-6 py-3 w-[150px] font-bold rounded-full bg-yellow-400 text-purple-900 hover:bg-yellow-300 transition"
                >
                  {isPlaying ? "⏸ Pause Song" : "▶ Play Song"}
                </button>

                <button
                  onClick={handleDownload}
                  className="px-6 py-3 w-[150px] font-bold rounded-full bg-yellow-400 text-purple-900 hover:bg-yellow-300 transition"
                >
                  ⬇ Download
                </button>
              </div>

              <audio
                ref={audioRef}
                src={url+audioUrl}
                onEnded={handleEnded}
                className="hidden"
              />
            </div>

            {/* Right icons (mobile) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex sm:hidden flex-col justify-between items-center h-[420px] -mr-10">
              <img src="/assets/Balloon2.png" alt="Balloon" className="w-8" />
              <img src="/assets/Yellow tone.png" alt="Tone" className="w-5" />
              <img src="/assets/Asset 1.png" alt="Icon" className="w-8" />
            </div>
          </div>

          {/* Right icons (desktop) */}
          <div className="hidden sm:flex flex-col justify-between items-center h-[420px] sm:h-[360px]">
            <img src="/assets/Balloon2.png" alt="Balloon" className="w-10" />
            <img src="/assets/Yellow tone.png" alt="Tone" className="w-5" />
            <img src="/assets/Asset 1.png" alt="Icon" className="w-10" />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mt-10">
          <button className="bg-yellow-400 text-purple-900 font-bold px-10 py-3 rounded-full shadow-md hover:bg-yellow-300 transition">
            🎁 Redeem Gift
          </button>

          <button
            onClick={handleCreateAgain}
            className="bg-yellow-400 text-purple-900 font-bold px-10 py-3 rounded-full shadow-md hover:bg-yellow-300 transition"
          >
            🔁 Create Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSong;