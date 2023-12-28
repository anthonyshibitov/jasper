import { useEffect, useState } from "react";
import "./QuickInfo.css";

function QuickInfo(props) {
  const info = props.quickInfo;
  const strings = props.strings;
  let descriptors;
  const importsPresent = info.importedDlls != undefined;
  if (importsPresent) {
    descriptors = info.importedDlls.ImportDirectoryTable;
  }
  let dllNames;
  let functionNames;
  let outStrings = [];
  const [showMoreFunc, setShowMoreFunc] = useState(false);
  const [showMoreString, setShowMoreString] = useState(false);
  const [showMoreDll, setShowMoreDll] = useState(false);
  let stringTotal = 0;
  let funcTotal = 0;
  let dllTotal = 0;

  if (importsPresent && descriptors != undefined) {
    dllNames = descriptors.map((descriptor, index) => {
      let bound = false;
      if (descriptor.TimeDateStamp == "FFFFFFFF") {
        bound = true;
      }
      // return (
      //   <div key={index}>
      //     {descriptor.NameString}{" "}
      //     {bound && <span className="ordinal">BOUND</span>}
      //   </div>
      // );
      return { name: descriptor.NameString, bound: bound };
    });
    // functionNames = descriptors.map((descriptor, index) => {
    //   return (
    //     <div key={index}>
    //       {descriptor.ImportNameList.map((importName, index) => {
    //         return (
    //           <div key={index}>
    //             {descriptor.NameString}:{" "}
    //             {importName.name ? (
    //               importName.name
    //             ) : (
    //               <span className="ordinal">Ordinal: {importName.ordinal}</span>
    //             )}
    //           </div>
    //         );
    //       })}
    //     </div>
    //   );
    // });

    for (let i = 0; i < descriptors.length; i++) {
      for (let j = 0; j < descriptors[i].ImportNameList.length; j++) {
        let string = descriptors[i].NameString + ": ";
        if (descriptors[i].ImportNameList[j].name) {
          string += descriptors[i].ImportNameList[j].name;
        } else {
          string += descriptors[i].ImportNameList[j].ordinal;
        }
        outStrings.push(string);
      }
    }
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
        <table className="second-color">
          <tbody>
            <tr>
              <td>File name</td>
              <td>{info.name}</td>
            </tr>
            <tr>
              <td>File size</td>
              <td>{getReadableFileSizeString(info.size)}</td>
            </tr>
            <tr>
              <td>Platform</td>
              <td>{info.platform == "010B" ? "32-bit" : "64-bit"}</td>
            </tr>
            <tr>
              <td>Number of sections</td>
              <td>{parseInt(info.sectionCount, 16)}</td>
            </tr>
            <tr>
              <td>Strings</td>
              <td className="strings">
                {strings.length < 10
                  ? strings.map((string) => <div>{string}</div>)
                  : strings.map((string, index) => {
                      if (index < 10) {
                        return (
                          <div key={index}>
                            0x{string.offset.toString(16)}: {string.buffer}
                          </div>
                        );
                      }
                      if (index >= 10 && showMoreString) {
                        return (
                          <div key={index}>
                            0x{string.offset.toString(16)}: {string.buffer}
                          </div>
                        );
                      }
                      if (index >= 10 && !showMoreString) {
                        stringTotal += 1;
                      }
                    })}
                {!showMoreString && stringTotal > 10 && (
                  <button onClick={() => setShowMoreString(true)}>
                    Show {stringTotal} more...
                  </button>
                )}
              </td>
            </tr>
            {importsPresent && descriptors != undefined && (
              <>
                <tr>
                  <td>Imported DLLs</td>
                  <td>
                    {dllNames.length < 10
                      ? dllNames.map((dll, index) => (
                          <div>
                            {dll.name}
                            {dll.bound && (
                              <span className="ordinal"> BOUND</span>
                            )}
                          </div>
                        ))
                      : dllNames.map((dll, index) => {
                          if (index < 10) {
                            return (
                              <div>
                                {dll.name}
                                {dll.bound && (
                                  <span className="ordinal"> BOUND</span>
                                )}
                              </div>
                            );
                          }
                          if (index >= 10 && showMoreDll) {
                            return (
                              <div>
                                {dll.name}
                                {dll.bound && (
                                  <span className="ordinal"> BOUND</span>
                                )}
                              </div>
                            );
                          }
                          if (index >= 10 && !showMoreDll) {
                            dllTotal += 1;
                          }
                        })}
                    {!showMoreDll && dllTotal > 10 && (
                      <button onClick={() => setShowMoreDll(true)}>
                        Show {dllTotal} more...
                      </button>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Imported Functions</td>
                  <td>
                    {outStrings.length < 10
                      ? outStrings.map((func) => <div>{func}</div>)
                      : outStrings.map((func, index) => {
                          if (index < 10) {
                            return <div key={index}>{func}</div>;
                          }
                          if (index >= 10 && showMoreFunc) {
                            return <div key={index}>{func}</div>;
                          }
                          if (index >= 10 && !showMoreFunc) {
                            funcTotal += 1;
                          }
                        })}
                    {!showMoreFunc && funcTotal > 10 && (
                      <button onClick={() => setShowMoreFunc(true)}>
                        Show {funcTotal} more...
                      </button>
                    )}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
    /*
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
              <div className="two-column-item">{parseInt(info.sectionCount, 16)}</div>
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
      </div>*/
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
