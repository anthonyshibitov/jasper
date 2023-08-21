import { useState, useEffect } from "react";
import { analyze, returnHexOfBuffer } from "./peAnalyze";
import { createPe } from "./peDef";
import "./App.css";

function hex2a(hex, trim) {
  var str = "";
  for (var i = 0; i < hex.length; i += 2) {
    var v = parseInt(hex.substr(i, 2), 16);
    if (v){
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

      reader.readAsBinaryString(file);

      reader.onload = () => {
        const result = analyze(reader.result);
        // SUPER MEMORY INTENSIVE!!
        // setHex(returnHexOfBuffer(reader.result));
        if (hex2a(result._IMAGE_DOS_HEADER.e_magic) == "MZ") {
          setMagicAscii(hex2a(result._IMAGE_DOS_HEADER.e_magic));
          setPe({
            ...pe,
            _IMAGE_DOS_HEADER: {
              ...pe._IMAGE_DOS_HEADER,
              e_magic: result._IMAGE_DOS_HEADER.e_magic,
              e_lfanew: result._IMAGE_DOS_HEADER.e_lfanew,
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
            },
            _IMAGE_NT_HEADER: {
              ...pe._IMAGE_NT_HEADER,
              Signature: result._IMAGE_NT_HEADER.Signature,
              Machine: result._IMAGE_NT_HEADER.Machine,
              NumberOfSections: result._IMAGE_NT_HEADER.NumberOfSections,
            }
          });
          setHeaderOffset((result._IMAGE_DOS_HEADER.e_lfanew).replace(/^0+/g, ''));
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
      <div>
        IMAGE_DOS_HEADER:
        <div>offset, name, value</div>
        <div>
          0x00 e_magic {pe._IMAGE_DOS_HEADER.e_magic}, ascii: {magicAscii}
        </div>
        <div>0x02 e_cblp {pe._IMAGE_DOS_HEADER.e_cblp}</div>
        <div>0x04 e_cp {pe._IMAGE_DOS_HEADER.e_cp}</div>
        <div>0x06 e_crlc {pe._IMAGE_DOS_HEADER.e_crlc}</div>
        <div>0x08 e_cparhdr {pe._IMAGE_DOS_HEADER.e_cparhdr}</div>
        <div>0x0A e_minalloc {pe._IMAGE_DOS_HEADER.e_minalloc}</div>
        <div>0x0C e_maxalloc {pe._IMAGE_DOS_HEADER.e_maxalloc}</div>
        <div>0x0E e_ss {pe._IMAGE_DOS_HEADER.e_ss}</div>
        <div>0x10 e_sp {pe._IMAGE_DOS_HEADER.e_sp}</div>
        <div>0x12 e_csum {pe._IMAGE_DOS_HEADER.e_csum}</div>
        <div>0x14 e_ip {pe._IMAGE_DOS_HEADER.e_ip}</div>
        <div>0x16 e_cs {pe._IMAGE_DOS_HEADER.e_cs}</div>
        <div>0x18 e_lfarlc {pe._IMAGE_DOS_HEADER.e_lfarlc}</div>
        <div>0x1A e_ovno {pe._IMAGE_DOS_HEADER.e_ovno}</div>
        <div>0x1C e_res {pe._IMAGE_DOS_HEADER.e_res}</div>
        <div>0x24 e_oemid {pe._IMAGE_DOS_HEADER.e_oemid}</div>
        <div>0x26 e_oeminfo {pe._IMAGE_DOS_HEADER.e_oeminfo}</div>
        <div>0x28 e_res2 {pe._IMAGE_DOS_HEADER.e_res2}</div>
        <div>0x3C e_lfanew {pe._IMAGE_DOS_HEADER.e_lfanew}</div>
      </div>
      <hr></hr>
      <div>
        IMAGE_NT_HEADER:
        <div>offset, name, value</div>
        <div>0x{headerOffset} Signature {pe._IMAGE_NT_HEADER.Signature}, ascii: {signatureAscii}</div>
        <div>0x{(parseInt(headerOffset, 16) + 4).toString(16).toUpperCase()} Machine {pe._IMAGE_NT_HEADER.Machine}</div>
        <div>0x{(parseInt(headerOffset, 16) + 6).toString(16).toUpperCase()} NumberOfSections {pe._IMAGE_NT_HEADER.NumberOfSections}</div>
      </div>
    </>
  );
}

export default App;
