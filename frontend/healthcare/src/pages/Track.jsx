import { useState } from "react";
import axios from "axios";

export default function Track() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);

  const trackRequest = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/requests/${id}`);
      setResult(res.data);
    } catch (err) {
      alert("Request not found");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Track Request</h2>

        <input
          placeholder="Enter Request ID"
          onChange={(e)=>setId(e.target.value)}
        />

        <button onClick={trackRequest}>Track</button>

        {result && (
          <div className="result">
            <p><b>Status:</b> {result.status}</p>
            <p><b>Department:</b> {result.department}</p>
            <p><b>Priority:</b> {result.priority}</p>
            <p><b>Response:</b> {result.response}</p>
          </div>
        )}
      </div>
    </div>
  );
}