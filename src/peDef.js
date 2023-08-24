/* ------------------------------------- */
/* ------------------------------------- */
/* ------------------------------------- */

const createImageThunkData = function(){
    
}

const createImageImportDescriptor = function() {
    return {
        OriginalFirstThunk: null, //DWORD
        TimeDateStamp: null, //DWORD
        ForwarderChain: null, //DWORD
        Name: null, //DWORD
        FirstThunk: null, //DWORD
    }
}

const createSectionHeader = function(){
    return {
        Name: null, //8 BYTES, QWORD
        PhyAdd_VirSiz: null, //DWORD
        VirtualAddress: null, //DWORD
        SizeOfRawData: null, //DWORD
        PointerToRawData: null, //DWORD
        PointerToRelocations: null, //DWORD
        PointerToLinenumbers: null, //DWORD
        NumberOfRelocations: null, //WORD
        NumberOfLinenumbers: null, //WORD
        Characteristics: null, //DWORD
        JASPER_SECTION_OFFSET: null,
    }
}

const createSectionTable = function(){
    return {
        SectionTable: null, //ARRAY OF _IMAGE_SECTION_HEADERs
    }
}

const createImageDataDirectory = function () {
  return {
    VirtualAddress: null, //DWORD
    Size: null, //DWORD
  };
};

const createOptionalHeader32 = function () {
  return {
    //Standard fields
    Magic: null, //WORD
    MajorLinkerVersion: null, //BYTE
    MinorLinkerVersion: null, //BYTE
    SizeOfCode: null, //DWORD
    SizeOfInitializedData: null, //DWORD
    SizeOfUninitializedData: null, //DWORD
    AddressOfEntryPoint: null, //DWORD
    BaseOfCode: null, //DWORD
    BaseOfData: null, //DWORD
    //NT additional fields
    ImageBase: null, //DWORD
    SectionAlignment: null, //DWORD
    FileAlignment: null, //DWORD
    MajorOperatingSystemVersion: null, //WORD
    MinorOperatingSystemVersion: null, //WORD
    MajorImageVersion: null, //WORD
    MinorImageVersion: null, //WORD
    MajorSubsystemVersion: null, //WORD
    MinorSubsystemVersion: null, //WORD
    Win32VersionValue: null, //DWORD
    SizeOfImage: null, //DWORD
    SizeOfHeaders: null, //DWORD
    CheckSum: null, //DWORD
    Subsystem: null, //WORD
    DllCharacteristics: null, //WORD
    SizeOfStackReserve: null, //DWORD
    SizeOfStackCommit: null, //DWORD
    SizeOfHeapReserve: null, //DWORD
    SizeOfHeapCommit: null, //DWORD
    LoaderFlags: null, //DWORD
    NumberOfRvaAndSizes: null, //WORD
    DataDirectory: [], //IMAGE_DATA_DIRECTORY
  };
};

const createFileHeader = function () {
  return {
    Machine: null, //WORD
    NumberOfSections: null, //WORD
    TimeDateStamp: null, //DWORD
    PointerToSymbolTable: null, //DWORD
    NumberOfSymbols: null, //DWORD
    SizeOfOptionalHeader: null, //WORD
    Characteristics: null, //WORD
  };
};

const createNtHeader = function (is64) {
  if (!is64) {
    return {
      Signature: null, //DWORD
      _IMAGE_FILE_HEADER: createFileHeader(),
      _IMAGE_OPTIONAL_HEADER32: createOptionalHeader32(),
    };
  }
};

const createDosHeader = function () {
  return {
    e_magic: null, //WORD
    e_cblp: null, //WORD
    e_cp: null, //WORD
    e_crlc: null, //WORD
    e_cparhdr: null, //WORD
    e_minalloc: null, //WORD
    e_maxalloc: null, //WORD
    e_ss: null, //WORD
    e_sp: null, //WORD
    e_csum: null, //WORD
    e_ip: null, //WORD
    e_cs: null, //WORD
    e_lfarlc: null, //WORD
    e_ovno: null, //WORD
    e_res: null, //WORD
    e_oemid: null, //WORD
    e_oeminfo: null, //WORD
    e_res2: null, //WORD
    e_lfanew: null, //LONG
  };
};

const createPe = function () {
  return {
    _IMAGE_DOS_HEADER: createDosHeader(),
    _IMAGE_NT_HEADER: createNtHeader(false),
    _IMAGE_SECTION_HEADERS: [],
    _IMAGE_SECTIONS: [],
    JasperInfo: {},
  };
};

export { createPe, createImageDataDirectory, createSectionHeader, createSectionTable, createImageImportDescriptor };
