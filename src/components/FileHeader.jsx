import { calcAddressOffset } from "../peAnalyze";
import { useState } from "react";
import "./FileHeader.css";

function FileHeader(props) {
  const fileHeader = props.fileHeader;
  const headerOffset = props.headerOffset;
  const signature = props.signature;

  // return (
  //   <div id="nt-header-wrapper">
  //     <div className="header-wrapper">
  //       <div className="header">File Header</div>
  //     </div>
  //       <div>
  //         <div className="table">
  //           <div className="three-column">
  //             <div width="10%" className="three-column-item">
  //               OFFSET
  //             </div>
  //             <div className="three-column-item">NAME</div>
  //             <div className="three-column-item">VALUE</div>
  //           </div>
  //           <div className="three-column">
  //             <div className="three-column-item">0x{calcAddressOffset(headerOffset, 0)}</div>
  //             <div className="three-column-item">Signature</div>
  //             <div className="three-column-item">{signature}</div>
  //           </div>
  //           <div className="three-column">
  //             <div className="three-column-item">0x{calcAddressOffset(headerOffset, 4)}</div>
  //             <div className="three-column-item">Machine</div>
  //             <div className="three-column-item">{fileHeader.Machine}</div>
  //           </div>
  //           <div className="three-column">
  //             <div className="three-column-item">0x{calcAddressOffset(headerOffset, 6)}</div>
  //             <div className="three-column-item">NumberOfSections</div>
  //             <div className="three-column-item">{fileHeader.NumberOfSections}</div>
  //           </div>
  //           <div className="three-column">
  //             <div className="three-column-item">0x{calcAddressOffset(headerOffset, 8)}</div>
  //             <div className="three-column-item">TimeDateStamp</div>
  //             <div className="three-column-item">{fileHeader.TimeDateStamp}</div>
  //           </div>
  //           <div className="three-column">
  //             <div className="three-column-item">0x{calcAddressOffset(headerOffset, 12)}</div>
  //             <div className="three-column-item">PointerToSymbolTable</div>
  //             <div className="three-column-item">{fileHeader.PointerToSymbolTable}</div>
  //           </div>
  //           <div className="three-column">
  //             <div className="three-column-item">0x{calcAddressOffset(headerOffset, 16)}</div>
  //             <div className="three-column-item">NumberOfSymbols</div>
  //             <div className="three-column-item">{fileHeader.NumberOfSymbols}</div>
  //           </div>
  //           <div className="three-column">
  //             <div className="three-column-item">0x{calcAddressOffset(headerOffset, 20)}</div>
  //             <div className="three-column-item">SizeOfOptionalHeader</div>
  //             <div className="three-column-item">{fileHeader.SizeOfOptionalHeader}</div>
  //           </div>
  //           <div className="three-column">
  //             <div className="three-column-item">0x{calcAddressOffset(headerOffset, 22)}</div>
  //             <div className="three-column-item">Characteristics</div>
  //             <div className="three-column-item">{fileHeader.Characteristics}</div>
  //           </div>
  //         </div>
  //       </div>
  //   </div>
  // );
  return (
    <div id="nt-header-wrapper">
      <div className="header-wrapper">
        <div className="header">File Header</div>
      </div>
      <div className="header-sub-text">
          NT_FILE_HEADER
        </div>
      <div>
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
              <td>0x{calcAddressOffset(headerOffset, 0)}</td>
              <td>Signature</td>
              <td>{signature}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(headerOffset, 4)}</td>
              <td>Machine</td>
              <td>{fileHeader.Machine}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(headerOffset, 6)}</td>
              <td>NumberOfSections</td>
              <td>{fileHeader.NumberOfSections}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(headerOffset, 8)}</td>
              <td>TimeDateStamp</td>
              <td>{fileHeader.TimeDateStamp}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(headerOffset, 12)}</td>
              <td>PointerToSymbolTable</td>
              <td>{fileHeader.PointerToSymbolTable}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(headerOffset, 16)}</td>
              <td>NumberOfSymbols</td>
              <td>{fileHeader.NumberOfSymbols}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(headerOffset, 20)}</td>
              <td>SizeOfOptionalHeader</td>
              <td>{fileHeader.SizeOfOptionalHeader}</td>
            </tr>
            <tr>
              <td>0x{calcAddressOffset(headerOffset, 22)}</td>
              <td>Characteristics</td>
              <td>{fileHeader.Characteristics}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileHeader;
