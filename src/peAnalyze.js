import {
  createPe,
  createImageDataDirectory,
  createSectionHeader,
  createImageImportDescriptor,
  createImageBoundImportDescriptor,
} from "./peDef";

function determineArchitecture(dataBuffer) {
  const magic = hex2a(retrieveWORD(dataBuffer, 0x00));
  if (magic != "MZ") {
    return -1;
  }
  const ArchOffset = parseInt(retrieveDWORD(dataBuffer, 0x3c), 16) + 24;
  const arch = parseInt(retrieveWORD(dataBuffer, ArchOffset), 16);
  if (arch == 0x10b) {
    return 32;
  }
  if (arch == 0x20b) {
    return 64;
  }
  return -1;
}

function analyze32(dataBuffer) {
  const arch = determineArchitecture(dataBuffer);
  let pe;
  if (arch == 32) {
    pe = createPe(false);
  } else if (arch == 64) {
    pe = createPe(true);
  } else if (arch == -1) {
  }

  /* CONSTRUCT DOS HEADER */
  pe._IMAGE_DOS_HEADER.e_magic = retrieveWORD(dataBuffer, 0x00);
  pe._IMAGE_DOS_HEADER.e_cblp = retrieveWORD(dataBuffer, 0x02);
  pe._IMAGE_DOS_HEADER.e_cp = retrieveWORD(dataBuffer, 0x04);
  pe._IMAGE_DOS_HEADER.e_crlc = retrieveWORD(dataBuffer, 0x06);
  pe._IMAGE_DOS_HEADER.e_cparhdr = retrieveWORD(dataBuffer, 0x08);
  pe._IMAGE_DOS_HEADER.e_minalloc = retrieveWORD(dataBuffer, 0x0a);
  pe._IMAGE_DOS_HEADER.e_maxalloc = retrieveWORD(dataBuffer, 0x0c);
  pe._IMAGE_DOS_HEADER.e_ss = retrieveWORD(dataBuffer, 0x0e);
  pe._IMAGE_DOS_HEADER.e_sp = retrieveWORD(dataBuffer, 0x10);
  pe._IMAGE_DOS_HEADER.e_csum = retrieveDWORD(dataBuffer, 0x12);
  pe._IMAGE_DOS_HEADER.e_ip = retrieveWORD(dataBuffer, 0x14);
  pe._IMAGE_DOS_HEADER.e_cs = retrieveWORD(dataBuffer, 0x16);
  pe._IMAGE_DOS_HEADER.e_lfarlc = retrieveWORD(dataBuffer, 0x18);
  pe._IMAGE_DOS_HEADER.e_ovno = retrieveWORD(dataBuffer, 0x1a);
  pe._IMAGE_DOS_HEADER.e_res = retrieveXBytes(dataBuffer, 0x1c, 8, 16);
  pe._IMAGE_DOS_HEADER.e_oemid = retrieveWORD(dataBuffer, 0x24);
  pe._IMAGE_DOS_HEADER.e_oeminfo = retrieveWORD(dataBuffer, 0x26);
  pe._IMAGE_DOS_HEADER.e_res2 = retrieveXBytes(dataBuffer, 0x28, 20, 40);
  pe._IMAGE_DOS_HEADER.e_lfanew = retrieveDWORD(dataBuffer, 0x3c);

  const NTHeaderOffset = parseInt(pe._IMAGE_DOS_HEADER.e_lfanew, 16);

  /* CONSTRUCT FILE HEADER */
  pe._IMAGE_NT_HEADER.Signature = retrieveDWORD(dataBuffer, NTHeaderOffset);
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.Machine = retrieveWORD(
    dataBuffer,
    NTHeaderOffset + 4
  );
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSections = retrieveWORD(
    dataBuffer,
    NTHeaderOffset + 6
  );
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.TimeDateStamp = retrieveDWORD(
    dataBuffer,
    NTHeaderOffset + 8
  );
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.PointerToSymbolTable = retrieveDWORD(
    dataBuffer,
    NTHeaderOffset + 12
  );
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSymbols = retrieveDWORD(
    dataBuffer,
    NTHeaderOffset + 16
  );
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.SizeOfOptionalHeader = retrieveWORD(
    dataBuffer,
    NTHeaderOffset + 20
  );
  pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.Characteristics = retrieveWORD(
    dataBuffer,
    NTHeaderOffset + 22
  );

  /* CONSTRUCT OPTIONAL HEADER */
  if (arch == 32) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Magic = retrieveWORD(
      dataBuffer,
      NTHeaderOffset + 24
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorLinkerVersion =
      retrieveBYTE(dataBuffer, NTHeaderOffset + 26);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorLinkerVersion =
      retrieveBYTE(dataBuffer, NTHeaderOffset + 27);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfCode = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 28
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfInitializedData =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 32);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfUninitializedData =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 36);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.AddressOfEntryPoint =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 40);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.BaseOfCode = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 44
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.BaseOfData = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 48
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.ImageBase = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 52
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SectionAlignment =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 56);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.FileAlignment = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 60
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorOperatingSystemVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 64);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorOperatingSystemVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 66);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorImageVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 68);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorImageVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 70);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorSubsystemVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 72);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorSubsystemVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 74);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Win32VersionValue =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 76);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfImage = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 80
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfHeaders = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 84
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.CheckSum = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 88
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Subsystem = retrieveWORD(
      dataBuffer,
      NTHeaderOffset + 92
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DllCharacteristics =
      retrieveWORD(dataBuffer, NTHeaderOffset + 94);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfStackReserve =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 96);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfStackCommit =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 100);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfHeapReserve =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 104);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfHeapCommit =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 108);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.LoaderFlags = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 112
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.NumberOfRvaAndSizes =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 116);
  }
  if (arch == 64) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.Magic = retrieveWORD(
      dataBuffer,
      NTHeaderOffset + 24
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.MajorLinkerVersion =
      retrieveBYTE(dataBuffer, NTHeaderOffset + 26);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.MinorLinkerVersion =
      retrieveBYTE(dataBuffer, NTHeaderOffset + 27);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SizeOfCode = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 28
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SizeOfInitializedData =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 32);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SizeOfUninitializedData =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 36);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.AddressOfEntryPoint =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 40);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.BaseOfCode = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 44
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.ImageBase = retrieveQWORD(
      dataBuffer,
      NTHeaderOffset + 48
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SectionAlignment =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 56);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.FileAlignment = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 60
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.MajorOperatingSystemVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 64);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.MinorOperatingSystemVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 66);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.MajorImageVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 68);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.MinorImageVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 70);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.MajorSubsystemVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 72);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.MinorSubsystemVersion =
      retrieveWORD(dataBuffer, NTHeaderOffset + 74);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.Win32VersionValue =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 76);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SizeOfImage = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 80
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SizeOfHeaders = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 84
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.CheckSum = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 88
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.Subsystem = retrieveWORD(
      dataBuffer,
      NTHeaderOffset + 92
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DllCharacteristics =
      retrieveWORD(dataBuffer, NTHeaderOffset + 94);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SizeOfStackReserve =
      retrieveQWORD(dataBuffer, NTHeaderOffset + 96);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SizeOfStackCommit =
      retrieveQWORD(dataBuffer, NTHeaderOffset + 104);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SizeOfHeapReserve =
      retrieveQWORD(dataBuffer, NTHeaderOffset + 112);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.SizeOfHeapCommit =
      retrieveQWORD(dataBuffer, NTHeaderOffset + 120);
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.LoaderFlags = retrieveDWORD(
      dataBuffer,
      NTHeaderOffset + 128
    );
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.NumberOfRvaAndSizes =
      retrieveDWORD(dataBuffer, NTHeaderOffset + 132);
  }

  /* CONSTRUCT DATA DIRECTORY */
  let dataDirectoryCount;
  let dataDirectoryOffset;
  if (arch == 32) {
    dataDirectoryCount = parseInt(
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.NumberOfRvaAndSizes,
      16
    );
    dataDirectoryOffset = NTHeaderOffset + 120;
  }
  if (arch == 64) {
    dataDirectoryCount = parseInt(
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.NumberOfRvaAndSizes,
      16
    );
    dataDirectoryOffset = NTHeaderOffset + 136;
  }

  for (let i = 0; i < dataDirectoryCount; i++) {
    const newDataDirectory = createImageDataDirectory();

    newDataDirectory.VirtualAddress = retrieveDWORD(
      dataBuffer,
      dataDirectoryOffset
    );
    dataDirectoryOffset += 4;
    newDataDirectory.Size = retrieveDWORD(dataBuffer, dataDirectoryOffset);
    dataDirectoryOffset += 4;

    if (arch == 32) {
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory.push(
        newDataDirectory
      );
    }
    if (arch == 64) {
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory.push(
        newDataDirectory
      );
    }
  }

  /* CONSTRUCT SECTION HEADERS */
  let sectionHeaderOffset = dataDirectoryOffset;

  const numberOfSections =
    pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSections;

  for (let i = 0; i < parseInt(numberOfSections, 16); i++) {
    const newSectionHeader = new createSectionHeader();
    newSectionHeader.Name = retrieveStringXBytes(
      dataBuffer,
      sectionHeaderOffset,
      8,
      8
    );
    newSectionHeader.PhyAdd_VirSize = retrieveDWORD(
      dataBuffer,
      sectionHeaderOffset + 8
    );
    newSectionHeader.VirtualAddress = retrieveDWORD(
      dataBuffer,
      sectionHeaderOffset + 12
    );
    newSectionHeader.SizeOfRawData = retrieveDWORD(
      dataBuffer,
      sectionHeaderOffset + 16
    );
    newSectionHeader.PointerToRawData = retrieveDWORD(
      dataBuffer,
      sectionHeaderOffset + 20
    );
    newSectionHeader.PointerToRelocations = retrieveDWORD(
      dataBuffer,
      sectionHeaderOffset + 24
    );
    newSectionHeader.PointerToLinenumbers = retrieveDWORD(
      dataBuffer,
      sectionHeaderOffset + 28
    );
    newSectionHeader.NumberOfRelocations = retrieveDWORD(
      dataBuffer,
      sectionHeaderOffset + 32
    );
    newSectionHeader.NumberOfLinenumbers = retrieveDWORD(
      dataBuffer,
      sectionHeaderOffset + 34
    );
    newSectionHeader.Characteristics = retrieveDWORD(
      dataBuffer,
      sectionHeaderOffset + 36
    );
    newSectionHeader.JASPER_SECTION_OFFSET = sectionHeaderOffset.toString(16);

    pe._IMAGE_SECTION_HEADERS.push(newSectionHeader);
    sectionHeaderOffset += 40;
  }

  constructNormalImports(pe, dataBuffer, arch);
  constructBoundImports(pe, dataBuffer, arch);
  console.log(pe);
  return pe;
}

function constructBoundImports(pe, dataBuffer, arch){
  //Table 11
  const boundImports = [];
  let boundDescriptorTableOffset;
  if (arch == 32){
    boundDescriptorTableOffset = pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[11].VirtualAddress;
  }
  if (arch == 64){
    boundDescriptorTableOffset = pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[11].VirtualAddress;
  }
  if(boundDescriptorTableOffset == 0) return;
  boundDescriptorTableOffset = parseInt(boundDescriptorTableOffset, 16);
  const originalBoundDescriptorTableOffset = boundDescriptorTableOffset;
  while(retrieveXBytes(dataBuffer, boundDescriptorTableOffset, 8) != "0000000000000000"){
    console.log("current descriptor hex:", retrieveXBytes(dataBuffer, boundDescriptorTableOffset, 8));
    let boundDescriptor = createImageBoundImportDescriptor();
    boundDescriptor.TimeDateStamp = retrieveDWORD(dataBuffer, boundDescriptorTableOffset);
    boundDescriptor.OffsetModuleName = retrieveWORD(dataBuffer, boundDescriptorTableOffset + 4);
    boundDescriptor.NumberOfModuleForwarderRefs = retrieveWORD(dataBuffer, boundDescriptorTableOffset + 6);
    boundDescriptor.NameString = getNullTerminatedString(dataBuffer, originalBoundDescriptorTableOffset + parseInt(boundDescriptor.OffsetModuleName, 16));
    boundImports.push(boundDescriptor);
    console.log("bound import", boundDescriptor);
    boundDescriptorTableOffset += 8;
  }
  if (arch == 32){
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[11].BoundImportDirectoryTable = boundImports;
  }
  if (arch == 64){
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[11].BoundImportDirectoryTable = boundImports;
  }
}

function constructNormalImports(pe, dataBuffer, arch) {
  //Populate Import Directory information
  let firstImportDirectoryEntryRVA;
  if (arch == 32) {
    firstImportDirectoryEntryRVA =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1]
        .VirtualAddress;
  }
  if (arch == 64) {
    firstImportDirectoryEntryRVA =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1]
        .VirtualAddress;
  }

  //Loop through sections to find which section the first IDT entry is
  let importSection;
  for (
    let i = 0;
    i < parseInt(pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSections, 16);
    i++
  ) {
    let currentSectionVirtualAddressStart = parseInt(
      pe._IMAGE_SECTION_HEADERS[i].VirtualAddress,
      16
    );
    let currentSectionVirtualAddressEnd =
      parseInt(pe._IMAGE_SECTION_HEADERS[i].VirtualAddress, 16) +
      parseInt(pe._IMAGE_SECTION_HEADERS[i].PhyAdd_VirSize, 16);
    if (
      parseInt(firstImportDirectoryEntryRVA, 16) >=
        currentSectionVirtualAddressStart &&
      parseInt(firstImportDirectoryEntryRVA, 16) <
        currentSectionVirtualAddressEnd
    ) {
      importSection = i;
    }
  }

  // Get first descriptor offset
  const firstImportDirectoryEntryFileOffset = convertRVAToFileOffset(
    firstImportDirectoryEntryRVA,
    pe._IMAGE_SECTION_HEADERS[importSection].VirtualAddress,
    pe._IMAGE_SECTION_HEADERS[importSection].PointerToRawData,
    8
  );

  //Get number of import descriptors. Size of import drectory table / 20 (structure size) - 1 (last one is null)
  let numberOfImportDescriptors = 0;
  let currentImportDescriptorOffset = parseInt(
    firstImportDirectoryEntryFileOffset,
    16
  );
  while (
    parseInt(
      retrieveStringXBytes(dataBuffer, currentImportDescriptorOffset, 20),
      16
    ) != 0
  ) {
    numberOfImportDescriptors++;
    currentImportDescriptorOffset += 20;
  }
  console.log("number of import descriptors:", numberOfImportDescriptors);

  if (arch == 32) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1].ImportDirectoryTable =
      [];
  }
  if (arch == 64) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1].ImportDirectoryTable =
      [];
  }

  let descriptorOffset = parseInt(firstImportDirectoryEntryFileOffset, 16);

  for (let i = 0; i < numberOfImportDescriptors; i++) {
    const imageImportDescriptor = new createImageImportDescriptor();
    imageImportDescriptor.OriginalFirstThunk = retrieveDWORD(
      dataBuffer,
      descriptorOffset
    );
    imageImportDescriptor.TimeDateStamp = retrieveDWORD(
      dataBuffer,
      descriptorOffset + 4
    );
    imageImportDescriptor.ForwarderChain = retrieveDWORD(
      dataBuffer,
      descriptorOffset + 8
    );
    imageImportDescriptor.Name = retrieveDWORD(
      dataBuffer,
      descriptorOffset + 12
    );
    imageImportDescriptor.FirstThunk = retrieveDWORD(
      dataBuffer,
      descriptorOffset + 16
    );
    if (arch == 32) {
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1].ImportDirectoryTable.push(
        imageImportDescriptor
      );
    }
    if (arch == 64) {
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1].ImportDirectoryTable.push(
        imageImportDescriptor
      );
    }
    const DllNameOffset = convertRVAToFileOffset(
      imageImportDescriptor.Name,
      pe._IMAGE_SECTION_HEADERS[importSection].VirtualAddress,
      pe._IMAGE_SECTION_HEADERS[importSection].PointerToRawData
    );
    const DllName = getNullTerminatedString(
      dataBuffer,
      parseInt(DllNameOffset, 16)
    );
    imageImportDescriptor.NameString = DllName;
    console.log(`Import ${i}`, DllName);

    //Get list of RVAs for name imports
    const functionNameImportRVAs = [];

    //Get ILT table address. If OriginalFirstThunk is empty, use FirstThunk instead.
    let originalThunkFileOffset;
    if (parseInt(imageImportDescriptor.OriginalFirstThunk, 16) == 0) {
      originalThunkFileOffset = convertRVAToFileOffset(
        imageImportDescriptor.FirstThunk,
        pe._IMAGE_SECTION_HEADERS[importSection].VirtualAddress,
        pe._IMAGE_SECTION_HEADERS[importSection].PointerToRawData
      );
    } else {
      originalThunkFileOffset = convertRVAToFileOffset(
        imageImportDescriptor.OriginalFirstThunk,
        pe._IMAGE_SECTION_HEADERS[importSection].VirtualAddress,
        pe._IMAGE_SECTION_HEADERS[importSection].PointerToRawData
      );
    }

    while (
      retrieveDWORD(dataBuffer, parseInt(originalThunkFileOffset, 16)) !=
      "00000000"
    ) {
      if (arch == 32) {
        functionNameImportRVAs.push(
          retrieveDWORD(dataBuffer, parseInt(originalThunkFileOffset, 16))
        );
        originalThunkFileOffset = (
          parseInt(originalThunkFileOffset, 16) + 4
        ).toString(16);
      }
      if (arch == 64) {
        functionNameImportRVAs.push(
          retrieveQWORD(dataBuffer, parseInt(originalThunkFileOffset, 16))
        );
        originalThunkFileOffset = (
          parseInt(originalThunkFileOffset, 16) + 8
        ).toString(16);
      }
    }

    functionNameImportRVAs.forEach((rva) => {
      if (arch == 32) {
        let bitCheck = parseInt(rva, 16) & 0x80000000;
        if (bitCheck != 0) {
          console.log("ordinal import..");
          let ordinal = parseInt(rva, 16) & 0xffff;
          ordinal = "0x" + ordinal.toString(16).toUpperCase();
          imageImportDescriptor.ImportNameList.push({ ordinal }); //only want the lower 16 bits in 32bit file
        } else {
          const offset = convertRVAToFileOffset(
            rva,
            pe._IMAGE_SECTION_HEADERS[importSection].VirtualAddress,
            pe._IMAGE_SECTION_HEADERS[importSection].PointerToRawData
          );
          const hint = retrieveWORD(dataBuffer, parseInt(offset, 16));
          const name = getNullTerminatedString(
            dataBuffer,
            parseInt(offset, 16) + 2
          );
          imageImportDescriptor.ImportNameList.push({ hint, name, rva });
        }
      }
      if (arch == 64) {
        let bitCheck = BigInt(parseInt(rva, 16)) & BigInt("0x8000000000000000");
        if (bitCheck != 0) {
          console.log("ordinal import..");
          console.log(rva);
          console.log(BigInt("0x" + rva));
          const ordinal = BigInt("0x" + rva) & 0xffffn;
          imageImportDescriptor.ImportNameList.push({
            ordinal: parseInt(ordinal).toString(16),
          }); //only want the lower 16 bits in 32bit file
        } else {
          const offset = convertRVAToFileOffset(
            rva,
            pe._IMAGE_SECTION_HEADERS[importSection].VirtualAddress,
            pe._IMAGE_SECTION_HEADERS[importSection].PointerToRawData
          );
          const hint = retrieveWORD(dataBuffer, parseInt(offset, 16));
          const name = getNullTerminatedString(
            dataBuffer,
            parseInt(offset, 16) + 2
          );
          imageImportDescriptor.ImportNameList.push({ hint, name, rva });
        }
      }
    });
    descriptorOffset += 20;
  }
}

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
  analyze32,
  returnHexOfBuffer,
  calcAddressOffset,
  hex2string,
  determineArchitecture,
};
