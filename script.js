//Validator function
document.addEventListener("DOMContentLoaded", function () {
  // Get the input elements
  var ipInput = document.getElementById("ip-address");
  var prefixInput = document.getElementById("prefix");
  var calculateBtn = document.getElementById("calculate-btn");

  // Add event listener to the calculate button
  calculateBtn.addEventListener("click", function () {
    if (validateIP(ipInput.value) && validatePrefix(prefixInput.value)) {
      // Perform calculations
      console.log("Performing calculations...");
      // Your code to calculate network addresses, etc. goes here
    }
  });

  // IP address validation function
  function validateIP(ip) {
    var ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(ip)) {
      ipInput.classList.add("is-invalid");
      ipInput.classList.remove("is-valid");
      document.getElementById("ip-feedback").style.display = "block";
      return false;
    } else {
      ipInput.classList.remove("is-invalid");
      ipInput.classList.add("is-valid");
      document.getElementById("ip-feedback").style.display = "none";
      return true;
    }
  }

  // Prefix validation function
  function validatePrefix(prefix) {
    var prefixRegex = /^([0-9]|[1-2][0-9]|3[0-2])$/;
    if (!prefixRegex.test(prefix)) {
      prefixInput.classList.add("is-invalid");
      prefixInput.classList.remove("is-valid");
      document.getElementById("prefix-feedback").style.display = "block";
      return false;
    } else {
      prefixInput.classList.remove("is-invalid");
      prefixInput.classList.add("is-valid");
      document.getElementById("prefix-feedback").style.display = "none";
      return true;
    }
  }
});

let ipAdd = 0;
let prefix = 0;

function calculate() {
  ipAdd = document.getElementById("ip-address").value;
  prefix = document.getElementById("prefix").value;
  console.log(ipAdd);
  console.log(prefix);
}
