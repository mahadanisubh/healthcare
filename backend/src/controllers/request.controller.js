import { analyzeProblem } from "../utils/analyzer.js";
import fs from "fs";
import path from "path";

const filePath = path.resolve("requests.json");

const readRequests = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

const writeRequests = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const analyzeRequest = (req, res) => {
  try {
    const { name, phone, problem } = req.body;

    if (!name || !phone || !problem) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const requestId = "REQ" + Date.now();

    const analysis = analyzeProblem(problem);

    const newRequest = {
      requestId,
      name,
      phone,
      problem,
      ...analysis,
      status: "Pending",
    };

    const requests = readRequests();
    requests.push(newRequest);
    writeRequests(requests);

    res.json(newRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRequestStatus = (req, res) => {
  const { id } = req.params;

  const requests = readRequests();

  const request = requests.find((r) => r.requestId === id);

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  res.json(request);
};

export const getDepartmentRequests = (req, res) => {
  const { name } = req.params;

  const requests = readRequests();

  let mappedDepartment = "";

  if (name === "medical") {
    mappedDepartment = "Emergency Response Team";
  } else if (name === "food") {
    mappedDepartment = "Food Distribution Team";
  } else if (name === "volunteer") {
    mappedDepartment = "Volunteer Team";
  }

  const filtered = requests.filter(
    (r) => r.department === mappedDepartment
  );

  res.json(filtered);
};

export const updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const requests = readRequests();

  const request = requests.find((r) => r.requestId === id);

  if (!request) {
    return res.status(404).json({ message: "Not found" });
  }

  request.status = status;

  writeRequests(requests);

  res.json({
    message: "Status updated",
    request,
  });
};