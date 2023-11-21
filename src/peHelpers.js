function returnHexOfBuffer(dataBuffer) {
    let hexDump = toHex(dataBuffer);
    for (let i = 0; i < hexDump.length; i += 8) {
      hexDump = hexDump.slice(0, i) + " " + hexDump.slice(i, hexDump.length);
      i++;
    }
    return hexDump;
  }
  
  function retrieveXBytes(buffer, offset, length, padding) {
    let returnBytes = "";
    for (let i = length - 1; i >= 0; i--) {
      returnBytes += buffer[offset + i].toString(16).padStart(2, "0"); //may not work.
    }
    return returnBytes.toUpperCase();
  }
  
  function retrieveStringXBytes(buffer, offset, length, padding) {
    let returnBytes = "";
    for (let i = 0; i < length; i++) {
      returnBytes += buffer[offset + i].toString(16).padStart(2, "0"); //may not work.
    }
    return returnBytes.toUpperCase();
  }
  
  function retrieveQWORD(buffer, offset) {
    return (
      buffer[offset + 7].toString(16).padStart(2, "0") +
      buffer[offset + 6].toString(16).padStart(2, "0") +
      buffer[offset + 5].toString(16).padStart(2, "0") +
      buffer[offset + 4].toString(16).padStart(2, "0") +
      buffer[offset + 3].toString(16).padStart(2, "0") +
      buffer[offset + 2].toString(16).padStart(2, "0") +
      buffer[offset + 1].toString(16).padStart(2, "0") +
      buffer[offset].toString(16).padStart(2, "0")
    ).toUpperCase();
  }
  
  function retrieveDWORD(buffer, offset) {
    return (
      buffer[offset + 3].toString(16).padStart(2, "0") +
      buffer[offset + 2].toString(16).padStart(2, "0") +
      buffer[offset + 1].toString(16).padStart(2, "0") +
      buffer[offset].toString(16).padStart(2, "0")
    ).toUpperCase();
  }
  
  function retrieveWORD(buffer, offset) {
    return (
      buffer[offset + 1].toString(16).padStart(2, "0") +
      buffer[offset].toString(16).padStart(2, "0")
    ).toUpperCase();
  }
  
  function retrieveBYTE(buffer, offset) {
    return buffer[offset].toString(16).padStart(2, "0").toUpperCase();
  }
  
  function toHex(str, padding) {
    var result = "";
  
    for (var i = 0; i < str.byteLength; i++) {
      result += str.charCodeAt(i).toString(16).padStart(2, "0");
    }
    result = result.toUpperCase();
    return result.padStart(padding, "0");
  }
  
  function calcAddressOffset(address, offset) {
    if (address == "") return 0;
    return (parseInt(address, 16) + offset).toString(16).toUpperCase();
  }
  
  function convertRVAToFileOffset(
    rva,
    sectionVirtualAddress,
    sectionPointerToRawData,
    padding
  ) {
    let decimalOffset =
      parseInt(rva, 16) -
      parseInt(sectionVirtualAddress, 16) +
      parseInt(sectionPointerToRawData, 16);
    return decimalOffset.toString(16).toUpperCase().padStart(padding, "0");
  }
  
  function hex2string(hex) {
    var str = "";
    for (var i = 0; i < hex.length; i += 2) {
      var v = parseInt(hex.substr(i, 2), 16);
      if (v) {
        str += String.fromCharCode(v);
      }
    }
    return str;
  }
  
  function getNullTerminatedString(buffer, address) {
    let result = "";
    let i = 0;
    while (buffer[address + i] != 0) {
      result += String.fromCharCode(buffer[address + i]);
      i++;
    }
    return result;
  }
  
  function hex2a(hex, trim) {
    var str = "";
    for (var i = 0; i < hex.length; i += 2) {
      var v = parseInt(hex.substr(i, 2), 16);
      if (v) {
        str += String.fromCharCode(v);
      }
    }
    return str.split("").reverse().join("");
  }

  export {
    returnHexOfBuffer,
    retrieveXBytes,
    retrieveStringXBytes,
    retrieveQWORD,
    retrieveDWORD,
    retrieveWORD,
    retrieveBYTE,
    toHex,
    calcAddressOffset,
    convertRVAToFileOffset,
    hex2string,
    getNullTerminatedString,
    hex2a
  }