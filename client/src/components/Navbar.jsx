import styled from 'styled-components';
import {
  FaAlignLeft,
  FaUserCircle,
  FaCaretDown,
  FaLightbulb,
  FaRegLightbulb,
} from 'react-icons/fa';
import { Logo } from '../components/';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleSidebar,
  toggleTheme,
  clearStore,
} from '../features/user/userSlice';

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  @media (max-width: 380px) {
    .logo {
      display: none;
    }
  }
  .nav-center {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  background: var(--bcgColor2);
  .btn-container {
    position: relative;
    display: flex;
    min-width: 90px;
  }
  .btn {
    /* min-width: 90px; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    span {
      display: none;
    }
  }
  .btn-icon:hover svg {
    filter: drop-shadow(5px 5px 10px var(--primary-300));
    color: var(--color-title);
  }
  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--color-title);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--bcgColor);
    font-weight: bolder;
    letter-spacing: var(--letterSpacing);
    text-transform: uppercase;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .btn {
      span {
        display: inline-block;
      }
    }
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;

const Navbar = () => {
  const { isDarkTheme, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  const toggleThemeNav = () => {
    dispatch(toggleTheme());
  };
  const toggleLogoutDropdown = () => {
    setShowLogout((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(clearStore('logging out'));
  };
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <h3 className='logo-text'>dashboard</h3>
          <Logo />
        </div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick={toggleLogoutDropdown}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
        <button className=' btn-icon' onClick={toggleThemeNav}>
          {isDarkTheme ? <FaLightbulb /> : <FaRegLightbulb />}
        </button>
      </div>
    </Wrapper>
  );
};

export default Navbar;
