import "./ImportHeader.css";

function ImportHeader(props) {
  console.log(props.importDescriptors.ImportDirectoryTable);
  const descriptors = props.importDescriptors.ImportDirectoryTable.map(
    (descriptor, index) => {
      const functionNameList = descriptor.ImportNameList;
      const functionRVAList = descriptor.ImportRVAList;
      const functionList = functionNameList.map((func, index) => {
        return (
          <tr key={index}>
            {func.name ? (
              <>
                <td>{func.hint}</td>
                <td>{func.name}</td>
                <td>{func.rva}</td>
              </>
            ) : (
              <td colSpan="3" className="ordinal">ORDINAL {func.ordinal}</td>
            )}
          </tr>
        );
      });
      return (
        <>
          <tr key={index}>
            <td colspan="3" className="dll-name">
              DLL: {descriptor.NameString}{" "}
              {descriptor.TimeDateStamp == "FFFFFFFF" && (
                <span className="bound">BOUND</span>
              )}
            </td>
          </tr>
          {functionList}
        </>
      );
    }
  );

  return (
    <div className="import-wrapper">
      <div>Import Descriptors</div>
      <div className="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>HINT</th>
                    <th>NAME</th>
                    <th>Import Address Table RVA</th>
                </tr>
            </thead>
            {descriptors}
        </table>
      </div>
    </div>
  );
}

export default ImportHeader;
