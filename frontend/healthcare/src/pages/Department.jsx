import { useState } from "react";
import axios from "axios";

export default function Department() {
  const [dept, setDept] = useState("");
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    if (!dept) return alert("Select department first");

    const res = await axios.get(
      `https://healthcare-0rpi.onrender.com/api/requests/department/${dept}`
    );

    setRequests(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `https://healthcare-0rpi.onrender.com/api/requests/${id}/status`,
      { status }
    );
    fetchRequests();
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Department Panel</h2>

        <select onChange={(e) => setDept(e.target.value)}>
          <option value="">Select Department</option>
          <option value="medical">Medical</option>
          <option value="food">Food</option>
          <option value="volunteer">Volunteer</option>
        </select>

        <button onClick={fetchRequests}>Load Requests</button>
      </div>

      {requests.map((r) => (
        <div className="request-card" key={r.requestId}>
          <p><b>Name:</b> {r.name}</p>
          <p><b>Phone:</b> {r.phone}</p>
          <p><b>Problem:</b> {r.problem}</p>

          <p className={
            r.status === "Pending"
              ? "status-pending"
              : r.status === "In Progress"
              ? "status-progress"
              : "status-completed"
          }>
            Status: {r.status}
          </p>

          <button onClick={() => updateStatus(r.requestId, "In Progress")}>
            Start
          </button>

          <button onClick={() => updateStatus(r.requestId, "Completed")}>
            Complete
          </button>
        </div>
      ))}
    </div>
  );
}