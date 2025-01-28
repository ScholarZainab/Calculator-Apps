// Get references to the HTML elements
const calculateBtn = document.getElementById("calculateBtn");
const graduationDateEl = document.getElementById("graduationDate");
const resultEl = document.getElementById("result");

// Function to calculate graduation duration
function calculateGraduationDuration() {
  const graduationDateValue = graduationDateEl.value;

  if (graduationDateValue === "") {
    alert("Please enter your graduation date!");
    return;
  }

  const graduationDate = new Date(graduationDateValue);
  const currentDate = new Date();

  if (graduationDate > currentDate) {
    alert("Graduation date cannot be in the future!");
    return;
  }

  const { years, months, days } = getDuration(graduationDate, currentDate);

  resultEl.innerText = `It has been ${years} ${years > 1 ? "years" : "year"}, ${months} ${months > 1 ? "months" : "month"}, and ${days} ${days > 1 ? "days" : "day"} since your graduation.`;

  // Animate the result
  resultEl.classList.remove("hidden");
  resultEl.classList.add("visible");
}

// Helper function to calculate years, months, and days
function getDuration(startDate, currentDate) {
  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();
  let days = currentDate.getDate() - startDate.getDate();

  // Adjust for incomplete months
  if (days < 0) {
    months--;
    // Get the number of days in the previous month
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += previousMonth.getDate(); // Add the days of the previous month
  }

  // Adjust for incomplete years
  if (months < 0) {
    years--;
    months += 12; // Add 12 months
  }

  return { years, months, days };
}

// Attach the calculate function to the button
calculateBtn.addEventListener("click", calculateGraduationDuration);
