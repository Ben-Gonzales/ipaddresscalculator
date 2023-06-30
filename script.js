//Validator function
document.addEventListener('DOMContentLoaded', function () {
    // Get the form and button elements
    var form = document.querySelector('form');
    var calculateBtn = document.getElementById('calculate-btn');

    // Add event listener to the calculate button
    calculateBtn.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent form submission
      
      var ipInput = document.getElementById('ip-address');
      var prefixInput = document.getElementById('prefix');

      if (validateIP(ipInput.value) && validatePrefix(prefixInput.value)) {
        // Perform calculations
        console.log('Performing calculations...');
        // Your code to calculate network addresses, etc. goes here
      }
    });

    // IP address validation function
    function validateIP(ip) {
      var ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
      if (!ipRegex.test(ip)) {
        // ...
      } else {
        // ...
      }
    }

    // Prefix validation function
    function validatePrefix(prefix) {
      var prefixRegex = /^([0-9]|[1-2][0-9]|3[0-2])$/;
      if (!prefixRegex.test(prefix)) {
        // ...
      } else {
        // ...
      }
    }
  });