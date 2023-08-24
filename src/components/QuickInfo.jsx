import { useState } from "react";
import "./QuickInfo.css";

function QuickInfo(props) {
  const [show, setShow] = useState(true);
  const [toggleText, setToggleText] = useState("Hide");

  const info = props.quickInfo;
  const descriptors = info.importedDlls.ImportDirectoryTable;
  const dllNames = descriptors.map((descriptor, index) => {
    return <div key={index}>{descriptor.NameString}</div>;
  });
  const functionNames = descriptors.map((descriptor, index) => {
    return (
      <div key={index}>
        {descriptor.ImportNameList.map((importName, index) => {
          return (
            <div key={index}>
              {descriptor.NameString}: {importName.name}
            </div>
          );
        })}
      </div>
    );
  });

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
    <div id="quick-info-wrapper">
      <div className="header-wrapper">
        <div className="header">Quick Information</div>
        <div className="toggle" onClick={() => toggle()}>
          {toggleText}
        </div>
      </div>
      {show && (
        <div>
          <div className="header-sub-text">A quick glance at important attributes.</div>
          <div className="table">
            <div className="two-column">
              <div className="two-column-item">File name</div>
              <div className="two-column-item">{info.name}</div>
            </div>
            <div className="two-column">
              <div className="two-column-item">File size</div>
              <div className="two-column-item">{info.size}</div>
            </div>
            <div className="two-column">
              <div className="two-column-item">Platform</div>
              <div className="two-column-item">
                {info.platform == "010B" ? "32-bit" : "64-bit"}
              </div>
            </div>
            <div className="two-column">
              <div className="two-column-item">Number of sections</div>
              <div className="two-column-item">{info.sectionCount}</div>
            </div>
            <div className="two-column">
              <div className="two-column-item">Imported DLLs</div>
              <div className="two-column-item">{dllNames}</div>
            </div>
            <div className="two-column">
              <div className="two-column-item">Imported Functions</div>
              <div className="two-column-item">{functionNames}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickInfo;
