const _IMAGE_DOS_HEADER = {
    e_magic: null,
    e_cblp: null,
    e_cp: null,
    e_crlc: null,
    e_cparhdr: null,

    e_lfanew: null,
  };

const pe = {
  _IMAGE_DOS_HEADER: _IMAGE_DOS_HEADER,
  _IMAGE_NT_HEADER: null,
  _IMAGE_OPTIONAL_HEADER: null,
  _IMAGE_SECTION_HEADERS: [],
  _IMAGE_SECTIONS: [],
};

// 64 bytes


// function peSkeleton(){
//     this._IMAGE_DOS_HEADER = null;
// }

function analyze(dataBuffer) {
  pe._IMAGE_DOS_HEADER.e_magic = retrieveWORD(dataBuffer, 0x00);
  pe._IMAGE_DOS_HEADER.e_cblp = retrieveWORD(dataBuffer, 0x02);
  pe._IMAGE_DOS_HEADER.e_cp = retrieveWORD(dataBuffer, 0x04);
  pe._IMAGE_DOS_HEADER.e_crlc = retrieveWORD(dataBuffer, 0x06);
  pe._IMAGE_DOS_HEADER.e_cparhdr = retrieveWORD(dataBuffer, 0x08);

  pe._IMAGE_DOS_HEADER.e_lfanew = retrieveDWORD(dataBuffer, 0x3c);

  return pe;
}

function returnHexOfBuffer(dataBuffer){
    let hexDump = toHex(dataBuffer);
    for(let i = 0; i < hexDump.length; i += 8){
        hexDump = hexDump.slice(0, i) + " " + hexDump.slice(i, hexDump.length);
        i++;
    }
    console.log(hexDump);
    return hexDump;
}

function retrieveDWORD(buffer, offset) {
  return toHex(
    buffer[offset + 3] +
      buffer[offset + 2] +
      buffer[offset + 1] +
      buffer[offset], 4
  );
}

function retrieveWORD(buffer, offset) {
  return toHex(buffer[offset + 1] + buffer[offset], 4);
}

function retrieveBYTE(buffer, offset) {
  return toHex(buffer[offset], 1);
}

function toHex(str, padding) {
  var result = "";

  for (var i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
  }
  result = result.toUpperCase();
  return result.padStart(padding, '0');
}

export { analyze, returnHexOfBuffer };
