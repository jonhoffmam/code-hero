import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import './menu.css';

const Menu = () => {

  return (
    <header className="Menu">

      <Link to="/">
        <img className="logo" src={logo} alt="Logo Objective"/>
      </Link>

      <div className="user">
        <div className="user__name__info">
          <span className="user__name">Jonathan Hoffmam Pivetta</span>
          <span className="user__info">Teste de Front-end</span>
        </div>
        <div className="user__icon">
          <span className="user__icon__text">JP</span>
        </div>
      </div>

    </header>
  );
}

export default Menu;
