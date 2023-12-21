import { useState, useEffect } from "react";
import { analyze, determineArchitecture, strings } from "./peAnalyze";
import { createPe } from "./peDef";
import DosHeader from "./components/DosHeader";
import FileHeader from "./components/FileHeader";
import "./App.css";
import SectionHeaders from "./components/SectionHeaders";
import ImportHeader from "./components/ImportHeader";
import QuickInfo from "./components/QuickInfo";
import OptHeader from "./components/OptHeader";
import NavBar from "./components/NavBar";
import ExportHeader from "./components/ExportHeader";
import Relocations from "./components/Relocations";

function App() {
  const [pe, setPe] = useState(createPe());
  const [headerOffset, setHeaderOffset] = useState("");
  const [render, setRender] = useState(false);
  const [quickInfo, setQuickInfo] = useState({});
  const [arch, setArch] = useState(0);
  const [error, setError] = useState("");
  const [show, setShow] = useState("");
  const [stringsFunc, setStringsFunc] = useState([]);

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
        setStringsFunc(strings(resultArray, true));
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
          <div className="info-wrapper">
            <div className="info-header">What is this?</div>
            <span>JASPER is a Portable Executable reversing tool for 32 and 64-bit files implemented entirely in JavaScript. Wanna run it locally? Fork me on <a href="https://github.com/anthonyshibitov/jasper">Github!</a></span>
            <div className="info-header">What does it support?</div>
            <span>Currently it will parse 32 and 64 bit PE files. It should be able to successfully parse most files as long as they aren't extremely malformed. If your file doesn't process, please consider opening an issue on <a href="https://github.com/anthonyshibitov/jasper">Github</a> so it can be fixed.</span>
            <div className="info-header">Contact</div>
            My email is available on my Github profile. Psst.. I'm currently looking for work! :)
          </div>
        </>
      )}
      {render == true && error == "" && (
        <div className="content-wrapper">
          <NavBar setShow={setShow} show={show} pe={pe} arch={arch} />
          {show == "quick" && <QuickInfo quickInfo={quickInfo} strings={stringsFunc} />}
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
              exportDirectoryTable={
                pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[0]
                  .ExportDirectoryTable
              }
            />
          )}
          {show == "exports" && arch == 64 && (
            <ExportHeader
              exportDirectoryTable={
                pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[0]
                  .ExportDirectoryTable
              }
            />
          )}
          {show == "relocs" && arch == 32 && (
            <Relocations
              relocs={
                pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[5]
                  .Pages
              }
            />
          )}
          {show == "relocs" && arch == 64 && (
            <Relocations
              relocs={
                pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[5]
                  .Pages
              }
            />
          )}
        </div>
      )}
      {render == true && error != "" && <div>{error}</div>}
    </div>
  );
}

export default App;
