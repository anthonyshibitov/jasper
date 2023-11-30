import { calcAddressOffset } from "../peHelpers";
import { useState } from "react";
import "./FileHeader.css";

function FileHeader(props) {
  const fileHeader = props.fileHeader;
  const headerOffset = props.headerOffset;
  const signature = props.signature;

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
