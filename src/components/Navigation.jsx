import { NavLink } from "react-router-dom";
const Navigation = () => (
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/movies">Movies</NavLink>
  </nav>
);
export default Navigation;