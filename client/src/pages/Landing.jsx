import { Logo } from '../components';
import { Link } from 'react-router-dom';
import bannerImg from '../assets/banner-img.svg';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';

const Wrapper = styled.main`
  min-height: 100vh;
  nav {
    padding: 0.5em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      max-height: 3rem;
    }
  }
  .banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: var(--max-width);
    min-height: 90vh;
    margin: 0 auto;
    .banner-image {
      display: none;
      img {
        max-width: var(--fixed-width);
      }
    }
    .banner-info {
      text-align: center;
      h1 {
        margin-bottom: 1.5em;
      }
      p {
        font-style: italic;
        max-width: 30rem;
        margin: 0 auto;
        margin-bottom: 2rem;
      }
    }
  }

  @media (min-width: 992px) {
    .banner {
      flex-direction: row;
      .banner-image {
        display: block;
      }
    }
  }
`;

const Landing = () => {
  const { isDarkTheme } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggleThemeNav = () => {
    dispatch(toggleTheme());
  };

  return (
    <Wrapper>
      <nav>
        <Logo />
        <button className=' btn-icon' onClick={toggleThemeNav}>
          {isDarkTheme ? <FaLightbulb /> : <FaRegLightbulb />}
        </button>
      </nav>
      <div className='banner'>
        <div className='banner-image'>
          <img src={bannerImg} alt='banner image' />
        </div>
        <div className='banner-info'>
          <h1>
            Job <span>organizer</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
            impedit incidunt fuga deleniti eligendi non quo! Molestiae
            voluptates, et veritatis, architecto veniam ut, sit provident
            perferendis sint eligendi illum ipsa.
          </p>
          <Link to={'/register'} className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
