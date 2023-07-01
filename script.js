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
  
    // For Benedict
    function getNetworkAddress(ipAddress, subnetMask) {
   let networkAddress;
    // TODO: Insert computation here

   return networkAddress;
  }

// For Gelo
function getBroadcastAddress(ipAddress, subnetMask) {
  let broadcastAddress;
  // TODO: Insert computation here

  return broadcastAddress;
}
  
const networkAddress = getNetworkAddress(ipAddress, prefix)
const broadcast = getBroadcastAddress(ipAddress, prefix)

    // Update table values
    document.querySelector("#network-address").textContent = networkAddress;
    document.querySelector("#lowest-usable").textContent = lowestUsable;
    document.querySelector("#highest-usable").textContent = highestUsable;
    document.querySelector("#broadcast-address").textContent = broadcastAddress;
    document.querySelector("#next-network-address").textContent = nextNetworkAddress;
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