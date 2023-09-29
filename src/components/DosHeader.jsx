import { useState } from "react";
import "./DosHeader.css";

function DosHeader(props) {
  const dosHeader = props.dosHeader;

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
    <div id="dos-header-wrapper">
      <div className="header-wrapper" onClick={() => toggle()}>
        <div className="header">DOS Header</div>
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
              <div className="three-column-item">0x00</div>
              <div className="three-column-item">e_magic</div>
              <div className="three-column-item">{dosHeader.e_magic}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x02</div>
              <div className="three-column-item">e_cblp</div>
              <div className="three-column-item">{dosHeader.e_cblp}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x04</div>
              <div className="three-column-item">e_cp</div>
              <div className="three-column-item">{dosHeader.e_cp}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x06</div>
              <div className="three-column-item">e_crlc</div>
              <div className="three-column-item">{dosHeader.e_crlc}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x08</div>
              <div className="three-column-item">e_cparhdr</div>
              <div className="three-column-item">{dosHeader.e_cparhdr}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x0A</div>
              <div className="three-column-item">e_minalloc</div>
              <div className="three-column-item">{dosHeader.e_minalloc}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x0C</div>
              <div className="three-column-item">e_maxalloc</div>
              <div className="three-column-item">{dosHeader.e_maxalloc}</div>
            </div>

            <div className="three-column">
              <div className="three-column-item">0x0E</div>
              <div className="three-column-item">e_ss</div>
              <div className="three-column-item">{dosHeader.e_ss}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x10</div>
              <div className="three-column-item">e_sp</div>
              <div className="three-column-item">{dosHeader.e_sp}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x12</div>
              <div className="three-column-item">e_csum</div>
              <div className="three-column-item">{dosHeader.e_csum}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x14</div>
              <div className="three-column-item">e_ip</div>
              <div className="three-column-item">{dosHeader.e_ip}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x16</div>
              <div className="three-column-item">e_cs</div>
              <div className="three-column-item">{dosHeader.e_cs}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x18</div>
              <div className="three-column-item">e_lfarlc</div>
              <div className="three-column-item">{dosHeader.e_lfarlc}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x1A</div>
              <div className="three-column-item">e_ovno</div>
              <div className="three-column-item">{dosHeader.e_ovno}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x1C</div>
              <div className="three-column-item">e_res</div>
              <div className="three-column-item">{dosHeader.e_res}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x24</div>
              <div className="three-column-item">e_oemid</div>
              <div className="three-column-item">{dosHeader.e_oemid}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x26</div>
              <div className="three-column-item">e_oeminfo</div>
              <div className="three-column-item">{dosHeader.e_oeminfo}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x28</div>
              <div className="three-column-item">e_res2</div>
              <div className="three-column-item">{dosHeader.e_res2}</div>
            </div>
            <div className="three-column">
              <div className="three-column-item">0x3C</div>
              <div className="three-column-item">e_lfanew</div>
              <div className="three-column-item">{dosHeader.e_lfanew}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DosHeader;
