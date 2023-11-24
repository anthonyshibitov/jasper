function ExportHeader(props) {
  const exportDirectoryTable = props.exportDirectoryTable;
  console.log("EXPORT HEADER RECEIVED:", exportDirectoryTable);

  return (
    <table>
      <thead>
        <tr>
          <th>ORDINAL</th>
          <th>NAME</th>
          <th>ADDRESS</th>
        </tr>
      </thead>
      {/* {exports} */}
    </table>
  );
}

export default ExportHeader;
