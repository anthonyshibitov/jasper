import './NavBar.css';

function NavBar(props){
    const setShow = props.setShow;
    const show = props.show;
    return (
        <div className="navbar-wrapper">
            <div className="navbar-item" id={(show == 'quick' ? 'active' : '')} onClick={() => setShow("quick")}>Quick Info</div>
            <div className="navbar-item" id={(show == 'dos' ? 'active': '')} onClick={() => setShow("dos")}>DOS Header</div>
            <div className="navbar-item" id={(show == 'file' ? 'active' : '')} onClick={() => setShow("file")}>File Header</div>
            <div className="navbar-item" id={(show == 'optional' ? 'active' : '')} onClick={() => setShow("optional")}>Optional Header</div>
            <div className="navbar-item" id={(show == 'imports' ? 'imports' : '')} onClick={() => setShow("imports")}>Imports</div>
        </div>
    )
}

export default NavBar;