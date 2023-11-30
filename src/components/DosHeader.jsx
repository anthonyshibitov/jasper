import { useState } from "react";
import "./DosHeader.css";

function DosHeader(props) {
  const dosHeader = props.dosHeader;
  return (
    <div id="dos-header-wrapper">
      <div className="header-wrapper">
        <div className="header">DOS Header</div>
      </div>
      <div className="header-sub-text">NT_DOS_HEADER</div>
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
              <td>0x00</td>
              <td>e_magic</td>
              <td>{dosHeader.e_magic}</td>
            </tr>
            <tr>
              <td>0x02</td>
              <td>e_cblp</td>
              <td>{dosHeader.e_cblp}</td>
            </tr>
            <tr>
              <td>0x04</td>
              <td>e_cp</td>
              <td>{dosHeader.e_cp}</td>
            </tr>
            <tr>
              <td>0x06</td>
              <td>e_crlc</td>
              <td>{dosHeader.e_crlc}</td>
            </tr>
            <tr>
              <td>0x08</td>
              <td>e_cparhdr</td>
              <td>{dosHeader.e_cparhdr}</td>
            </tr>
            <tr>
              <td>0x0A</td>
              <td>e_minalloc</td>
              <td>{dosHeader.e_minalloc}</td>
            </tr>
            <tr>
              <td>0x0C</td>
              <td>e_maxalloc</td>
              <td>{dosHeader.e_maxalloc}</td>
            </tr>
            <tr>
              <td>0x0E</td>
              <td>e_ss</td>
              <td>{dosHeader.e_ss}</td>
            </tr>
            <tr>
              <td>0x10</td>
              <td>e_sp</td>
              <td>{dosHeader.e_sp}</td>
            </tr>
            <tr>
              <td>0x12</td>
              <td>e_csum</td>
              <td>{dosHeader.e_csum}</td>
            </tr>
            <tr>
              <td>0x14</td>
              <td>e_ip</td>
              <td>{dosHeader.e_ip}</td>
            </tr>
            <tr>
              <td>0x16</td>
              <td>e_cs</td>
              <td>{dosHeader.e_cs}</td>
            </tr>
            <tr>
              <td>0x18</td>
              <td>e_lfarlc</td>
              <td>{dosHeader.e_lfarlc}</td>
            </tr>
            <tr>
              <td>0x1A</td>
              <td>e_ovno</td>
              <td>{dosHeader.e_ovno}</td>
            </tr>
            <tr>
              <td>0x1C</td>
              <td>e_res</td>
              <td>{dosHeader.e_res}</td>
            </tr>
            <tr>
              <td>0x24</td>
              <td>e_oemid</td>
              <td>{dosHeader.e_oemid}</td>
            </tr>
            <tr>
              <td>0x26</td>
              <td>e_oeminfo</td>
              <td>{dosHeader.e_oeminfo}</td>
            </tr>
            <tr>
              <td>0x28</td>
              <td>e_res2</td>
              <td>{dosHeader.e_res2}</td>
            </tr>
            <tr>
              <td>0x3C</td>
              <td>e_lfanew</td>
              <td>{dosHeader.e_lfanew}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DosHeader;
