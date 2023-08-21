import { createPe } from "./peDef";

function analyze(dataBuffer) {
  const pe = createPe();
  
  pe._IMAGE_DOS_HEADER.e_magic = retrieveWORD(dataBuffer, 0x00);
  pe._IMAGE_DOS_HEADER.e_cblp = retrieveWORD(dataBuffer, 0x02);
  pe._IMAGE_DOS_HEADER.e_cp = retrieveWORD(dataBuffer, 0x04);
  pe._IMAGE_DOS_HEADER.e_crlc = retrieveWORD(dataBuffer, 0x06);
  pe._IMAGE_DOS_HEADER.e_cparhdr = retrieveWORD(dataBuffer, 0x08);
  pe._IMAGE_DOS_HEADER.e_minalloc = retrieveWORD(dataBuffer, 0x0A);
  pe._IMAGE_DOS_HEADER.e_maxalloc = retrieveWORD(dataBuffer, 0x0C);
  pe._IMAGE_DOS_HEADER.e_ss = retrieveWORD(dataBuffer, 0x0E);
  pe._IMAGE_DOS_HEADER.e_sp = retrieveWORD(dataBuffer, 0x10);
  pe._IMAGE_DOS_HEADER.e_csum = retrieveDWORD(dataBuffer, 0x12);
  pe._IMAGE_DOS_HEADER.e_ip = retrieveWORD(dataBuffer, 0x14);
  pe._IMAGE_DOS_HEADER.e_cs = retrieveWORD(dataBuffer, 0x16);
  pe._IMAGE_DOS_HEADER.e_lfarlc = retrieveWORD(dataBuffer, 0x18);
  pe._IMAGE_DOS_HEADER.e_ovno = retrieveWORD(dataBuffer, 0x1A);
  pe._IMAGE_DOS_HEADER.e_res = retrieveXBytes(dataBuffer, 0x1C, 8, 16);
  pe._IMAGE_DOS_HEADER.e_oemid = retrieveWORD(dataBuffer, 0x24);
  pe._IMAGE_DOS_HEADER.e_oeminfo = retrieveWORD(dataBuffer, 0x26);
  pe._IMAGE_DOS_HEADER.e_res2 = retrieveXBytes(dataBuffer, 0x28, 20, 40);
  pe._IMAGE_DOS_HEADER.e_lfanew = retrieveDWORD(dataBuffer, 0x3C);

  pe._IMAGE_NT_HEADER.Signature = retrieveDWORD(dataBuffer, parseInt(pe._IMAGE_DOS_HEADER.e_lfanew, 16));
  pe._IMAGE_NT_HEADER.Machine = retrieveWORD(dataBuffer,parseInt(pe._IMAGE_DOS_HEADER.e_lfanew, 16) + 4);
  pe._IMAGE_NT_HEADER.NumberOfSections = retrieveWORD(dataBuffer,parseInt(pe._IMAGE_DOS_HEADER.e_lfanew, 16) + 6);

  return pe;
}

function returnHexOfBuffer(dataBuffer){
    let hexDump = toHex(dataBuffer);
    for(let i = 0; i < hexDump.length; i += 8){
        hexDump = hexDump.slice(0, i) + " " + hexDump.slice(i, hexDump.length);
        i++;
    }
    return hexDump;
}

function retrieveXBytes(buffer, offset, length, padding){
    let returnBytes = "";
    for(let i = length - 1; i >= 0; i--){
        returnBytes += buffer[offset + i]; //may not work.
    }
    return toHex(returnBytes, padding);
}

function retrieveDWORD(buffer, offset) {
  return toHex(
    buffer[offset + 3] +
      buffer[offset + 2] +
      buffer[offset + 1] +
      buffer[offset], 8
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
