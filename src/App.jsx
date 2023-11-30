import { useState, useEffect } from "react";
import { analyze, determineArchitecture } from "./peAnalyze";
import { createPe } from "./peDef";
import DosHeader from "./components/DosHeader";
import FileHeader from "./components/FileHeader";
import "./App.css";
import SectionHeaders from "./components/SectionHeaders";
import ImportHeader from "./components/ImportHeader";
import QuickInfo from "./components/QuickInfo";
import OptHeader from "./components/OptHeader";
import NavBar from "./components/NavBar";
import ExportHeader from './components/ExportHeader';

function App() {
  const [pe, setPe] = useState(createPe());
  const [headerOffset, setHeaderOffset] = useState("");
  const [render, setRender] = useState(false);
  const [quickInfo, setQuickInfo] = useState({});
  const [arch, setArch] = useState(0);
  const [error, setError] = useState("");
  const [show, setShow] = useState("");

  useEffect(() => {
    document.title = "JASPER";
    const uploadElement = document.getElementById("file-upload");
    uploadElement.addEventListener("change", () => {
      const file = uploadElement.files[0];
      setPe(createPe());

      const reader = new FileReader();

      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        const resultArray = new Uint8Array(reader.result);

        setArch(determineArchitecture(resultArray));
        const archLocal = determineArchitecture(resultArray);
        let result;
        if (archLocal == 32 || archLocal == 64) result = analyze(resultArray);

        if (archLocal == -1) {
          setError(
            "Selected file is not a valid PE file. The DOS / Optional Header magic values may have been corrupted or changed."
          );
          setRender(true);
          return;
        }

        setPe(result);
        setHeaderOffset(result._IMAGE_DOS_HEADER.e_lfanew.replace(/^0+/g, ""));
        if (archLocal == 32) {
          setQuickInfo({
            name: file.name,
            size: file.size,
            platform: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Magic,
            sectionCount:
              result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSections,
            importedDlls:
              result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1],
          });
        }
        if (archLocal == 64) {
          setQuickInfo({
            name: file.name,
            size: file.size,
            platform: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.Magic,
            sectionCount:
              result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSections,
            importedDlls:
              result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1],
          });
        }
        setShow("quick");
        setRender(true);
      };
    });
  }, []);

  return (
    <div className="app-wrapper">
      <div className="mobile-warning">
        This website is not designed for mobile!
      </div>
      <div className="title-wrapper">
        <div className="title">JASPER</div>
        <div className="title2">JavaScript PE Reverser/Explorer</div>
      </div>
      {render == false && (
        <>
          <div className="button-wrapper">
            <label id="file-upload-wrapper">
              <input type="file" name="file-upload" id="file-upload" />
              Upload PE File
            </label>
            <div className="button-under-label">made by sasha... :D</div>
          </div>
        </>
      )}
      {render == true && error == "" && (
        <div className="content-wrapper">
          <NavBar setShow={setShow} show={show} pe={pe} arch={arch} />
          {show == "quick" && <QuickInfo quickInfo={quickInfo} />}
          {show == "dos" && (
            <DosHeader
              dosHeader={pe._IMAGE_DOS_HEADER}
              magicAscii={pe._IMAGE_DOS_HEADER.e_magic}
            />
          )}
          {show == "file" && (
            <FileHeader
              fileHeader={pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER}
              headerOffset={headerOffset}
              signature={pe._IMAGE_NT_HEADER.Signature}
            />
          )}
          {show == "optional" && arch == 32 && (
            <OptHeader
              optionalHeader={pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32}
              headerOffset={headerOffset}
              arch={arch}
            />
          )}
          {show == "optional" && arch == 64 && (
            <OptHeader
              optionalHeader={pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64}
              headerOffset={headerOffset}
              arch={arch}
            />
          )}
          {show == "sections" && (
            <SectionHeaders sectionHeaders={pe._IMAGE_SECTION_HEADERS} />
          )}
          {show == "imports" && arch == 32 && (
            <ImportHeader
              importDescriptors={
                pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1]
              }
            />
          )}
          {show == "imports" && arch == 64 && (
            <ImportHeader
              importDescriptors={
                pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1]
              }
            />
          )}
          {show == "exports" && arch == 32 && (
            <ExportHeader
              exportDirectoryTable = {pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[0].ExportDirectoryTable}
            />
          )}
          {show == "exports" && arch == 64 && (
            <ExportHeader
            exportDirectoryTable = {pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[0].ExportDirectoryTable}
            />
          )}
        </div>
      )}
      {render == true && error != "" && <div>{error}</div>}
    </div>
  );
}

export default App;
