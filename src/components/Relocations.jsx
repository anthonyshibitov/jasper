function Relocations(props) {
  const relocs = props.relocs;

  const relocationTemplate = relocs.map((reloc, index) => {
    console.log("RELOCC", reloc);
    const relocationTemplate2 = reloc.relocations.map((reloc2, index2) => {
      return (
        <tr key={index2}>
          <td>{reloc.pageRVA}</td>
          <td>{reloc2.type}</td>
          <td>{reloc2.offset}</td>
        </tr>
      );
    });
    return (
      <>
        <tr key={index}>
          <td colSpan="3" className="dll-name">
            {reloc.pageRVA}
          </td>
        </tr>
        {relocationTemplate2}
      </>
    );
  });

  console.log(relocs);

  return (
    <div className="import-wrapper">
      <div className="header-wrapper">
        <div className="header">Relocations</div>
      </div>
      <div className="header-sub-text">Relocations</div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>PAGE</th>
              <th>TYPE</th>
              <th>OFFSET</th>
            </tr>
          </thead>
          <tbody>{relocationTemplate}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Relocations;
