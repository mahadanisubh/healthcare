import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await axios.post(
      "https://healthcare-0rpi.onrender.com/api/requests/analyze",
      data,
    );
    setResult(res.data);
  };

  return (
    <div className="container">
        <h1> Health Care Support Sytem</h1>
        <br />
      <div
        style={{
          background: "#9cb7d1",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      >
        <p>
          <b> How to describe your problem: </b>
        </p>
        <ul style={{ paddingLeft: "18px" }}>
          <li>
            Mention your issue clearly (e.g., fever, injury, food shortage)
          </li>
          <li>
            Include urgency words like <b>urgent</b>, <b>emergency</b> if
            applicable
          </li>
          <li>
            Specify need: medical help, food support, volunteer assistance
          </li>
          <li>Avoid very short or unclear descriptions</li>
        </ul>
      </div>
      <div className="card">
        <h2>Health Support Request</h2>

        <input
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          placeholder="Phone"
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />

        <textarea
          placeholder="Describe your problem"
          onChange={(e) => setData({ ...data, problem: e.target.value })}
        />

        <button onClick={handleSubmit}>Submit</button>

        {result && (
          <div className="result">
            <p>
              <b>Request ID:</b> {result.requestId} (Copy This)
            </p>
            <p>
              <b>Type:</b> {result.type}
            </p>
            <p>
              <b>Priority:</b> {result.priority}
            </p>
            <p>
              <b>Department:</b> {result.department}
            </p>
            <p>
              <b>Status:</b> {result.status}
            </p>
            <p>
              <b>Response:</b> {result.response}
            </p>
          </div>
        )}
        <a href="/track">Track your request</a>
      </div>
    </div>
  );
}
