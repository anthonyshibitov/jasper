import { calcAddressOffset } from "../peAnalyze";

function OptHeader(props){

    const optionalHeader = props.optionalHeader;
    const headerOffset = props.headerOffset;

    const DataDirectories = optionalHeader.DataDirectory.map(
        (directory, index) => {
          let dataDirectoryName;
          switch (index) {
            case 0:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_EXPORT";
              break;
            case 1:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_IMPORT";
              break;
            case 2:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_RESOURCE";
              break;
            case 3:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_EXCEPTION";
              break;
            case 4:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_SECURITY";
              break;
            case 5:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_BASERELOC";
              break;
            case 6:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_DEBUG";
              break;
            case 7:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_COPYRIGHT"; //x86 usage, IMAGE_DIRECTORY_ENTRY_ARCHITECTURE otherwise
              break;
            case 8:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_GLOBALPTR";
              break;
            case 9:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_TLS";
              break;
            case 10:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG";
              break;
            case 11:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT";
              break;
            case 12:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_IAT";
              break;
            case 13:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT";
              break;
            case 14:
              dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_COM_DESCRIPTOR";
              break;
            case 15:
              dataDirectoryName = "Reserved, must be zero";
              break;
            default:
              break;
          }
          return (
            <div key={index}>
              Directory {index}: {dataDirectoryName}, VirtualAddress:{" "}
              {directory.VirtualAddress}, Size: {directory.Size}
            </div>
          );
        }
      );

    return (
        <div>
        _IMAGE_OPTIONAL_HEADER:
        <div>offset, name, value</div>
        <div>
          0x{calcAddressOffset(headerOffset, 24)} Magic {optionalHeader.Magic}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 26)} MajorLinkerVersion{" "}
          {optionalHeader.MajorLinkerVersion}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 27)} MinorLinkerVersion{" "}
          {optionalHeader.MinorLinkerVersion}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 28)} SizeOfCode{" "}
          {optionalHeader.SizeOfCode}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 32)} SizeOfInitializedData{" "}
          {optionalHeader.SizeOfInitializedData}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 36)} SizeOfUninitializedData{" "}
          {optionalHeader.SizeOfUninitialized}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 40)} AddressOfEntryPoint{" "}
          {optionalHeader.AddressOfEntryPoint}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 44)} BaseOfCode{" "}
          {optionalHeader.BaseOfCode}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 48)} BaseOfData{" "}
          {optionalHeader.BaseOfData}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 52)} ImageBase{" "}
          {optionalHeader.ImageBase}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 56)} SectionAlignment{" "}
          {optionalHeader.SectionAlignment}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 60)} FileAlignment{" "}
          {optionalHeader.FileAlignment}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 64)} MajorOperatingSystemVersion{" "}
          {optionalHeader.MajorOperatingSystemVersion}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 66)} MinorOperatingSystemVersion{" "}
          {optionalHeader.MinorOperatingSystemVersion}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 68)} MajorImageVersion{" "}
          {optionalHeader.MajorImageVersion}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 70)} MinorImageVersion{" "}
          {optionalHeader.MinorImageVersion}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 72)} MajorSubsystemVersion{" "}
          {optionalHeader.MajorSubsystemVersion}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 74)} MinorSubsystemVersion{" "}
          {optionalHeader.MinorSubsystemVersion}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 76)} Win32VersionValue{" "}
          {optionalHeader.Win32VersionValue}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 80)} SizeOfImage{" "}
          {optionalHeader.SizeOfImage}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 84)} SizeOfHeaders{" "}
          {optionalHeader.SizeOfHeaders}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 88)} CheckSum{" "}
          {optionalHeader.CheckSum}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 92)} Subsystem{" "}
          {optionalHeader.Subsystem}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 94)} DllCharacteristics{" "}
          {optionalHeader.DllCharacteristics}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 96)} SizeOfStackReserve{" "}
          {optionalHeader.SizeOfStackReserve}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 100)} SizeOfStackCommit{" "}
          {optionalHeader.SizeOfStackCommit}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 104)} SizeOfHeapReserve{" "}
          {optionalHeader.SizeOfHeapReserve}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 108)} SizeOfHeapCommit{" "}
          {optionalHeader.SizeOfHeapCommit}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 112)} LoaderFlags{" "}
          {optionalHeader.LoaderFlags}
        </div>
        <div>
          0x{calcAddressOffset(headerOffset, 116)} NumberOfRvaAndSizes{" "}
          {optionalHeader.NumberOfRvaAndSizes}
        </div>
        Directories: {DataDirectories}
      </div>
    )
}

export default OptHeader;