import { useState, useEffect } from 'react'
import { analyze, returnHexOfBuffer } from "./peAnalyze";
import './App.css'

const _IMAGE_DOS_HEADER = {
  e_magic: null,
  e_cblp: null,
  e_cp: null,
  e_crlc: null,
  e_cparhdr: null,

  e_lfanew: null,
};

const pe_skeleton = {
  _IMAGE_DOS_HEADER: _IMAGE_DOS_HEADER,
  _IMAGE_NT_HEADER: null,
  _IMAGE_OPTIONAL_HEADER: null,
  _IMAGE_SECTION_HEADERS: [],
  _IMAGE_SECTIONS: [],
};

function hex2a(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
      var v = parseInt(hex.substr(i, 2), 16);
      if (v) str += String.fromCharCode(v);
  }
  return str.split("").reverse().join("");
} 

function App() {
  const [size, setSize] = useState(0);
  const [name, setName] = useState("null");
  const [type, setType] = useState("null");
  const [pe, setPe] = useState(pe_skeleton);
  const [hex, setHex] = useState("");
  const [magicAscii, setMagicAscii] = useState("");

  useEffect(() => {
    const uploadElement = document.getElementById("file-upload");
    uploadElement.addEventListener("change", () => {
      const file = uploadElement.files[0];
      setSize(file.size);
      setName(file.name);
      setType(file.type);

      const reader = new FileReader();

      reader.readAsBinaryString(file);

      reader.onload = () => {
        const result = analyze(reader.result);
        // SUPER MEMORY INTENSIVE!!
        // setHex(returnHexOfBuffer(reader.result));
        setPe({...pe, _IMAGE_DOS_HEADER: {
          ...pe._IMAGE_DOS_HEADER, 
          e_magic: result._IMAGE_DOS_HEADER.e_magic,
          e_lfanew: result._IMAGE_DOS_HEADER.e_lfanew,
          e_cblp: result._IMAGE_DOS_HEADER.e_cblp,
          e_cp: result._IMAGE_DOS_HEADER.e_cp,
          e_crlc: result._IMAGE_DOS_HEADER.e_crlc,
          e_cparhdr: result._IMAGE_DOS_HEADER.e_cparhdr,
        }});
        setMagicAscii(hex2a(result._IMAGE_DOS_HEADER.e_magic));
      }
    });

  }, [])

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
      <div>
        IMAGE_DOS_HEADER:
        <div>offset, name, value</div>
        <div>0x00 e_magic {pe._IMAGE_DOS_HEADER.e_magic}, ascii: {magicAscii}</div>
        <div>0x02 e_cblp {pe._IMAGE_DOS_HEADER.e_cblp}</div>
        <div>0x04 e_cp {pe._IMAGE_DOS_HEADER.e_cp}</div>
        <div>0x06 e_crlc {pe._IMAGE_DOS_HEADER.e_crlc}</div>
        <div>0x08 e_cparhdr {pe._IMAGE_DOS_HEADER.e_cparhdr}</div>
      </div>
    </>
  )
}

export default App
