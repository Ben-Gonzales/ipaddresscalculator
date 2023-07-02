function calculate(){
  // Get input values
  var ipAddress = document.querySelector("#ip-address").value;
  var prefix = parseInt(document.querySelector("#subnet-mask").value);

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

    // Get input values
    var ipAddress = document.querySelector("#ip-address").value;
    var prefix = parseInt(document.querySelector("#subnet-mask").value);

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
    function getNetworkAddress(ipAddress, prefix) {
      // Convert IP address to binary
      const ipBinary = ipAddress.split(".").map((octet) => {
        return ("00000000" + parseInt(octet, 10).toString(2)).slice(-8);
      });

      // Calculate the subnet mask based on the prefix
      const subnetMaskBinary = [];
      for (let i = 0; i < 32; i++) {
        if (i < prefix) {
          subnetMaskBinary.push("1");
        } else {
          subnetMaskBinary.push("0");
        }
      }

      // Split the subnet mask binary into octets
      const subnetMaskOctets = [];
      for (let i = 0; i < 32; i += 8) {
        const octetBinary = subnetMaskBinary.slice(i, i + 8).join("");
        subnetMaskOctets.push(parseInt(octetBinary, 2));
      }

      // Calculate the network address
      const networkAddressBinary = [];
      for (let i = 0; i < 4; i++) {
        const ipOctet = ipBinary[i];
        const subnetMaskOctet = subnetMaskOctets[i];
        let networkOctet = "";
        for (let j = 0; j < 8; j++) {
          const ipBit = ipOctet.charAt(j);
          const subnetMaskBit = subnetMaskOctet & (1 << (7 - j)) ? "1" : "0";
          if (subnetMaskBit === "1") {
            networkOctet += ipBit;
          } else {
            networkOctet += "0";
          }
        }
        networkAddressBinary.push(networkOctet);
      }

      // Convert network address back to decimal
      const networkAddress = networkAddressBinary.map((octet) => {
        return parseInt(octet, 2);
      });

      return networkAddress.join(".");
    }

    /*// For Gelo
    function getBroadcastAddress(ipAddress, subnetMask) {
      let broadcastAddress;
      // TODO: Insert computation here

      return broadcastAddress;
    }

    // const networkAddress = getNetworkAddress(ipAddress, prefix);
    // const broadcast = getBroadcastAddress(ipAddress, prefix);
  

  function Interval(prefix){
  // Calculate the interval based on the prefix and octet position
  const interval = Math.pow(2, 8 - (prefix % 8 || 8));
  return interval;
}

function getNextNetworkAddress(ipAddress, prefix) {
  // Split IP address into octets
  const ipOctets = ipAddress.split('.');

  // Convert octets to decimal values
  const ipDecimals = ipOctets.map((octet) => parseInt(octet, 10));

  // Determine the octet position based on the prefix
  const octetPosition = Math.floor((prefix - 1) / 8); // 0-indexed

  // Calculate the interval based on the prefix and octet position
  const interval = Math.pow(2, 8 - (prefix % 8 || 8));

  // Calculate the next network address
  const nextNetworkDecimals = ipDecimals.map((octet, index) => {
    if (index === octetPosition) {
      return octet + interval;
    } else if (index > octetPosition) {
      return 0;
    }
    return octet;
  });

  // Convert decimal values to octets
  const nextNetworkOctets = nextNetworkDecimals.map((decimal) => {
    return decimal.toString();
  });

  // Join octets into a string
  const nextNetworkAddress = nextNetworkOctets.join('.');

  return nextNetworkAddress;
}*/

  
const networkAddress = getNetworkAddress(ipAddress, prefix);
//const broadcast = getBroadcastAddress(ipAddress, prefix);
//const nextNetworkAddress = getNextNetworkAddress(ipAddress, prefix);
//const Interval = Interval(prefix);

console.log(networkAddress);
console.log(networkAddress);
//console.log(nextNetworkAddress);
//console.log(Interval);

  // Update table values
  document.querySelector("#network-address").textContent = networkAddress;
  //document.querySelector("#lowest-usable").textContent = lowestUsable;
  //document.querySelector("#highest-usable").textContent = highestUsable;
  //document.querySelector("#broadcast-address").textContent = broadcastAddress;
  //document.querySelector("#next-network-address").textContent = nextNetworkAddress;


  // For Alex
  function getSubnetMask(hostBits) {
    let mask = [],
      i,
      n;
    for (i = 0; i < 4; i++) {
      n = Math.min(hostBits, 8);
      mask.push(256 - Math.pow(2, 8 - n));
      hostBits -= n;
    }
    return mask.join(".");
  }

  function getSubnetBinary(prefix) {
    let subnetMaskBinary = [];
    for (let i = 0; i < 32; i++) {
      if (i < prefix) {
        subnetMaskBinary.push("1");
      } else {
        subnetMaskBinary.push("0");
      }
    }

    let subnetMaskOctets = [];
    for (let i = 0; i < 32; i += 8) {
      const octetBinary = subnetMaskBinary.slice(i, i + 8).join("");
      subnetMaskOctets.push(octetBinary);
    }

    const subnetMaskOctetsFormatted = subnetMaskOctets.join(".");
    return subnetMaskOctetsFormatted;
  }

  function getIPClass(ipAddress) {
    let ipSplit = ipAddress.split(".");
    let firstOctet = ipSplit[0];
    let ipClass;

    if (firstOctet >= 1 && firstOctet <= 126) {
      ipClass = "A";
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      ipClass = "B";
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      ipClass = "C";
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      ipClass = "D";
    } else if (firstOctet >= 240 && firstOctet <= 255) {
      ipClass = "E";
    } else {
      ipClass = "Invalid";
    }
    return ipClass;
  }

  let subnetMask2 = getSubnetMask(prefix);
  let ipClass = getIPClass(ipAddress);
  let subnetBinary = getSubnetBinary(prefix);

  document.getElementById("subnetMask").innerHTML = subnetMask2;
  document.getElementById("subnetMaskBinary").innerHTML = subnetBinary;
  document.getElementById("ipClass").innerHTML = ipClass;

  //usable hosts
  function getUsableHosts(prefix) {
    let hostBits = 32 - prefix;
    let usableHosts = Math.pow(2, hostBits) - 2;
    if (usableHosts <= 0) {
      usableHosts = 0;
    }
    return usableHosts;
  }

  function getTotalHosts(prefix) {
    let hostBits = 32 - prefix;
    let totalHosts = Math.pow(2, hostBits);
    if (totalHosts <= 0) {
      totalHosts = 0;
    }
    return totalHosts;
  }

  let usableHosts = getUsableHosts(prefix);
  let totalHosts = getTotalHosts(prefix);
  document.getElementById("usableHost").innerHTML = usableHosts;
  document.getElementById("totalHost").innerHTML = totalHosts;


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
}