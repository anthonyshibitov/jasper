import { calcAddressOffset } from "../peAnalyze";
import { useState } from "react";

function FileHeader(props) {
  const fileHeader = props.fileHeader;
  const headerOffset = props.headerOffset;
  const signature = props.signature;

  const [show, setShow] = useState(false);
  const [toggleText, setToggleText] = useState("Show");

  const toggle = function () {
    if (show) {
      setShow(false);
      setToggleText("Show");
    } else {
      setShow(true);
      setToggleText("Hide");
    }
  };

  return (
    <div id="nt-header-wrapper">
      <div className="header-wrapper">
        <div className="header">File Header</div>
        <div className="toggle" onClick={() => toggle()}>
          {toggleText}
        </div>
      </div>
      {show && (
        <div>
          <div className="table">
            <div className="three-column">
              <div width="10%" className="three-column-item">
                OFFSET
              </div>
              <div className="three-column-item">NAME</div>
              <div className="three-column-item">VALUE</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x{calcAddressOffset(headerOffset, 0)}</div>
              <div className="three-column-item">Signature</div>
              <div className="three-column-item">{signature}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x{calcAddressOffset(headerOffset, 4)}</div>
              <div className="three-column-item">Machine</div>
              <div className="three-column-item">{fileHeader.Machine}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x{calcAddressOffset(headerOffset, 6)}</div>
              <div className="three-column-item">NumberOfSections</div>
              <div className="three-column-item">{fileHeader.NumberOfSections}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x{calcAddressOffset(headerOffset, 8)}</div>
              <div className="three-column-item">TimeDateStamp</div>
              <div className="three-column-item">{fileHeader.TimeDateStamp}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x{calcAddressOffset(headerOffset, 12)}</div>
              <div className="three-column-item">PointerToSymbolTable</div>
              <div className="three-column-item">{fileHeader.PointerToSymbolTable}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x{calcAddressOffset(headerOffset, 16)}</div>
              <div className="three-column-item">NumberOfSymbols</div>
              <div className="three-column-item">{fileHeader.NumberOfSymbols}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x{calcAddressOffset(headerOffset, 20)}</div>
              <div className="three-column-item">SizeOfOptionalHeader</div>
              <div className="three-column-item">{fileHeader.SizeOfOptionalHeader}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x{calcAddressOffset(headerOffset, 22)}</div>
              <div className="three-column-item">Characteristics</div>
              <div className="three-column-item">{fileHeader.Characteristics}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileHeader;
