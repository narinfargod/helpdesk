import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const Header = () => {
    return (
        <>
            <div className="navbar-center bg-primary text-primary-content bg-base-100 sticky top-0 z-50" data-theme="dark">
            <Link to="/"><h1 className="btn btn-ghost normal-case text-xl">Simple Helpdesk</h1></Link>
            </div><br />
        </>
    )
}
export default Header;