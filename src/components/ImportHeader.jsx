function ImportHeader(props){
    console.log(props.importDescriptors.ImportDirectoryTable);
    const descriptors = props.importDescriptors.ImportDirectoryTable.map((descriptor, index) => {
        const functionNameList = descriptor.ImportNameList;
        const functionRVAList = descriptor.ImportRVAList;
        const functionList = functionNameList.map((func, index) => {
            return (
                <div key={index}>
                    <div>Function hint: {func.hint} Function name: {func.name}</div>
                    <div>IAT address: {functionRVAList[index]}</div>
                </div>
            )
        });
        return (
            <div key={index}>
                <div>Import descriptor {index}</div>
                <div>{descriptor.NameString}</div>
                <div>Imported functions:</div>
                {functionList}
            </div>
        )
    })

    return (
        <div>
            <div>Import Descriptors</div>
            {descriptors}
        </div>
    )
}

export default ImportHeader;