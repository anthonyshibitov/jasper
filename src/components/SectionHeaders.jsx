import { calcAddressOffset, hex2string } from "../peHelpers";
import "./SectionHeaders.css";

function SectionHeaders(props) {
  const sectionHeader = props.sectionHeaders.map((header, index) => {
    console.log(parseInt(header.Characteristics, 16));
    console.log(header.Characteristics);
    return (
      <div key={index}>
        {/* <div>Section name: {hex2string(header.Name)}</div> */}
        <table>
          <thead>
            <tr>
              <th colSpan="3">
                Section name: <b>{hex2string(header.Name)}</b>
              </th>
            </tr>
            <tr>
              <th>OFFSET</th>
              <th>NAME</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody className="third-color">
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 8)}</td>
              <td>PhysicalAddress/VirtualSize</td>
              <td className={parseInt(header.PhyAdd_VirSize, 16) == 0 ? 'dll-name' : null}>{header.PhyAdd_VirSize}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 12)}</td>
              <td>VirtualAddress</td>
              <td className={parseInt(header.VirtualAddress, 16) == 0 ? 'dll-name' : null}>{header.VirtualAddress}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 16)}</td>
              <td>SizeOfRawData</td>
              <td className={parseInt(header.SizeOfRawData, 16) == 0 ? 'dll-name' : null}>{header.SizeOfRawData}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 20)}</td>
              <td>PointerToRawData</td>
              <td className={parseInt(header.PointerToRawData, 16) == 0 ? 'dll-name' : null}>{header.PointerToRawData}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 24)}</td>
              <td>PointerToRelocations</td>
              <td>{header.PointerToRelocations}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 28)}</td>
              <td>PointerToLinenumbers</td>
              <td>{header.PointerToLinenumbers}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 32)}</td>
              <td>NumberOfRelocations</td>
              <td>{header.NumberOfRelocations}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 34)}</td>
              <td>NumberOfLinenumbers</td>
              <td>{header.NumberOfLinenumbers}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 36)}</td>
              <td>Characteristics</td>
              <td>
                {header.Characteristics}
                {((parseInt(header.Characteristics, 16) & 0x8) >>> 0) == 0x8 && (
                    <div>IMAGE_SCN_TYPE_NO_PAD: The section should not be padded to the next boundary. This flag is obsolete and is replaced by IMAGE_SCN_ALIGN_1BYTES. This is valid only for object files.</div>
                )}
                {((parseInt(header.Characteristics, 16) & 0x20) >>> 0) == 0x20 && (
                    <div>IMAGE_SCN_CNT_CODE: The section contains executable code.</div>
                )}
                {((parseInt(header.Characteristics, 16) & 0x40) >>> 0) == 0x40 && (
                    <div>IMAGE_SCN_CNT_INITIALIZED_DATA: The section contains initialized data.</div>
                )}
                {((parseInt(header.Characteristics, 16) & 0x80) >>> 0) == 0x80 && (
                    <div>IMAGE_SCN_CNT_UNINITIALIZED_DATA: The section contains uninitialized data.</div>
                )}
                {((parseInt(header.Characteristics, 16) & 0x200) >>> 0) == 0x200 && (
                    <div>IMAGE_SCN_LNK_INFO: The section contains comments or other information. The .drectve section has this type. This is valid for object files only.</div>
                )}
                {((parseInt(header.Characteristics, 16) & 0x800) >>> 0) == 0x800 && (
                    <div>IMAGE_SCN_LNK_REMOVE: The section will not become part of the image. This is valid only for object files.</div>
                )}
                {((parseInt(header.Characteristics, 16) & 0x1000) >>> 0) == 0x1000 && (
                    <div>IMAGE_SCN_LNK_COMDAT: The section contains COMDAT data. This is valid only for object files.</div>
                )}
                {((parseInt(header.Characteristics, 16) & 0x8000) >>> 0) == 0x8000 && (
                    <div>IMAGE_SCN_GPREL: The section contains data referenced through the global pointer (GP).</div>
                )}
                {/* PUT ALIGNMENTS IN HERE */}
                {((parseInt(header.Characteristics, 16) & 0x01000000) >>> 0) == 0x01000000 && (
                    <div>IMAGE_SCN_LNK_NRELOC_OVFL: The section contains extended relocations.</div>
                )} 
                {((parseInt(header.Characteristics, 16) & 0x02000000) >>> 0) == 0x02000000 && (
                    <div>IMAGE_SCN_MEM_DISCARDABLE: The section can be discarded as needed.</div>
                )} 
                {((parseInt(header.Characteristics, 16) & 0x04000000) >>> 0)== 0x04000000 && (
                    <div>IMAGE_SCN_MEM_NOT_CACHED: The section cannot be cached.</div>
                )}
                {((parseInt(header.Characteristics, 16) & 0x08000000) >>> 0)== 0x08000000 && (
                    <div>IMAGE_SCN_MEM_NOT_PAGED: The section is not pageable.</div>
                )} 
                {((parseInt(header.Characteristics, 16) & 0x10000000) >>> 0)== 0x10000000 && (
                    <div>IMAGE_SCN_MEM_SHARED: The section can be shared in memory.</div>
                )} 
                {((parseInt(header.Characteristics, 16) & 0x20000000) >>> 0)== 0x20000000 && (
                    <div>IMAGE_SCN_MEM_EXECUTE: The section can be executed as code.</div>
                )} 
                {((parseInt(header.Characteristics, 16) & 0x40000000) >>> 0) == 0x40000000 && (
                    <div>IMAGE_SCN_MEM_READ: The section can be read.</div>
                )}
                {((parseInt(header.Characteristics, 16) & 0x80000000) >>> 0) == 0x80000000 && (
                    <div>IMAGE_SCN_MEM_WRITE: The section can be written to.</div>
                )}
{/*                 
                {(parseInt(header.Characteristics, 16) & 0x) == 0x && (
                    <div>X : X</div>
                )} 
                */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });


  return (
    <div className="section-wrapper">
      <div className="header-wrapper">
        <div className="header">Sections</div>
      </div>
      <div className="header-sub-text">Sections</div>
      <div className="table-wrapper">{sectionHeader}</div>
    </div>
  );
}

export default SectionHeaders;
