function calculate() {
  // Get input values
  var ipAddress = document.querySelector("#ip-address").value;
  var prefix = parseInt(document.querySelector("#prefix").value);

  // Validate input values
  var ipValid = validateIPAddress(ipAddress);
  var prefixValid = validatePrefix(prefix);

  if (!ipValid) {
    document.querySelector("#ip-feedback").style.display = "block";
  } else {
    document.querySelector("#ip-feedback").style.display = "none";
  }

  if (!prefixValid) {
    document.querySelector("#prefix-feedback").style.display = "block";
  } else {
    document.querySelector("#prefix-feedback").style.display = "none";
  }

  if (!ipValid || !prefixValid) {
    return;
  }

  // Split IP address into octets
  var octets = ipAddress.split(".");

  // Determine octet index based on prefix
  var octetIndex = Math.floor(prefix / 8);

  // Determine network and host bits in the octet
  var networkBits = prefix % 8;
  var hostBits = 8 - networkBits;

  // Calculate network address
  var networkAddress =
    octets.slice(0, octetIndex).join(".") + "." + octets[octetIndex];

  // Calculate the interval for host addresses
  var hostInterval = Math.pow(2, hostBits);

  // Calculate next network address
  var nextNetworkAddress = incrementIPAddress(networkAddress, hostInterval);

  // Set succeeding octets to zero
  for (var i = octetIndex + 1; i < 4; i++) {
    octets[i] = "0";
  }

  // Calculate broadcast address
  var broadcastAddress = decrementIPAddress(nextNetworkAddress);

  // Calculate highest usable address
  var highestUsable = decrementIPAddress(broadcastAddress);

  // Calculate lowest usable address
  var lowestUsable = incrementIPAddress(networkAddress, 1);

  // Update table values
  document.querySelector("#network-address").textContent = networkAddress;
  document.querySelector("#lowest-usable").textContent = lowestUsable;
  document.querySelector("#highest-usable").textContent = highestUsable;
  document.querySelector("#broadcast-address").textContent = broadcastAddress;
  document.querySelector("#next-network-address").textContent =
    nextNetworkAddress;
}

function validateIPAddress(ipAddress) {
  var ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ipAddress)) {
    return false;
  }

  var octets = ipAddress.split(".");
  for (var i = 0; i < 4; i++) {
    var octet = parseInt(octets[i]);
    if (isNaN(octet) || octet < 0 || octet > 255) {
      return false;
    }
  }

  return true;
}

function validatePrefix(prefix) {
  return prefix >= 0 && prefix <= 32;
}

function incrementIPAddress(ipAddress, increment) {
  var octets = ipAddress.split(".");
  var lastIndex = octets.length - 1;

  // Convert last octet to integer
  var lastOctet = parseInt(octets[lastIndex]);

  // Increment last octet
  lastOctet += increment;

  // Handle carryover to previous octets
  for (var i = lastIndex; i >= 0; i--) {
    if (lastOctet > 255) {
      // Carryover to previous octet
      lastOctet -= 256;
      octets[i] = "0";
      if (i > 0) {
        // Increment previous octet
        octets[i - 1] = String(parseInt(octets[i - 1]) + 1);
      } else {
        // First octet reached, invalid
        return "Invalid";
      }
    } else {
      // Update last octet
      octets[lastIndex] = String(lastOctet);
      break;
    }
  }

  return octets.join(".");
}

function decrementIPAddress(ipAddress) {
  var octets = ipAddress.split(".");
  var lastIndex = octets.length - 1;

  // Convert last octet to integer
  var lastOctet = parseInt(octets[lastIndex]);

  // Decrement last octet
  lastOctet -= 1;

  // Handle borrow from previous octets
  for (var i = lastIndex; i >= 0; i--) {
    if (lastOctet < 0) {
      // Borrow from previous octet
      lastOctet += 256;
      octets[i] = "255";
      if (i > 0) {
        // Decrement previous octet
        octets[i - 1] = String(parseInt(octets[i - 1]) - 1);
      } else {
        // First octet reached, invalid
        return "Invalid";
      }
    } else {
      // Update last octet
      octets[lastIndex] = String(lastOctet);
      break;
    }
  }

  return octets.join(".");
}
