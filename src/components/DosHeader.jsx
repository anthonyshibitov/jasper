function DosHeader(props) {
  const dosHeader = props.dosHeader;
  const magicAscii = props.magicAscii;

  return (
    <div className="dos-header-wrapper">
      <div>
        IMAGE_DOS_HEADER:
        <div>offset, name, value</div>
        <div>
          0x00 e_magic {dosHeader.e_magic}, ascii: {magicAscii}
        </div>
        <div>0x02 e_cblp {dosHeader.e_cblp}</div>
        <div>0x04 e_cp {dosHeader.e_cp}</div>
        <div>0x06 e_crlc {dosHeader.e_crlc}</div>
        <div>0x08 e_cparhdr {dosHeader.e_cparhdr}</div>
        <div>0x0A e_minalloc {dosHeader.e_minalloc}</div>
        <div>0x0C e_maxalloc {dosHeader.e_maxalloc}</div>
        <div>0x0E e_ss {dosHeader.e_ss}</div>
        <div>0x10 e_sp {dosHeader.e_sp}</div>
        <div>0x12 e_csum {dosHeader.e_csum}</div>
        <div>0x14 e_ip {dosHeader.e_ip}</div>
        <div>0x16 e_cs {dosHeader.e_cs}</div>
        <div>0x18 e_lfarlc {dosHeader.e_lfarlc}</div>
        <div>0x1A e_ovno {dosHeader.e_ovno}</div>
        <div>0x1C e_res {dosHeader.e_res}</div>
        <div>0x24 e_oemid {dosHeader.e_oemid}</div>
        <div>0x26 e_oeminfo {dosHeader.e_oeminfo}</div>
        <div>0x28 e_res2 {dosHeader.e_res2}</div>
        <div>0x3C e_lfanew {dosHeader.e_lfanew}</div>
      </div>
    </div>
  );
}

export default DosHeader;
