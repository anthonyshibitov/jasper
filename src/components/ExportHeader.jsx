function ExportHeader(props) {
  let exports = props.exportDirectoryTable.JASPERexports;
  console.log("EXPORT RECEIVED:", exports);
  let exportList = exports.map((exp, index) => {
    if (exp.hasOwnProperty("name")) {
      //Named export
      return (
        <tr key={index}>
          <td>{exp.ordinal}</td>
          <td style={{ whiteSpace: "pre" }}>{exp.name}</td>
          <td>{exp.nameRVA}</td>
          <td>{exp.function}</td>
        </tr>
      );
    } else {
      return (
        <tr key={index}>
          <td>{exp.ordinal}</td>
          <td>-</td>
          <td>-</td>
          <td>{exp.function}</td>
        </tr>
      );
    }
  });

  return (
    <div className="import-wrapper">
      <div>Exports</div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ORDINAL</th>
              <th>NAME</th>
              <th>NAME RVA</th>
              <th>FUNCTION&nbsp;ADDRESS</th>
            </tr>
          </thead>
          <tbody>{exportList}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ExportHeader;
