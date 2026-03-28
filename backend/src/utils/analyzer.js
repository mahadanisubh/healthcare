export const analyzeProblem = (problem) => {
  const text = problem.toLowerCase();

  let type = "General Issue";
  let priority = "LOW";
  let department = "Support Team";
  let response = "Our team will review your request.";

  // medical
  if (
    text.includes("blood") ||
    text.includes("pain") ||
    text.includes("accident") ||
    text.includes("patient") ||
    text.includes("hospital") ||
    text.includes("fever") ||
    text.includes("medical") ||
    text.includes("health")
  ) {
    type = "Medical Emergency";
    priority = "HIGH";
    department = "Emergency Response Team";
    response = "Contact nearest hospital and donor network immediately.";
  }

  // food
  else if (text.includes("food") || text.includes("hungry")) {
    type = "Food Support";
    priority = "MEDIUM";
    department = "Food Distribution Team";
    response = "Food assistance will be arranged shortly.";
  }

  // volunteer
  else if (text.includes("volunteer") || text.includes("help")) {
    type = "Volunteer Assistance";
    priority = "LOW";
    department = "Volunteer Team";
    response = "A volunteer will be assigned to assist you.";
  }

  return {
    type,
    priority,
    department,
    response,
  };
};
