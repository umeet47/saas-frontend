import React from "react";
import { useApi } from "../hooks/useApi";

const SimpleApiExample = () => {
  // Using your custom hook to fetch data from a public API
  const { data, loading, error } = useApi(
    "https://ats-test.vedastudios.com.np/origin"
  );

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>API Response Example</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>API Response Example</h2>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>API Response Example</h2>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3>Response Data:</h3>
        <pre
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "14px",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      {data && (
        <div style={{ marginTop: "20px" }}>
          <h3>Parsed Data:</h3>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <p>
              <strong>ID:</strong> {data.id}
            </p>
            <p>
              <strong>Title:</strong> {data.title}
            </p>
            <p>
              <strong>Body:</strong> {data.body}
            </p>
            <p>
              <strong>User ID:</strong> {data.userId}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleApiExample;
