import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { toPng } from "html-to-image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [currentWish, setCurrentWish] = useState("");
  const [styleIndex, setStyleIndex] = useState(0);
  const [countdown, setCountdown] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Array of card styles
  const cardStyles = [
    {
      backgroundImage: "linear-gradient(135deg, #FF7E5F, #FEB47B)",
      color: "#fff",
    },
    {
      backgroundImage: "linear-gradient(135deg, #6a11cb, #2575fc)",
      color: "#fff",
    },
    {
      backgroundImage: "linear-gradient(135deg, #00c6ff, #0072ff)",
      color: "#fff",
    },
    {
      backgroundImage: "linear-gradient(135deg, #f1c40f, #e67e22)",
      color: "#fff",
    },
  ];

  // Array of sentences
  const sentences = [
    "यह साल आपके जीवन में अपार खुशियां और सफलता लेकर आए।",
    "आपके सभी सपने साकार हों और जीवन में नई ऊंचाइयों को छूएं।",
    "यह नया साल आपके और आपके परिवार के लिए समृद्धि और सुख लेकर आए।",
    "आपका हर दिन नई ऊर्जा और प्रेरणा से भरा हो।",
  ];

  // Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newYear = new Date("January 1, 2025 00:00:00");
      const diff = newYear - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "सुप्रभात! आपका दिन शुभ हो।";
    if (hour < 18) return "नमस्कार! यह दोपहर अद्भुत हो।";
    return "शुभ संध्या! यह शाम खुशियों से भरी हो।";
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setCurrentWish(name); // Set the new name
      setStyleIndex((prevIndex) => (prevIndex + 1) % cardStyles.length); // Change card style and sentence
      setShowConfetti(true); // Trigger confetti
      setTimeout(() => setShowConfetti(false), 3000); // Stop confetti after 3 seconds
      setName(""); // Clear input field
    }
  };

  const downloadCard = () => {
    const card = document.getElementById("generated-card");
    toPng(card).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "NewYearCard.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div
      className="container mt-5 text-center bg-light p-4 rounded shadow-lg"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e0c3fc, #8ec5fc)",
      }}
    >
      <h1 className="mb-4 text-warning">🎉 Happy New Year 2025! 🎉</h1>
      <p className="text-muted">{getGreeting()}</p>
      <p
        className="text-warning"
        style={{
          background: "linear-gradient(90deg, #FF5F6D, #FFC371)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        ⏳ New Year Countdown: {countdown}
      </p>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="अपना नाम दर्ज करें"
            value={name}
            onChange={handleInputChange}
            style={{
              borderRadius: "25px",
              padding: "15px",
              fontSize: "18px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
          <button
            type="submit"
            className="btn btn-lg btn-success"
            style={{
              borderRadius: "25px",
              padding: "10px 20px",
              fontSize: "18px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            Generate Card
          </button>
        </div>
      </form>

      {currentWish && (
        <div
          id="generated-card"
          className="card mx-auto p-4 fade-in shadow-lg"
          style={{
            ...cardStyles[styleIndex],
            borderRadius: "25px",
            maxWidth: "100%",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2 className="card-title text-white">🎊 नया साल मुबारक हो! 🎊</h2>
          <p className="card-text text-white">
            <strong>{currentWish}</strong>, {sentences[styleIndex]}
          </p>
          <p className="text-muted mt-3">-- मनोज की तरफ से 💖</p>
        </div>
      )}

      {currentWish && (
        <button onClick={downloadCard} className="btn btn-warning mt-3">
          Download Card
        </button>
      )}

      {showConfetti && <Confetti />}
    </div>
  );
}

export default App;
