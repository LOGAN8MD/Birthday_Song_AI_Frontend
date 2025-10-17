import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent"
import { url } from "../components/api";


const Input1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { person, vibe } = location.state || {};

  const [formData, setFormData] = useState({
    pet_name: "",
    angry: "",
    funniest: "",
    smile: "",
    movie: "",
    sport: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pet_name.trim()) newErrors.pet_name = "Pet name is required";
    if (!formData.angry.trim()) newErrors.angry = "Required";
    if (!formData.funniest.trim()) newErrors.funniest = "Required";
    if (!formData.smile.trim()) newErrors.smile = "Required";
    if (!formData.movie.trim()) newErrors.movie = "Required";
    if (!formData.sport.trim()) newErrors.sport = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Make API call on Proceed and navigate with received single-lyrics string
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validateForm()) return;

    setLoading(true);
   
    try {
      const payload = {
        // include person and vibe info the backend expects
        name: person?.name || "",
        genre: vibe?.genre || "",
        gender: person?.gender || "",
        // pass the additional inputs so the backend can use them in prompt if desired
        extras: formData,
      };

      const res = await fetch(`${url}/api/generate-lyrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => null);
        throw new Error(errText || "Failed to generate lyrics");
      }

      const data = await res.json();
      const lyrics = data.lyrics;
      if (!lyrics || typeof lyrics !== "string") {
        throw new Error("Invalid response from server");
      }

      // Navigate to LyricsGenerator passing version1 lyrics and generationCount=1
      navigate("/lyrics-generator", {
        state: {
          person,
          vibe,
          versions: { v1: lyrics }, // v1 present initially
          generationCount: 1, // initial generation counts as first
        },
      });
    } catch (err) {
      console.error("Generate lyrics error:", err);
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen pt-16">

      {/* ✅ Show Loading Overlay */}
      {loading && <LoadingComponent text="Generating lyrics..." image="/assets/Desi_.png" />}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <img
            src="/assets/progress bar3.png"
            alt="Progress bar3"
            className="w-48  mx-auto mb-4"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-1xl sm:text-2xl font-bold text-center text-white mb-6">
            Tell us little more about them...
          </h2>
        </div>

        <div className='max-w-md mx-auto'>
      
      <div className="flex justify-center  items-center mb-4 text-center">

        <div className="flex h-50 items-end">
          <img
            src="/assets/Asset 1.png"
            alt="Celebrations"
            className="w-16 h-16  "
          />
       </div>
        <img
            src="/assets/Message.png"
            alt="Celebrations"
            className="w-56  mx-auto mb-4"
        />
        <div className="flex  ">
            <img
                src="/assets/Balloon.png"
                alt="Celebrations"
                className="w-16 h-16 "
            />
          </div>
      </div>

    </div>

        <div className="max-w-md mx-auto bg-opacity-90 rounded-3xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-bold text-center text-white  mb-2">
                What's your pet name for them?
              </label>
              <input
                type="text"
                name="pet_name"
                value={formData.pet_name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border font-bold text-purple-900 rounded-2xl focus:ring-2 focus:border-transparent transition-all ${
                  errors.pet_name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. babe, champ"
              />
              {errors.pet_name && (
                <p className="text-red-500 text-sm mt-1">{errors.pet_name}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-bold text-center mb-2">
                What makes them angry?
              </label>
              <input
                type="text"
                name="angry"
                value={formData.angry}
                onChange={handleChange}
                className={`w-full px-4 py-3 font-bold text-purple-900 border rounded-2xl focus:ring-2 focus:border-transparent transition-all ${
                  errors.angry ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. late arrivals"
              />
              {errors.angry && (
                <p className="text-red-500 text-sm mt-1">{errors.angry}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-bold text-center mb-2">
                What is the funniest thing they do?
              </label>
              <input
                type="text"
                name="funniest"
                value={formData.funniest}
                onChange={handleChange}
                className={`w-full px-4 py-3 font-bold text-purple-900 border rounded-2xl focus:ring-2 focus:border-transparent transition-all ${
                  errors.funniest ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. dance moves"
              />
              {errors.funniest && (
                <p className="text-red-500 text-sm mt-1">{errors.funniest}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-bold text-center mb-2">
                What makes them smile?
              </label>
              <input
                type="text"
                name="smile"
                value={formData.smile}
                onChange={handleChange}
                className={`w-full px-4 py-3 border  font-bold text-purple-900 rounded-2xl focus:ring-2 focus:border-transparent transition-all ${
                  errors.smile ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. warm hugs"
              />
              {errors.smile && (
                <p className="text-red-500 text-sm mt-1">{errors.smile}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-bold text-center mb-2">
                What is their favourite movie?
              </label>
              <input
                type="text"
                name="movie"
                value={formData.movie}
                onChange={handleChange}
                className={`w-full px-4 py-3 border font-bold text-purple-900 rounded-2xl focus:ring-2 focus:border-transparent transition-all ${
                  errors.movie ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. Inception"
              />
              {errors.movie && (
                <p className="text-red-500 text-sm mt-1">{errors.movie}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-bold text-center mb-2">
                Their favourite sport.
              </label>
              <input
                type="text"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className={`w-full px-4 py-3 border font-bold text-purple-900 rounded-2xl focus:ring-2 focus:border-transparent transition-all ${
                  errors.sport ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. cricket"
              />
              {errors.sport && (
                <p className="text-red-500 text-sm mt-1">{errors.sport}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                } bg-yellow-400 text-purple-900 font-bold px-10 py-3 rounded-xl shadow-md hover:bg-yellow-300 transition`}
              >
                {loading ? "Generating..." : "Proceed"}
              </button>
            </div>

            {apiError && (
              <p className="text-red-500 text-center text-sm">{apiError}</p>
            )}
          </form>

         
        </div>
      </div>
    </div>
  );
};

export default Input1;
