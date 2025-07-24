import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>Sorry, the page you're looking for doesn't exist.</p>
      <button onClick={handleGoHome} style={styles.button}>
        Go to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    textAlign: "center",
    padding: "2rem",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#333",
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#555",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#222",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default NotFoundPage;
