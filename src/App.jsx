import { useState } from "react";

export default function App() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("https://resume-clarity-checker-backend.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: resumeText
      });

      const data = await response.text();
      setResult(data);

    } catch (error) {
      setResult("Error connecting to server. Make sure backend is running.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>SkillCV</h1>
      <p style={styles.subtitle}>AI Resume Clarity Checker</p>

      <textarea
        placeholder="Paste your resume here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={analyzeResume} style={styles.button}>
        {loading ? "Wait" : "Analyze Resume"}
      </button>

      {result && (
        <div style={styles.resultBox}>
          <h2>AI Feedback</h2>
          <pre style={styles.resultText}>{result}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontSize: "42px",
    fontWeight: "bold",
    color: "#38bdf8"
  },
  subtitle: {
    marginBottom: "20px",
    color: "#cbd5e1"
  },
  textarea: {
    width: "80%",
    maxWidth: "900px",
    height: "200px",
    padding: "15px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    marginBottom: "15px"
  },
  button: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    background: "#38bdf8",
    color: "#0f172a"
  },
  resultBox: {
    marginTop: "30px",
    background: "#020617",
    padding: "20px",
    borderRadius: "12px",
    width: "80%",
    maxWidth: "900px"
  },
  resultText: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.5",
    fontSize: "15px"
  }
};
