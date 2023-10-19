import { calcAddressOffset } from "../peAnalyze";

function OptHeader(props) {
  const optionalHeader = props.optionalHeader;
  const headerOffset = props.headerOffset;
  const arch = props.arch;

  console.log(arch, "ARCH");

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
          if(arch == 32)
            dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_COPYRIGHT"; //x86 usage, IMAGE_DIRECTORY_ENTRY_ARCHITECTURE otherwise
          if(arch == 64)
            dataDirectoryName = "IMAGE_DIRECTORY_ENTRTY_ARCHITECTURE";
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
          dataDirectoryName = "RESERVED";
          break;
        default:
          break;
      }
      return (
        <div className="three-column" key={index}>
          <div className="three-column-item">{index}:{dataDirectoryName}</div>
          <div className="three-column-item">{directory.VirtualAddress}</div>
          <div className="three-column-item">{directory.Size}</div>
        </div>
      );
    }
  );

  return (
    <div className="table">
      _IMAGE_OPTIONAL_HEADER:
      <div className="three-column">
        <div width="10%" className="three-column-item">
          OFFSET
        </div>
        <div className="three-column-item">NAME</div>
        <div className="three-column-item">VALUE</div>
      </div>
        <>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 24)}</div>
            <div className="three-column-item">Magic</div>
            <div className="three-column-item">{optionalHeader.Magic}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 26)}</div>
            <div className="three-column-item">MajorLinkerVersion</div>
            <div className="three-column-item">{optionalHeader.MajorLinkerVersion}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 27)}</div>
            <div className="three-column-item">MinorLinkerVersion</div>
            <div className="three-column-item">{optionalHeader.MinorLinkerVersion}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 28)}</div>
            <div className="three-column-item">SizeOfCode</div>
            <div className="three-column-item">{optionalHeader.SizeOfCode}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 32)}</div>
            <div className="three-column-item">SizeOfInitializedData</div>
            <div className="three-column-item">{optionalHeader.SizeOfInitializedData}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 36)}</div>
            <div className="three-column-item">SizeOfUninitializedData</div>
            <div className="three-column-item">{optionalHeader.SizeOfUninitialized}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 40)}</div>
            <div className="three-column-item">AddressOfEntryPoint</div>
            <div className="three-column-item">{optionalHeader.AddressOfEntryPoint}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 44)}</div>
            <div className="three-column-item">BaseOfCode</div>
            <div className="three-column-item">{optionalHeader.BaseOfCode}</div>
          </div>
          {arch == 32 &&
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 48)}</div>
            <div className="three-column-item">BaseOfData</div>
            <div className="three-column-item">{optionalHeader.BaseOfData}</div>
          </div>
          }
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, (arch == 32 ? 52 : 48))}</div>
            <div className="three-column-item">ImageBase</div>
            <div className="three-column-item">{optionalHeader.ImageBase}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 56)}</div>
            <div className="three-column-item">SectionAlignment</div>
            <div className="three-column-item">{optionalHeader.SectionAlignment}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 60)}</div>
            <div className="three-column-item">FileAlignment</div>
            <div className="three-column-item">{optionalHeader.FileAlignment}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 64)}</div>
            <div className="three-column-item">MajorOperatingSystemVersion</div>
            <div className="three-column-item">{optionalHeader.MajorOperatingSystemVersion}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 66)}</div>
            <div className="three-column-item">MinorOperatingSystemVersion</div>
            <div className="three-column-item">{optionalHeader.MinorOperatingSystemVersion}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 68)}</div>
            <div className="three-column-item">MajorImageVersion</div>
            <div className="three-column-item">{optionalHeader.MajorImageVersion}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 70)}</div>
            <div className="three-column-item">MinorImageVersion</div>
            <div className="three-column-item">{optionalHeader.MinorImageVersion}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 72)}</div>
            <div className="three-column-item">MajorSubsystemVersion</div>
            <div className="three-column-item">{optionalHeader.MajorSubsystemVersion}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 74)}</div>
            <div className="three-column-item">MinorSubsystemVersion</div>
            <div className="three-column-item">{optionalHeader.MinorSubsystemVersion}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 76)}</div>
            <div className="three-column-item">Win32VersionValue</div>
            <div className="three-column-item">{optionalHeader.Win32VersionValue}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 80)}</div>
            <div className="three-column-item">SizeOfImage</div>
            <div className="three-column-item">{optionalHeader.SizeOfImage}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 84)}</div>
            <div className="three-column-item">SizeOfHeaders</div>
            <div className="three-column-item">{optionalHeader.SizeOfHeaders}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 88)}</div>
            <div className="three-column-item">CheckSum</div>
            <div className="three-column-item">{optionalHeader.CheckSum}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 92)}</div>
            <div className="three-column-item">Subsystem</div>
            <div className="three-column-item">{optionalHeader.Subsystem}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 94)}</div>
            <div className="three-column-item">DllCharacteristics</div>
            <div className="three-column-item">{optionalHeader.DllCharacteristics}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, 96)}</div>
            <div className="three-column-item">SizeOfStackReserve</div>
            <div className="three-column-item">{optionalHeader.SizeOfStackReserve}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, (arch == 32 ? 100 : 104))}</div>
            <div className="three-column-item">SizeOfStackCommit</div>
            <div className="three-column-item">{optionalHeader.SizeOfStackCommit}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, (arch == 32 ? 104 : 112))}</div>
            <div className="three-column-item">SizeOfHeapReserve</div>
            <div className="three-column-item">{optionalHeader.SizeOfHeapReserve}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, (arch == 32 ? 108 : 120))}</div>
            <div className="three-column-item">SizeOfHeapCommit</div>
            <div className="three-column-item">{optionalHeader.SizeOfHeapCommit}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, (arch == 32 ? 112 : 128))}</div>
            <div className="three-column-item">LoaderFlags</div>
            <div className="three-column-item">{optionalHeader.LoaderFlags}</div>
          </div>
          <div className="three-column">
            <div className="three-column-item">0x{calcAddressOffset(headerOffset, (arch == 32 ? 116 : 132))}</div>
            <div className="three-column-item">NumberOfRvaAndSizes</div>
            <div className="three-column-item">{optionalHeader.NumberOfRvaAndSizes}</div>
          </div>
        </>
    </div>
  );
}

export default OptHeader;
