const calculateBtn = document.getElementById("calculateBtn");
const licenseNameEl = document.getElementById("licenseName");
const issueDateEl = document.getElementById("issueDate");
const renewalPeriodEl = document.getElementById("renewalPeriod");
const timeToRenewEl = document.getElementById("timeToRenew");
const daysCountEl = document.getElementById("daysCount");
const hoursCountEl = document.getElementById("hoursCount");
const minutesCountEl = document.getElementById("minutesCount");
const secondsCountEl = document.getElementById("secondsCount");
const licenseNameDisplayEl = document.getElementById("licenseNameDisplay");
const issueDateDisplayEl = document.getElementById("issueDateDisplay");
const renewalDateDisplayEl = document.getElementById("renewalDateDisplay");
const renewalInfoDiv = document.getElementById("renewalInfo");

function calculateRenewalTime() {
  const licenseName = licenseNameEl.value;
  const issueDateValue = issueDateEl.value;
  const renewalPeriod = parseInt(renewalPeriodEl.value);

  if (issueDateValue === "" || licenseName === "") {
    alert("Please enter both License/Certification Name and Issue Date.");
    return;
  }

  const issueDate = new Date(issueDateValue);
  const currentDate = new Date();

  // Calculate next renewal date
  const nextRenewalDate = new Date(issueDate);
  nextRenewalDate.setFullYear(issueDate.getFullYear() + renewalPeriod);

  // Calculate time to next renewal
  let timeToNextRenewal = nextRenewalDate - currentDate;

  if (timeToNextRenewal <= 0) {
    timeToRenewEl.textContent = "Renewal is overdue!";
  } else {
    timeToRenewEl.textContent = `Time to Renew: `;

    const timer = setInterval(() => {
      timeToNextRenewal -= 1000; // Decrement by 1 second

      const days = Math.floor(timeToNextRenewal / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeToNextRenewal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeToNextRenewal % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeToNextRenewal % (1000 * 60)) / 1000);

      daysCountEl.textContent = days;
      hoursCountEl.textContent = hours.toString().padStart(2, '0');
      minutesCountEl.textContent = minutes.toString().padStart(2, '0');
      secondsCountEl.textContent = seconds.toString().padStart(2, '0');

      if (timeToNextRenewal <= 0) {
        clearInterval(timer);
        timeToRenewEl.textContent = "Renewal is overdue!"; 
      }
    }, 1000); // Update every second
  }

  licenseNameDisplayEl.textContent = `License/Certification Name: ${licenseName}`;
  issueDateDisplayEl.textContent = `Issue Date: ${issueDate.toLocaleDateString()}`;
  renewalDateDisplayEl.textContent = `Next Renewal Date: ${nextRenewalDate.toLocaleDateString()}`;

  renewalInfoDiv.style.display = "block";
}

calculateBtn.addEventListener("click", calculateRenewalTime);

// (Browser Notifications - Basic)
if (Notification.permission === "granted" && timeToNextRenewal <= (1000 * 60 * 60 * 24 * 30)) { 
  // Notify 30 days before renewal
  new Notification("License/Certification Renewal Reminder", {
    body: `Your ${licenseName} renewal is approaching!`
  });
} else if (Notification.permission !== "granted") {
  Notification.requestPermission(); 
}

// Store license/certification data in localStorage
function storeLicenseData() {
  const licenseData = {
    licenseName: licenseNameEl.value,
    issueDate: issueDateEl.value,
    renewalPeriod: parseInt(renewalPeriodEl.value)
  };
  localStorage.setItem("licenseData", JSON.stringify(licenseData));
}

calculateBtn.addEventListener("click", () => {
  calculateRenewalTime();
  storeLicenseData();
});

// Retrieve and display stored data on page load
window.onload = () => {
  const storedData = localStorage.getItem("licenseData");
  if (storedData) {
    const data = JSON.parse(storedData);
    licenseNameEl.value = data.licenseName;
    issueDateEl.value = data.issueDate;
    renewalPeriodEl.value = data.renewalPeriod;
    calculateRenewalTime(); 
  }
};