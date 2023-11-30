import './NavBar.css';

function NavBar(props){
    const setShow = props.setShow;
    const show = props.show;
    const pe = props.pe;
    const arch = props.arch;
    let hasImports = false;
    let hasExports = false;

    if(arch == 32){
        if(pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1] != undefined){
            if(parseInt(pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[1].VirtualAddress, 16) != 0){
                hasImports = true;
            }
        }
        if(pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[0] != undefined){
            if(parseInt(pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER32.DataDirectory[0].VirtualAddress, 16) != 0){
                hasExports = true;
            }
        }
    }
    if(arch == 64){
        if(pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1] != undefined){
            if(parseInt(pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[1].VirtualAddress, 16) != 0){
                hasImports = true;
            }
        }
        if(pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[0] != undefined){
            if(parseInt(pe._IMAGE_NT_HEADER._IMAGE_OPTIONAL_HEADER64.DataDirectory[0].VirtualAddress, 16) != 0){
                hasExports = true;
            }
        }
    }

    return (
        <div className="navbar-wrapper">
            <div className="navbar-item" id={(show == 'quick' ? 'active' : '')} onClick={() => setShow("quick")}>Quick Info</div>
            <div className="navbar-item" id={(show == 'dos' ? 'active': '')} onClick={() => setShow("dos")}>DOS Header</div>
            <div className="navbar-item" id={(show == 'file' ? 'active' : '')} onClick={() => setShow("file")}>File Header</div>
            <div className="navbar-item" id={(show == 'optional' ? 'active' : '')} onClick={() => setShow("optional")}>Optional Header</div>
            <div className="navbar-item" id={(show == 'sections' ? 'active' : '')} onClick={() => setShow("sections")}>Sections</div>
            {hasImports
            && 
                <div className="navbar-item" id={(show == 'imports' ? 'active' : '')} onClick={() => setShow("imports")}>Imports</div>
            }
            {hasExports
            && 
                <div className="navbar-item" id={(show == 'exports' ? 'active' : '')} onClick={() => setShow("exports")}>Exports</div>
            }
            <div className="navbar-item" id={(show == 'relocs' ? 'active' : '')} onClick={() => setShow("relocs")}>Relocs</div>
        </div>
    )
}

export default NavBar;