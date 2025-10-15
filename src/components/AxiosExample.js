import React, { useState, useEffect } from "react";
import { axiosApiService } from "../services/axiosService";

const AxiosExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataWithAxios = async () => {
    try {
      setLoading(true);
      setError(null);
      // Since we're using jsonplaceholder, we'll make a direct axios call
      // You would use axiosApiService.get('/endpoint') with your real API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?_limit=5"
      );
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataWithAxios();
  }, []);

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h3>Axios Service Example</h3>
      <button onClick={fetchDataWithAxios} disabled={loading}>
        {loading ? "Loading..." : "Refresh Data"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data.length > 0 && (
        <ul
          style={{ textAlign: "left", maxHeight: "200px", overflowY: "auto" }}
        >
          {data.map((comment) => (
            <li key={comment.id} style={{ marginBottom: "10px" }}>
              <strong>{comment.name}</strong>
              <br />
              <small>{comment.email}</small>
              <p>{comment.body.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AxiosExample;
