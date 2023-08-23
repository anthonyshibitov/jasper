import { createPe, createImageDataDirectory } from "./peDef";

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

  const NTHeaderOffset = parseInt(pe._IMAGE_DOS_HEADER.e_lfanew, 16);

  pe._IMAGE_NT_HEADER.Signature = retrieveDWORD(dataBuffer, NTHeaderOffset);
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.Machine = retrieveWORD(dataBuffer, NTHeaderOffset + 4);
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSections = retrieveWORD(dataBuffer, NTHeaderOffset + 6);
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.TimeDateStamp = retrieveDWORD(dataBuffer, NTHeaderOffset + 8);
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.PointerToSymbolTable = retrieveDWORD(dataBuffer, NTHeaderOffset + 12);
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSymbols = retrieveDWORD(dataBuffer, NTHeaderOffset + 16);
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.SizeOfOptionalHeader = retrieveWORD(dataBuffer, NTHeaderOffset + 20);
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.Characteristics = retrieveWORD(dataBuffer, NTHeaderOffset + 22);

  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Magic = retrieveWORD(dataBuffer, NTHeaderOffset + 24);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorLinkerVersion = retrieveBYTE(dataBuffer, NTHeaderOffset + 26);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorLinkerVersion = retrieveBYTE(dataBuffer, NTHeaderOffset + 27);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfCode = retrieveDWORD(dataBuffer, NTHeaderOffset + 28);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfInitializedData = retrieveDWORD(dataBuffer, NTHeaderOffset + 32);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfUninitializedData = retrieveDWORD(dataBuffer, NTHeaderOffset + 36);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.AddressOfEntryPoint = retrieveDWORD(dataBuffer, NTHeaderOffset + 40);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.BaseOfCode = retrieveDWORD(dataBuffer, NTHeaderOffset + 44);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.BaseOfData = retrieveDWORD(dataBuffer, NTHeaderOffset + 48);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.ImageBase = retrieveDWORD(dataBuffer, NTHeaderOffset + 52);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SectionAlignment = retrieveDWORD(dataBuffer, NTHeaderOffset + 56);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.FileAlignment = retrieveDWORD(dataBuffer, NTHeaderOffset + 60);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorOperatingSystemVersion = retrieveWORD(dataBuffer, NTHeaderOffset + 64);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorOperatingSystemVersion = retrieveWORD(dataBuffer, NTHeaderOffset + 66);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorImageVersion = retrieveWORD(dataBuffer, NTHeaderOffset + 68);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorImageVersion = retrieveWORD(dataBuffer, NTHeaderOffset + 70);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorSubsystemVersion = retrieveWORD(dataBuffer, NTHeaderOffset + 72);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorSubsystemVersion = retrieveWORD(dataBuffer, NTHeaderOffset + 74);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Win32VersionValue = retrieveDWORD(dataBuffer, NTHeaderOffset + 76);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfImage = retrieveDWORD(dataBuffer, NTHeaderOffset + 80);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfHeaders = retrieveDWORD(dataBuffer, NTHeaderOffset + 84);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.CheckSum = retrieveDWORD(dataBuffer, NTHeaderOffset + 88);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Subsystem = retrieveWORD(dataBuffer, NTHeaderOffset + 92);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DllCharacteristics = retrieveWORD(dataBuffer, NTHeaderOffset + 94);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfStackReserve = retrieveDWORD(dataBuffer, NTHeaderOffset + 96);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfStackCommit = retrieveDWORD(dataBuffer, NTHeaderOffset + 100);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfHeapReserve = retrieveDWORD(dataBuffer, NTHeaderOffset + 104);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfHeapCommit = retrieveDWORD(dataBuffer, NTHeaderOffset + 108);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.LoaderFlags = retrieveDWORD(dataBuffer, NTHeaderOffset + 112);
  pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.NumberOfRvaAndSizes = retrieveWORD(dataBuffer, NTHeaderOffset + 116);

  const dataDirectoryCount = parseInt(pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.NumberOfRvaAndSizes, 16);
  let dataDirectoryOffset = NTHeaderOffset + 120;

  for(let i = 0; i < dataDirectoryCount; i++){
    const newDataDirectory = createImageDataDirectory();
    newDataDirectory.VirtualAddress = retrieveDWORD(dataBuffer, dataDirectoryOffset);
    dataDirectoryOffset += 4;
    newDataDirectory.Size = retrieveDWORD(dataBuffer, dataDirectoryOffset);
    dataDirectoryOffset += 4;
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory.push(newDataDirectory);
  }

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
        returnBytes += buffer[offset + i].toString(16).padStart(2, '0'); //may not work.
    }
    return returnBytes.toUpperCase();
}

function retrieveDWORD(buffer, offset) {
  return ((buffer[offset + 3]).toString(16).padStart(2, '0') + (buffer[offset + 2]).toString(16).padStart(2, '0') + (buffer[offset + 1]).toString(16).padStart(2, '0') + (buffer[offset]).toString(16).padStart(2, '0')).toUpperCase();
}

function retrieveWORD(buffer, offset) {
  return ((buffer[offset + 1]).toString(16).padStart(2, '0') + (buffer[offset]).toString(16)).padStart(2, '0').toUpperCase();
}

function retrieveBYTE(buffer, offset) {
  return (buffer[offset].toString(16).padStart(2, '0')).toUpperCase();
}

function toHex(str, padding) {
  var result = "";

  for (var i = 0; i < str.byteLength; i++) {
      result += str.charCodeAt(i).toString(16).padStart(2, '0');
  }
  result = result.toUpperCase();
  return result.padStart(padding, '0');
}

function calcAddressOffset(address, offset) {
  if(address == "") return 0;
  return (parseInt(address, 16) + offset).toString(16).toUpperCase();
}

export { analyze, returnHexOfBuffer, calcAddressOffset};
