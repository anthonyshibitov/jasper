function Relocations(props) {
  const relocs = props.relocs;

  const pageTemplate = relocs.map((page, pageIndex) => {
    const relocationTemplate = page.relocations.map((reloc, relocIndex) => {
      return (
        <tr key={relocIndex}>
          <td>{page.pageRVA}</td>
          <td>{reloc.type}</td>
          <td>{reloc.offset}</td>
        </tr>
      );
    });
    return (
      <>
        <tr key={pageIndex}>
          <td colSpan="3" className="dll-name">
            {page.pageRVA}
          </td>
        </tr>
        {relocationTemplate}
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
          <tbody>{pageTemplate}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Relocations;
