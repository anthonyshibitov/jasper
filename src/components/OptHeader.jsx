import { calcAddressOffset } from "../peHelpers";
import "./OptHeader.css";

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
          if (arch == 32) dataDirectoryName = "IMAGE_DIRECTORY_ENTRY_COPYRIGHT"; //x86 usage, IMAGE_DIRECTORY_ENTRY_ARCHITECTURE otherwise
          if (arch == 64)
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
        <tr key={index}>
          <td>
            {index}:{dataDirectoryName}
          </td>
          <td>{directory.VirtualAddress}</td>
          <td>{directory.Size}</td>
        </tr>
      );
    }
  );

  console.log("DLL CHARS", parseInt(optionalHeader.DllCharacteristics, 16));
  console.log("DLL HEX", optionalHeader.DllCharacteristics);

  return (
    <div id="optional-header-wrapper">
      <div className="header-wrapper">
        <div className="header">Optional Header</div>
      </div>
      <div className="header-sub-text">NT_OPTIONAL_HEADER</div>
      <div></div>
      <table>
        <thead>
          <tr>
            <th>OFFSET</th>
            <th>NAME</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody className="third-color">
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 24)}</td>
            <td>Magic</td>
            <td>{optionalHeader.Magic}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 26)}</td>
            <td>MajorLinkerVersion</td>
            <td>{optionalHeader.MajorLinkerVersion}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 27)}</td>
            <td>MinorLinkerVersion</td>
            <td>{optionalHeader.MinorLinkerVersion}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 28)}</td>
            <td>SizeOfCode</td>
            <td>{optionalHeader.SizeOfCode}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 32)}</td>
            <td>SizeOfInitializedData</td>
            <td>{optionalHeader.SizeOfInitializedData}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 36)}</td>
            <td>SizeOfUninitializedData</td>
            <td>{optionalHeader.SizeOfUninitializedData}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 40)}</td>
            <td>AddressOfEntryPoint</td>
            <td>{optionalHeader.AddressOfEntryPoint}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 44)}</td>
            <td>BaseOfCode</td>
            <td>{optionalHeader.BaseOfCode}</td>
          </tr>
          {arch == 32 && (
            <tr>
              <td>0x{calcAddressOffset(headerOffset, 48)}</td>
              <td>BaseOfData</td>
              <td>{optionalHeader.BaseOfData}</td>
            </tr>
          )}
          <tr>
            <td>0x{calcAddressOffset(headerOffset, arch == 32 ? 52 : 48)}</td>
            <td>ImageBase</td>
            <td>{optionalHeader.ImageBase}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 56)}</td>
            <td>SectionAlignment</td>
            <td>{optionalHeader.SectionAlignment}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 60)}</td>
            <td>FileAlignment</td>
            <td>{optionalHeader.FileAlignment}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 64)}</td>
            <td>MajorOperatingSystemVersion</td>
            <td>{optionalHeader.MajorOperatingSystemVersion}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 66)}</td>
            <td>MinorOperatingSystemVersion</td>
            <td>{optionalHeader.MinorOperatingSystemVersion}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 68)}</td>
            <td>MajorImageVersion</td>
            <td>{optionalHeader.MajorImageVersion}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 70)}</td>
            <td>MinorImageVersion</td>
            <td>{optionalHeader.MinorImageVersion}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 72)}</td>
            <td>MajorSubsystemVersion</td>
            <td>{optionalHeader.MajorSubsystemVersion}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 74)}</td>
            <td>MinorSubsystemVersion</td>
            <td>{optionalHeader.MinorSubsystemVersion}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 76)}</td>
            <td>Win32VersionValue</td>
            <td>{optionalHeader.Win32VersionValue}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 80)}</td>
            <td>SizeOfImage</td>
            <td>{optionalHeader.SizeOfImage}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 84)}</td>
            <td>SizeOfHeaders</td>
            <td>{optionalHeader.SizeOfHeaders}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 88)}</td>
            <td>CheckSum</td>
            <td>{optionalHeader.CheckSum}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 92)}</td>
            <td>Subsystem</td>
            <td>{optionalHeader.Subsystem}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 94)}</td>
            <td>DllCharacteristics</td>
            <td>
              {optionalHeader.DllCharacteristics}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x8000) ==
                0x8000 && (
                <div>
                  TerminalServerAware: The image is Terminal Server aware.
                </div>
              )}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x2000) ==
                0x2000 && <div>WdmDriver: The driver uses the WDM model.</div>}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x1000) ==
                0x1000 && (
                <div>
                  AppContainer: The image must run inside an AppContainer.
                </div>
              )}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x800) ==
                0x800 && <div>NoBind: Do not bind this image.</div>}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x400) ==
                0x400 && (
                <div>
                  NoSeh: The image does not use SEH. No SE handler may reside in
                  this image.
                </div>
              )}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x400) ==
                0x400 && (
                <div>
                  NoSeh: The image does not use SEH. No SE handler may reside in
                  this image.
                </div>
              )}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x200) ==
                0x200 && (
                <div>
                  NoIsolation: The image understands isolation and doesn't want
                  it.
                </div>
              )}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x100) ==
                0x100 && <div>NxCompatible: The image is NX compatible.</div>}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x40) ==
                0x40 && <div>DynamicBase: The DLL can be relocated.</div>}
              {(parseInt(optionalHeader.DllCharacteristics, 16) & 0x20) ==
                0x20 && (
                <div>
                  HighEntropyVirtualAddressSpace: The image can handle a high
                  entropy 64-bit virtual address space.
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, 96)}</td>
            <td>SizeOfStackReserve</td>
            <td>{optionalHeader.SizeOfStackReserve}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, arch == 32 ? 100 : 104)}</td>
            <td>SizeOfStackCommit</td>
            <td>{optionalHeader.SizeOfStackCommit}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, arch == 32 ? 104 : 112)}</td>
            <td>SizeOfHeapReserve</td>
            <td>{optionalHeader.SizeOfHeapReserve}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, arch == 32 ? 108 : 120)}</td>
            <td>SizeOfHeapCommit</td>
            <td>{optionalHeader.SizeOfHeapCommit}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, arch == 32 ? 112 : 128)}</td>
            <td>LoaderFlags</td>
            <td>{optionalHeader.LoaderFlags}</td>
          </tr>
          <tr>
            <td>0x{calcAddressOffset(headerOffset, arch == 32 ? 116 : 132)}</td>
            <td>NumberOfRvaAndSizes</td>
            <td>{optionalHeader.NumberOfRvaAndSizes}</td>
          </tr>
        </tbody>
      </table>
      <div className="header-wrapper">
        <div className="header">Data Directories</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>DIRECTORY NAME</th>
            <th>RVA</th>
            <th>SIZE</th>
          </tr>
        </thead>
        <tbody>{DataDirectories}</tbody>
      </table>
    </div>
  );
}

export default OptHeader;
