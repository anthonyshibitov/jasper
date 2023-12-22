import {
  createPe,
  createImageDataDirectory,
  createSectionHeader,
  createImageImportDescriptor,
  createImageBoundImportDescriptor,
  createExportDirectoryTable,
} from "./peDef";

import {
  retrieveXBytes,
  retrieveStringXBytes,
  retrieveQWORD,
  retrieveDWORD,
  retrieveWORD,
  retrieveBYTE,
  toHex,
  convertRVAToFileOffset,
  getNullTerminatedString,
  hex2a,
} from "./peHelpers";

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

function analyze(dataBuffer) {
  const arch = determineArchitecture(dataBuffer);
  let pe;
  if (arch == 32) {
    pe = createPe(false);
  } else if (arch == 64) {
    pe = createPe(true);
  } else if (arch == -1) {
    return
  }

  constructHeaders(pe, dataBuffer, arch);
  constructNormalImports(pe, dataBuffer, arch);
  constructBoundImports(pe, dataBuffer, arch);
  constructExports(pe, dataBuffer, arch);
  constructRelocs(pe, dataBuffer, arch);
  // strings(pe, dataBuffer);

  // DEBUG
  console.log(pe);
  return pe;
}

function constructHeaders(pe, dataBuffer, arch){
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
}

function constructBoundImports(pe, dataBuffer, arch) {
  //Table 11
  const boundImports = [];
  let boundDescriptorTableOffset;
  if (arch == 32) {
    if (
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[11] ==
      undefined
    ) {
      return;
    }
    boundDescriptorTableOffset =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[11]
        .VirtualAddress;
  }
  if (arch == 64) {
    if (
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[11] ==
      undefined
    ) {
      return;
    }
    boundDescriptorTableOffset =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[11]
        .VirtualAddress;
  }
  if (parseInt(boundDescriptorTableOffset, 16) == 0) return;
  boundDescriptorTableOffset = parseInt(boundDescriptorTableOffset, 16);
  const originalBoundDescriptorTableOffset = boundDescriptorTableOffset;
  while (
    retrieveXBytes(dataBuffer, boundDescriptorTableOffset, 8) !=
    "0000000000000000"
  ) {
    let boundDescriptor = createImageBoundImportDescriptor();
    boundDescriptor.TimeDateStamp = retrieveDWORD(
      dataBuffer,
      boundDescriptorTableOffset
    );
    boundDescriptor.OffsetModuleName = retrieveWORD(
      dataBuffer,
      boundDescriptorTableOffset + 4
    );
    boundDescriptor.NumberOfModuleForwarderRefs = retrieveWORD(
      dataBuffer,
      boundDescriptorTableOffset + 6
    );
    boundDescriptor.NameString = getNullTerminatedString(
      dataBuffer,
      originalBoundDescriptorTableOffset +
        parseInt(boundDescriptor.OffsetModuleName, 16)
    );
    boundImports.push(boundDescriptor);
    boundDescriptorTableOffset += 8;
  }
  if (arch == 32) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[11].BoundImportDirectoryTable =
      boundImports;
  }
  if (arch == 64) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[11].BoundImportDirectoryTable =
      boundImports;
  }
}

function constructNormalImports(pe, dataBuffer, arch) {
  //Populate Import Directory information
  let firstImportDirectoryEntryRVA;
  if (arch == 32) {
    if (
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1] == undefined
    ) {
      return;
    }
    firstImportDirectoryEntryRVA =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1]
        .VirtualAddress;
  }
  if (arch == 64) {
    if (
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1] == undefined
    ) {
      return;
    }
    firstImportDirectoryEntryRVA =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1]
        .VirtualAddress;
  }

  if (parseInt(firstImportDirectoryEntryRVA, 16) == 0) return;

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
      break;
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

function constructExports(pe, dataBuffer, arch) {
  let EDTVirtualAddress;

  if (arch == 32) {
    if (
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[0] ==
        undefined ||
      parseInt(
        pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[0].VirtualAddress,
        16
      ) == 0
    ) {
      return;
    }
    EDTVirtualAddress =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[0]
        .VirtualAddress;
  }

  if (arch == 64) {
    if (
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[0] ==
        undefined ||
      parseInt(
        pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[0].VirtualAddress,
        16
      ) == 0
    ) {
      return;
    }
    EDTVirtualAddress =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[0]
        .VirtualAddress;
  }

  //Loop through sections to find which section the export directory is in
  let exportSection;
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
      parseInt(EDTVirtualAddress, 16) >= currentSectionVirtualAddressStart &&
      parseInt(EDTVirtualAddress, 16) < currentSectionVirtualAddressEnd
    ) {
      exportSection = i;
      break;
    }
  }
  const exportDirectoryTableOffset = parseInt(
    convertRVAToFileOffset(
      EDTVirtualAddress,
      pe._IMAGE_SECTION_HEADERS[exportSection].VirtualAddress,
      pe._IMAGE_SECTION_HEADERS[exportSection].PointerToRawData
    ),
    16
  );

  // Populate export directory table
  const exportDirectoryTable = createExportDirectoryTable();
  exportDirectoryTable.Characteristics = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset
  );
  exportDirectoryTable.TimeDateStamp = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 4
  );
  exportDirectoryTable.MajorVersion = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 8
  );
  exportDirectoryTable.MinorVersion = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 10
  );
  exportDirectoryTable.Name = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 12
  );
  exportDirectoryTable.Base = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 16
  );
  exportDirectoryTable.NumberOfFunctions = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 20
  );
  exportDirectoryTable.NumberOfNames = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 24
  );
  exportDirectoryTable.AddressOfFunctions = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 28
  );
  exportDirectoryTable.AddressOfNames = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 32
  );
  exportDirectoryTable.AddressOfNameOrdinals = retrieveDWORD(
    dataBuffer,
    exportDirectoryTableOffset + 36
  );

  const exportAddressTable = [];
  const exportNameTable = [];
  const exportNameOrdinalsTable = [];

  // Iterate over all export address table entries
  // Note, these are RVAs
  const offsetOfFunctions = convertRVAToFileOffset(
    exportDirectoryTable.AddressOfFunctions,
    pe._IMAGE_SECTION_HEADERS[exportSection].VirtualAddress,
    pe._IMAGE_SECTION_HEADERS[exportSection].PointerToRawData
  );
  const offsetOfNames = convertRVAToFileOffset(
    exportDirectoryTable.AddressOfNames,
    pe._IMAGE_SECTION_HEADERS[exportSection].VirtualAddress,
    pe._IMAGE_SECTION_HEADERS[exportSection].PointerToRawData
  );
  const offsetOfNameOrdinals = convertRVAToFileOffset(
    exportDirectoryTable.AddressOfNameOrdinals,
    pe._IMAGE_SECTION_HEADERS[exportSection].VirtualAddress,
    pe._IMAGE_SECTION_HEADERS[exportSection].PointerToRawData
  );

  //Silent ignores. Offsets are out of bounds
  if(dataBuffer.length < parseInt(offsetOfFunctions, 16))
    return;

  if(dataBuffer.length < parseInt(offsetOfNames, 16))
    return;

  if(dataBuffer.length < parseInt(offsetOfNameOrdinals, 16))
    return;

  for (
    let i = 0;
    i < parseInt(exportDirectoryTable.NumberOfFunctions, 16);
    i++
  ) {
    exportAddressTable.push(
      retrieveDWORD(dataBuffer, parseInt(offsetOfFunctions, 16) + i * 4)
    );
  }
  for (let i = 0; i < parseInt(exportDirectoryTable.NumberOfNames, 16); i++) {
    exportNameTable.push(
      retrieveDWORD(dataBuffer, parseInt(offsetOfNames, 16) + i * 4)
    );
  }
  for (let i = 0; i < parseInt(exportDirectoryTable.NumberOfNames, 16); i++) {
    exportNameOrdinalsTable.push(
      retrieveWORD(dataBuffer, parseInt(offsetOfNameOrdinals, 16) + i * 2)
    );
  }
  exportDirectoryTable.exportAddressTable = exportAddressTable;
  exportDirectoryTable.exportNameTable = exportNameTable;
  exportDirectoryTable.exportNameOrdinalsTable = exportNameOrdinalsTable;

  const ordinalBias = parseInt(exportDirectoryTable.Base, 16);
  exportDirectoryTable.JASPERexports = [];
  const visitedFunctionIndices = [];
  exportNameTable.forEach((name, index) => {
    const currentNameOffset = convertRVAToFileOffset(
      name,
      pe._IMAGE_SECTION_HEADERS[exportSection].VirtualAddress,
      pe._IMAGE_SECTION_HEADERS[exportSection].PointerToRawData
    );
    const currentName = getNullTerminatedString(
      dataBuffer,
      parseInt(currentNameOffset, 16)
    );
    const currentNameOrdinal = exportNameOrdinalsTable[index];
    const currentFunction =
      exportAddressTable[parseInt(currentNameOrdinal, 16)];
    visitedFunctionIndices.push(parseInt(currentNameOrdinal, 16));
    exportDirectoryTable.JASPERexports.push({
      name: currentName,
      nameRVA: name,
      ordinal: (parseInt(currentNameOrdinal, 16) + ordinalBias)
        .toString(16)
        .toUpperCase(),
      function: currentFunction,
    });
  });

  // :(
  visitedFunctionIndices.sort((a, b) => {
    return a - b;
  });

  // Find ordinals..
  let visitIndex = 0;
  for (
    let i = 0;
    i < parseInt(exportDirectoryTable.NumberOfFunctions, 16);
    i++
  ) {
    if (visitedFunctionIndices[visitIndex] == i) {
      visitIndex++;
    } else {
      // Null functions can result from gaps in ordinals
      if (parseInt(exportAddressTable[i], 16) != 0) {
        exportDirectoryTable.JASPERexports.push({
          ordinal: (i + ordinalBias).toString(16).toUpperCase(),
          function: exportAddressTable[i],
        });
      }
    }
  }

  if (arch == 32) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[0].ExportDirectoryTable =
      exportDirectoryTable;
  }
  if (arch == 64) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[0].ExportDirectoryTable =
      exportDirectoryTable;
  }
}

function constructRelocs(pe, dataBuffer, arch) {
  let RelocsVirtualAddress;
  let RelocsSize;
  if (arch == 32) {
    if (
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[5] ==
        undefined ||
      parseInt(
        pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[5].VirtualAddress,
        16
      ) == 0
    ) {
      return;
    }
    RelocsVirtualAddress =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[5]
        .VirtualAddress;
    RelocsSize = pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[5].Size;
  }

  if (arch == 64) {
    if (
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[5] ==
        undefined ||
      parseInt(
        pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[5].VirtualAddress,
        16
      ) == 0
    ) {
      return;
    }
    RelocsVirtualAddress =
      pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[5]
        .VirtualAddress;
    RelocsSize = pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[5].Size;

  }

  let relocSection;
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
      parseInt(RelocsVirtualAddress, 16) >= currentSectionVirtualAddressStart &&
      parseInt(RelocsVirtualAddress, 16) < currentSectionVirtualAddressEnd
    ) {
      relocSection = i;
      break;
    }
  }

  let RelocsFileOffset = convertRVAToFileOffset(RelocsVirtualAddress, pe._IMAGE_SECTION_HEADERS[relocSection].VirtualAddress, pe._IMAGE_SECTION_HEADERS[relocSection].PointerToRawData);

  let currentOffset = 0;
  const relocs = [];
  let blockCounter = 0;
  
  while(currentOffset < parseInt(RelocsSize, 16)){
    blockCounter = currentOffset;
    let currentPageRVA = retrieveDWORD(dataBuffer, parseInt(RelocsFileOffset, 16) + currentOffset);
    currentOffset += 4;
    let currentBlockSize = retrieveDWORD(dataBuffer, parseInt(RelocsFileOffset, 16) + currentOffset);
    currentOffset += 4;

    let relocations = [];

    while(parseInt(RelocsFileOffset, 16) + currentOffset < parseInt(RelocsFileOffset, 16) + parseInt(currentBlockSize, 16) + blockCounter)
    {
      let currentTypeOffset = retrieveWORD(dataBuffer, parseInt(RelocsFileOffset, 16) + currentOffset);
      let offset = parseInt(currentTypeOffset, 16) & 0x0FFF;
      let type = (parseInt(currentTypeOffset, 16) & 0xF000) >> 12;
      currentOffset += 2;
      relocations.push({offset: offset.toString(16).toUpperCase(), type: type.toString(16).toUpperCase()});
    }
    relocs.push({pageRVA: currentPageRVA, blockSize: currentBlockSize, relocations});
  }

  if (arch == 32) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[5].Pages = relocs;
  }
  if (arch == 64) {
    pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[5].Pages = relocs;
  }  
}
// 32 - 126
function strings(dataBuffer, nullTerminated){
  const strings = [];
  let position = 0;
  let buffer = "";
  let minLength = 4;
  let currentLength = 0;
  let offset = null;
  while(position < dataBuffer.length){
    if(dataBuffer[position] < 127 && dataBuffer[position] > 31){
      buffer += String.fromCharCode(dataBuffer[position]);
      currentLength += 1;
      if(offset == null){
        offset = position;
      }
    } else {
      if(currentLength >= minLength && dataBuffer[position] == 0x00 && nullTerminated){
        strings.push({offset, buffer});
      }
      if(currentLength >= minLength && !nullTerminated){
        strings.push({offset, buffer});
      }
      buffer = "";
      currentLength = 0;
      offset = null;
    }
    position += 1;
  }
  return strings;
}

export { analyze, determineArchitecture, strings };
