import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import LoadingComponent from "../components/LoadingComponent";
import { url } from "../components/api";

const MAX_GENERATIONS = 3;

const LyricsGenerator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const {
    person,
    vibe,
    versions: initialVersions = {},
    generationCount: initialGenCount = 1,
  } = state || {};
console.log("Person")
  console.log(person)
  console.log("Vibe")
  console.log(vibe)

  const [versions, setVersions] = useState([initialVersions.v1 || ""]);
  const [activeVersion, setActiveVersion] = useState(0);
  const [generationCount, setGenerationCount] = useState(initialGenCount || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialVersions.v1) {
      setError("No lyrics found. Please go back and create the initial lyrics first.");
    }
  }, [initialVersions.v1]);

  const recreateLyrics = async () => {
    if (generationCount >= MAX_GENERATIONS) return;
    setLoading(true);
    setError("");

    try {
      const payload = {
        name: person?.name || "",
        genre: vibe?.genre || "",
        gender: vibe?.voice || "",
      };

      const res = await fetch(`${url}/api/generate-lyrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to generate new lyrics");

      const data = await res.json();
      const newLyrics = data.lyrics;
      if (!newLyrics || typeof newLyrics !== "string")
        throw new Error("Invalid response from server");

      setVersions((prev) => [...prev, newLyrics]);
      setActiveVersion(versions.length);
      setGenerationCount((c) => c + 1);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while recreating lyrics.");
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Create Song logic (Text-to-Speech)
  const createSong = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        name: person?.name || "",
        voice_gender: vibe?.voice || "",
        lyrics: versions[activeVersion],
      };

      console.log(payload)

      const res = await fetch(`${url}/api/generate-audio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to generate audio");

      const data = await res.json();

      // Navigate to CreateSong page
      navigate("/create-song", {
        state: {
          person,
          vibe,
          lyrics: versions[activeVersion],
          audioUrl: data.audioUrl,
        },
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create song. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const recreateDisabled = generationCount >= MAX_GENERATIONS;

  return (
    <div className="min-h-screen pt-16">

       {/* ✅ Show Loading Overlay */}
      {loading && <LoadingComponent text="Generating lyrics..." image="/assets/Desi_.png" />}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <img
            src="/assets/progress bar4.png"
            alt="Progress bar3"
            className="w-48  mx-auto mb-4"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-1xl sm:text-2xl font-bold text-center text-white mb-6">
            Your Song's Lyrics are ready!
          </h2>
        </div>

        <div className="max-w-md mx-auto bg-opacity-90 rounded-3xl shadow-xl p-6 sm:p-8">
          <div className="w-full max-w-2xl">

            <div className="flex justify-center flex-wrap gap-4 mb-4">
              {versions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVersion(idx)}
                  className={`px-4 py-2 rounded-full font-semibold shadow ${
                    activeVersion === idx
                      ? "bg-yellow-400 text-purple-900"
                      : "bg-white text-purple-800"
                  }`}
                >
                  Version {idx + 1}
                </button>
              ))}
            </div>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 h-[460px] overflow-y-auto">
              {loading ? (
                <p className="text-center text-purple-900 text-lg">Generating...</p>
              ) : (
                <pre className="whitespace-pre-wrap text-purple-900 text-lg text-center">
                  {versions[activeVersion] || "No lyrics available."}
                </pre>
              )}
            </div>

            <div className="flex justify-center flex-wrap gap-4">
              <button
                onClick={recreateLyrics}
                disabled={recreateDisabled || loading}
                className={`px-6 py-3 rounded-full font-bold shadow-md transition ${
                  recreateDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-400 text-purple-900 hover:bg-yellow-300"
                }`}
              >
                {loading
                  ? "Generating..."
                  : recreateDisabled
                  ? "Recreate Limit Reached"
                  : "Recreate Lyrics"}
              </button>

              <button
                onClick={createSong}
                className="px-6 py-3 rounded-full font-bold shadow-md bg-yellow-400 text-purple-900 hover:opacity-90"
              >
                Create Song
              </button>
            </div>
          </div>
        </div>
    </div>
    </div>
  );
};

export default LyricsGenerator;
