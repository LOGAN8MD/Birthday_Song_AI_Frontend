import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";



const SongVibeSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { person } = location.state || {};

  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");

  const moods = [
    { id: "happy", label: "Happy", img: "/assets/Happy.png" },
    { id: "funny", label: "Funny", img: "/assets/Funny.png" },
    { id: "romantic", label: "Romantic", img: "/assets/Romantic.png" },
    { id: "calm", label: "Calm", img: "/assets/Calm.png" },
    { id: "motivational", label: "Motivational", img: "/assets/Motivational.png" },
  ];

  const genres = [
    { id: "rap", label: "Rap", img: "/assets/Rap.png" },
    { id: "rock", label: "Rock", img: "/assets/Rock.png" },
    { id: "pop", label: "Pop", img: "/assets/Pop.png" },
    { id: "desi", label: "Desi", img: "/assets/Desi.png" },
    { id: "edm", label: "EDM", img: "/assets/EDM.png" },
  ];

  const voices = [
    { id: "male", label: "Male", img: "/assets/Male.png" },
    { id: "female", label: "Female", img: "/assets/Female.png" },
  ];

  const handleProceed = () => {
    if (selectedMood && selectedGenre && selectedVoice) {
        console.log("button is clicked")
      navigate("/input1", {
        state: {
          person,
          vibe: {
            mood: selectedMood,
            genre: selectedGenre,
            voice: selectedVoice,
          },
        },
      });
    } else {
      alert("Please select Mood, Genre, and Singer’s Voice");
    }
  };

  const OptionCard = ({ item, selected, onSelect }) => (
    <button
      onClick={() => onSelect(item.id)}
      className={`flex flex-col items-center transition-transform transform hover:scale-105`}
    >
      <div
        className={`w-15 h-15  rounded-full flex  items-center justify-center mb-2 border-4 ${
          selected === item.id ? "bg-yellow-400 border-yellow-400" : "bg-white border-transparent"
        }`}
      >
        <img src={item.img} alt={item.label} className="w-9 h-9 object-contain" />
      </div>
      <span className="text-sm sm:text-base text-white font-medium">{item.label}</span>
    </button>
  );

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-4">
          <img
            src="/assets/progress bar2.png"
            alt="Progress"
            className="w-48  mx-auto mb-4"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <h2 className="text-1xl sm:text-2xl font-bold text-center text-white mb-6">
            What would you like their song's vibe to be?
          </h2>
        </div>

        {/* Decorative Image */}

        <div className='max-w-md mx-auto'>
          
            <div className="flex justify-center  items-center mb-4 text-center">

                <div className="flex h-52 items-end">
                <img
                  src="/assets/Purple Music Tone.png"
                  alt="Celebrations"
                  className="w-16 h-16  "
              />
            </div>
              <img
                  src="/assets/Headphone.png"
                  alt="Celebrations"
                  className="w-56  mx-auto mb-4"
              />
              <div className="flex h-52 ">
                <img
                    src="/assets/Balloon2.png"
                    alt="Celebrations"
                    className="w-16 h-16 "
                />
              </div>
            </div>

          </div>

        {/* Selection Cards */}
        <div className="max-w-lg mx-auto bg-opacity-90 rounded-3xl shadow-xl p-6 sm:p-8 space-y-8">

          {/* Mood Section */}
          <div className="bg-purple-800/40 rounded-2xl  border-4 border-yellow-400">
          
            <h3 className="text-xl font-semibold mb-4 text-center text-bg-purple-800/40 bg-yellow-400">Mood</h3>
            <div className="flex justify-around flex-wrap gap-4">
              {moods.map((mood) => (
                <OptionCard
                  key={mood.id}
                  item={mood}
                  selected={selectedMood}
                  onSelect={setSelectedMood}
                  
                />
              ))}
            </div>
          </div>

          {/* Genre Section */}
          <div className="bg-purple-800/40 rounded-2xl border-4 border-yellow-400">
            <h3 className="text-xl font-semibold mb-4 text-center text-bg-purple-800/40 bg-yellow-400">Genre</h3>
            <div className="flex justify-around flex-wrap gap-4">
              {genres.map((genre) => (
                <OptionCard
                  key={genre.id}
                  item={genre}
                  selected={selectedGenre}
                  onSelect={setSelectedGenre}
                />
              ))}
            </div>
          </div>

          {/* Singer’s Voice Section */}
          <div className="bg-purple-800/40 rounded-2xl border-4 border-yellow-400">
            <h3 className="text-xl font-semibold mb-4 text-center text-bg-purple-800/40 bg-yellow-400">Singer’s Voice</h3>
            <div className="flex justify-center gap-8">
              {voices.map((voice) => (
                <OptionCard
                  key={voice.id}
                  item={voice}
                  selected={selectedVoice}
                  onSelect={setSelectedVoice}
                />
              ))}
            </div>
          </div>
          
          <div className="flex ">
          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className="bg-yellow-400 text-purple-900 font-bold px-10 py-3 rounded-xl    shadow-md hover:bg-yellow-300 transition block mx-auto"
          >
            Proceed
          </button>
          <img src="/assets/Asset 1.png" alt="Progress" className="w-8  " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongVibeSelector;
