import React, { useState } from "react";

const ApiMethodsExample = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = "https://jsonplaceholder.typicode.com";

  const makeApiCall = async (method, endpoint, data = null) => {
    setLoading(true);
    setResult(null);

    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${baseUrl}${endpoint}`, options);
      const responseData = await response.json();

      setResult({
        method,
        status: response.status,
        data: responseData,
      });
    } catch (error) {
      setResult({
        method,
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ddd" }}>
      <h3>HTTP Methods Examples</h3>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => makeApiCall("GET", "/posts/1")}
          style={{ margin: "5px", padding: "8px 12px" }}
          disabled={loading}
        >
          GET Post
        </button>

        <button
          onClick={() =>
            makeApiCall("POST", "/posts", {
              title: "New Post",
              body: "This is a new post",
              userId: 1,
            })
          }
          style={{ margin: "5px", padding: "8px 12px" }}
          disabled={loading}
        >
          POST New Post
        </button>

        <button
          onClick={() =>
            makeApiCall("PUT", "/posts/1", {
              id: 1,
              title: "Updated Post",
              body: "This post has been updated",
              userId: 1,
            })
          }
          style={{ margin: "5px", padding: "8px 12px" }}
          disabled={loading}
        >
          PUT Update Post
        </button>

        <button
          onClick={() => makeApiCall("DELETE", "/posts/1")}
          style={{ margin: "5px", padding: "8px 12px" }}
          disabled={loading}
        >
          DELETE Post
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {result && (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "4px",
            textAlign: "left",
          }}
        >
          <h4>Result:</h4>
          <p>
            <strong>Method:</strong> {result.method}
          </p>
          {result.status && (
            <p>
              <strong>Status:</strong> {result.status}
            </p>
          )}
          {result.error && (
            <p style={{ color: "red" }}>
              <strong>Error:</strong> {result.error}
            </p>
          )}
          {result.data && (
            <div>
              <strong>Response Data:</strong>
              <pre
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "4px",
                  overflow: "auto",
                  maxHeight: "200px",
                }}
              >
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiMethodsExample;
