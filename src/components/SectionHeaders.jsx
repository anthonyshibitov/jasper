import { calcAddressOffset, hex2string } from "../peAnalyze";

function SectionHeaders(props){
    const sectionHeader = props.sectionHeaders.map((header, index) => {
        return (
            <div key={index}>
                <div>Section name: {hex2string(header.Name)}</div>
                <div>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 8)}Physical Address/VirtualSize: {header.PhyAdd_VirSize}</div>
                <div>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 12)} VirtualAddress {header.VirtualAddress}</div>
                <div>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 16)} SizeOfRawData {header.SizeOfRawData}</div>
                <div>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 20)} PointerToRawData {header.PointerToRawData}</div>
                <div>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 24)} PointerToRelocations {header.PointerToRelocations}</div>
                <div>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 28)} PointerToLinenumbers {header.PointerToLinenumbers}</div>
                <div>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 32)} NumberOfRelocations {header.NumberOfRelocations}</div>
                <div>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 34)} NumberOfLinenumbers {header.NumberOfLinenumbers}</div>
                <div>0x{calcAddressOffset(header.JASPER_SECTION_OFFSET, 36)} Characteristics {header.Characteristics}</div>
            </div>
        )
    })

    return (
        <div>
            {sectionHeader}
        </div>
    )
}

export default SectionHeaders;