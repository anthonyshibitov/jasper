import { useState, useEffect } from "react";
import { analyze, returnHexOfBuffer } from "./peAnalyze";
import { createPe } from "./peDef";
import DosHeader from "./components/DosHeader";
import NtHeader from "./components/NtHeader";
import "./App.css";

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

  useEffect(() => {
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
        const result = analyze(resultArray);
        // SUPER MEMORY INTENSIVE!!
        // setHex(returnHexOfBuffer(reader.result));
        if (hex2a(result._IMAGE_DOS_HEADER.e_magic) == "MZ") {
          setMagicAscii(hex2a(result._IMAGE_DOS_HEADER.e_magic));
          setPe({
            ...pe,
            _IMAGE_DOS_HEADER: {
              ...pe._IMAGE_DOS_HEADER,
              e_magic: result._IMAGE_DOS_HEADER.e_magic,
              e_cblp: result._IMAGE_DOS_HEADER.e_cblp,
              e_cp: result._IMAGE_DOS_HEADER.e_cp,
              e_crlc: result._IMAGE_DOS_HEADER.e_crlc,
              e_cparhdr: result._IMAGE_DOS_HEADER.e_cparhdr,
              e_minalloc: result._IMAGE_DOS_HEADER.e_minalloc,
              e_maxalloc: result._IMAGE_DOS_HEADER.e_maxalloc,
              e_ss: result._IMAGE_DOS_HEADER.e_ss,
              e_sp: result._IMAGE_DOS_HEADER.e_sp,
              e_csum: result._IMAGE_DOS_HEADER.e_csum,
              e_ip: result._IMAGE_DOS_HEADER.e_ip,
              e_cs: result._IMAGE_DOS_HEADER.e_cs,
              e_lfarlc: result._IMAGE_DOS_HEADER.e_lfarlc,
              e_ovno: result._IMAGE_DOS_HEADER.e_ovno,
              e_res: result._IMAGE_DOS_HEADER.e_res,
              e_oemid: result._IMAGE_DOS_HEADER.e_oemid,
              e_oeminfo: result._IMAGE_DOS_HEADER.e_oeminfo,
              e_res2: result._IMAGE_DOS_HEADER.e_res2,
              e_lfanew: result._IMAGE_DOS_HEADER.e_lfanew,
            },
            _IMAGE_NT_HEADER: {
              ...pe._IMAGE_NT_HEADER,
              Signature: result._IMAGE_NT_HEADER.Signature,
              _IMAGE_FILE_HEADER: {
                ...pe._IMAGE_NT_HEADER._IMAGE_FILE_HEADER,
                Machine: result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.Machine,
                NumberOfSections:
                  result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSections,
                TimeDateStamp:
                  result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.TimeDateStamp,
                PointerToSymbolTable:
                  result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER
                    .PointerToSymbolTable,
                NumberOfSymbols:
                  result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.NumberOfSymbols,
                SizeOfOptionalHeader:
                  result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER
                    .SizeOfOptionalHeader,
                Characteristics:
                  result._IMAGE_NT_HEADER._IMAGE_FILE_HEADER.Characteristics,
              },
              _IMAGE_OPTIONAL_HEADER32: {
                ...pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32,
                Magic: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Magic,
                MajorLinkerVersion: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorLinkerVersion,
                MinorLinkerVersion: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorLinkerVersion,
                SizeOfCode: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfCode,
                SizeOfInitializedData: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfInitializedData,
                SizeOfUninitializedData: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfUninitializedData,
                AddressOfEntryPoint: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.AddressOfEntryPoint,
                BaseOfCode: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.BaseOfCode,
                BaseOfData: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.BaseOfData,
                ImageBase: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.ImageBase,
                SectionAlignment: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SectionAlignment,
                FileAlignment: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.FileAlignment,
                MajorOperatingSystemVersion: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorOperatingSystemVersion,
                MinorOperatingSystemVersion: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorOperatingSystemVersion,
                MajorImageVersion: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorImageVersion,
                MinorImageVersion: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorImageVersion,
                MajorSubsystemVersion: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MajorSubsystemVersion,
                MinorSubsystemVersion: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.MinorSubsystemVersion,
                Win32VersionValue: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Win32VersionValue,
                SizeOfImage: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfImage,
                SizeOfHeaders: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfHeaders,
                CheckSum: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.CheckSum,
                Subsystem: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.Subsystem,
                DllCharacteristics: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DllCharacteristics,
                SizeOfStackReserve: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfStackReserve,
                SizeOfStackCommit: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfStackCommit,
                SizeOfHeapReserve: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfHeapReserve,
                SizeOfHeapCommit: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.SizeOfHeapCommit,
                LoaderFlags: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.LoaderFlags,
                NumberOfRvaAndSizes: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.NumberOfRvaAndSizes,
                DataDirectory: result._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory,
              }
            },
          });
          setHeaderOffset(
            result._IMAGE_DOS_HEADER.e_lfanew.replace(/^0+/g, "")
          );
          setSignatureAscii(hex2a(result._IMAGE_NT_HEADER.Signature));
        } else {
          alert("This is not a valid PE file.");
        }
      };
    });
  }, []);

  return (
    <>
      <input type="file" name="file-upload" id="file-upload" />
      {/* <div>{currentPe}</div> */}
      <div>size in bytes: {size}</div>
      <div>name: {name}</div>
      <div>type: {type}</div>
      <div>header start: {pe._IMAGE_DOS_HEADER.e_lfanew}</div>
      <div>HEX DUMP:</div>
      <div className="hex-dump-wrapper">{hex ? hex : "disabled"}</div>
      <hr></hr>
      <DosHeader dosHeader={pe._IMAGE_DOS_HEADER} magicAscii={magicAscii}/>
      <hr></hr>
      <NtHeader ntHeader={pe._IMAGE_NT_HEADER} signatureAscii={signatureAscii} headerOffset={headerOffset}/>
    </>
  );
}

export default App;
