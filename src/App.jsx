import { useState, useEffect } from "react";
import { analyze32, returnHexOfBuffer, determineArchitecture } from "./peAnalyze";
import { createPe } from "./peDef";
import DosHeader from "./components/DosHeader";
import FileHeader from "./components/FileHeader";
import "./App.css";
import SectionHeaders from "./components/SectionHeaders";
import ImportHeader from "./components/ImportHeader";
import QuickInfo from "./components/QuickInfo";
import OptHeader from "./components/OptHeader";

function hex2a(hex, trim) {
  var str = "";
  for (var i = 0; i < hex.length; i += 2) {
    var v = parseInt(hex.substr(i, 2), 16);
    if (v) {
      str += String.fromCharCode(v);
    }
  }
  return str.split("").reverse().join("");
}

function App() {
  const [size, setSize] = useState(0);
  const [name, setName] = useState("null");
  const [type, setType] = useState("null");
  const [pe, setPe] = useState(createPe());
  const [hex, setHex] = useState("");
  const [magicAscii, setMagicAscii] = useState("");
  const [signatureAscii, setSignatureAscii] = useState("");
  const [headerOffset, setHeaderOffset] = useState("");
  const [render, setRender] = useState(false);
  const [quickInfo, setQuickInfo] = useState({});
  const [arch, setArch] = useState(0);

  useEffect(() => {
    document.title = "JASPER";
    const uploadElement = document.getElementById("file-upload");
    uploadElement.addEventListener("change", () => {
      const file = uploadElement.files[0];
      setSize(file.size);
      setName(file.name);
      setType(file.type);
      setPe(createPe());
      setMagicAscii("");
      setSignatureAscii("");

      const reader = new FileReader();

      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        const resultArray = new Uint8Array(reader.result);
        //for 32 bit

        //const arch = determineArchitecture(resultArray);
        setArch(determineArchitecture(resultArray));
        const arch = determineArchitecture(resultArray);
        let result;
        if (arch == 32)
          result = analyze32(resultArray);
        if (arch == 64) {}
          result = analyze32(resultArray);
        if (arch == -1){
          console.log("NOT A PE FILE");
          return;
        }

        // SUPER MEMORY INTENSIVE!!
        // setHex(returnHexOfBuffer(reader.result));
        if (hex2a(result._IMAGE_DOS_HEADER.e_magic) == "MZ") {
          setMagicAscii(hex2a(result._IMAGE_DOS_HEADER.e_magic));
          setPe(result);
          setHeaderOffset(
            result._IMAGE_DOS_HEADER.e_lfanew.replace(/^0+/g, "")
          );
          setSignatureAscii(hex2a(result._IMAGE_NT_HEADER.Signature));
          if (arch == 32){
            setQuickInfo({
              name: file.name,
              size: file.size,
              platform: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Magic,
              sectionCount:
                result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSections,
              importedDlls: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1],
            });
          }
          if (arch == 64){
            setQuickInfo({
              name: file.name,
              size: file.size,
              platform: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.Magic,
              sectionCount:
                result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSections,
              importedDlls: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1],
            });
          }
          setRender(true);
        } else {
          alert("This is not a valid PE file.");
        }
      };
    });
  }, []);

  return (
    <div className="app-wrapper">
      <div className="mobile-warning">This website is not designed for mobile!</div>
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
            <div className="button-under-label">
              NOTE: JASPER only supports 32 bit at the moment.
            </div>
          </div>
        </>
      )}
      {render == true && (
        <div className="content-wrapper">
          <QuickInfo quickInfo={quickInfo} />
          <DosHeader dosHeader={pe._IMAGE_DOS_HEADER} magicAscii={magicAscii} />
          <FileHeader
            fileHeader={pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER}
            headerOffset={headerOffset}
            signature = {pe._IMAGE_NT_HEADER.Signature}
          />
          {arch == 32 && (
          <OptHeader optionalHeader={pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32} headerOffset={headerOffset}/>
          )}
          {arch == 64 && (
          <OptHeader optionalHeader={pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64} headerOffset={headerOffset}/>
          )}
          <SectionHeaders sectionHeaders={pe._IMAGE_SECTION_HEADERS} />
          {arch == 32 && (
          <ImportHeader
            importDescriptors={
              pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1]
            }
          />
          )}
          {arch == 64 && (
          <ImportHeader
            importDescriptors={
              pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1]
            }
          />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
