import { useState } from "react";
import "./QuickInfo.css";

function QuickInfo(props) {
  console.log("quickinfo props", props);
  const info = props.quickInfo;
  let descriptors;
  const importsPresent = info.importedDlls != undefined;
  if(importsPresent){
    descriptors = info.importedDlls.ImportDirectoryTable;
  }
  let dllNames;
  let functionNames;

  if (importsPresent && descriptors != undefined) {
    dllNames = descriptors.map((descriptor, index) => {
      let bound = false;
      console.log(descriptor.TimeDateStamp);
      if (descriptor.TimeDateStamp == "FFFFFFFF") {
        // -1 as an unsigned DWORD
        console.log("bound");
        bound = true;
      }
      return (
        <div key={index}>
          {descriptor.NameString}{" "}
          {bound && <span className="ordinal">BOUND</span>}
        </div>
      );
    });
    functionNames = descriptors.map((descriptor, index) => {
      return (
        <div key={index}>
          {descriptor.ImportNameList.map((importName, index) => {
            return (
              <div key={index}>
                {descriptor.NameString}:{" "}
                {importName.name ? (
                  importName.name
                ) : (
                  <span className="ordinal">Ordinal: {importName.ordinal}</span>
                )}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div id="quick-info-wrapper">
      <div className="header-wrapper" onClick={() => toggle()}>
        <div className="header">Quick Information</div>
      </div>
      <div>
        <div className="header-sub-text">
          A quick glance at important attributes.
        </div>
        <div className="table">
          <div className="two-column">
            <div className="two-column-item">File name</div>
            <div className="two-column-item">{info.name}</div>
          </div>
          <div className="two-column">
            <div className="two-column-item">File size</div>
            <div className="two-column-item">
              {getReadableFileSizeString(info.size)}
            </div>
          </div>
          <div className="two-column">
            <div className="two-column-item">Platform</div>
            <div className="two-column-item">
              {info.platform == "010B" ? "32-bit" : "64-bit"}
            </div>
          </div>
          <div className="two-column">
            <div className="two-column-item">Number of sections</div>
            <div className="two-column-item">{parseInt(info.sectionCount)}</div>
          </div>
          {importsPresent && descriptors != undefined && (
            <>
              <div className="two-column">
                <div className="two-column-item">Imported DLLs</div>
                <div className="two-column-item">{dllNames}</div>
              </div>
              <div className="two-column">
                <div className="two-column-item">Imported Functions</div>
                <div className="two-column-item">{functionNames}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hexadecimal-in-javascript
function getReadableFileSizeString(fileSizeInBytes) {
  var i = -1;
  var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes /= 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

export default QuickInfo;
