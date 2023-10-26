import { calcAddressOffset, hex2string } from "../peAnalyze";
import './SectionHeaders.css';

function SectionHeaders(props) {
  const sectionHeader = props.sectionHeaders.map((header, index) => {
    return (
      <>
        {/* <div>Section name: {hex2string(header.Name)}</div> */}
        <table key={index}>
          <thead>
            <tr>
              <th colspan="3">Section name: <b>{hex2string(header.Name)}</b></th>
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
              <td>{header.PhyAdd_VirSize}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 12)}</td>
              <td>VirtualAddress</td>
              <td>{header.VirtualAddress}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 16)}</td>
              <td>SizeOfRawData</td>
              <td>{header.SizeOfRawData}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 20)}</td>
              <td>PointerToRawData</td>
              <td>{header.PointerToRawData}</td>
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
              <td>{header.Characteristics}</td>
            </tr>
          </tbody>
        </table>
      </>
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
