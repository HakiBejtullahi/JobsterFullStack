import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import { toggleSidebar } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

const NavLinks = () => {
  const dispatch = useDispatch();

  return (
    <>
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            onClick={() => dispatch(toggleSidebar())}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </>
  );
};

export default NavLinks;
