import img from '../assets/not-found.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  img {
    max-width: var(--fixed-width);
    margin-top: 4rem;
    margin-bottom: 3rem;
    width: 100%;
  }
  h2 {
    font-size: 4rem;
  }
  p {
    font-size: 1.2rem;
    font-style: italic;
    letter-spacing: 2px;
    margin-bottom: 2rem;
  }
  .btn {
    margin-bottom: 1rem;
  }
`;

const Error = () => {
  return (
    <Wrapper>
      <h2>Error</h2>
      <img src={img} alt='not-found' />
      <p>
        Page was not found. Please click link below to navigate back to homepage
      </p>

      <Link to={'/'} className='btn'>
        back home
      </Link>
    </Wrapper>
  );
};

export default Error;
