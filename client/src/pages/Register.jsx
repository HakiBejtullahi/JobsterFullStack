import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';

const Wrapper = styled.div`
  width: 95vw;
  margin: 0 auto;
  max-width: var(--max-width);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  form {
    max-width: var(--fixed-width);
    width: 100%;
    margin: 0 auto;
    background-color: var(--white);
    padding: 1.5rem 2rem;
    min-height: 400px;
    border-radius: 5px;
    border-top: 6px solid var(--primary-500);
    box-shadow: var(--shadow-3);
    .btn {
      min-width: 150px;
    }
    .logo {
      max-width: 10rem;
      margin: 0 auto;
      margin-bottom: 1em;
      display: block;
    }
    h3 {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .form-row {
        display: grid;
        grid-template-columns: 1fr;

        @media (min-width: 400px) {
          grid-template-columns: 100px 1fr;
          gap: 2rem;
          padding-right: 3rem;
        }
        .form-label {
          text-transform: capitalize;
          font-weight: bolder;
          letter-spacing: 1.2px;
          text-align: left;
        }
      }
      li:last-child {
        margin-top: 2rem;
        .btn {
          display: block;
          margin: 0 auto;
        }
        p {
          display: inline-block;
          font-style: italic;
        }
        .btn-link {
          font-size: 1rem;
          font-weight: bolder;
          background-color: transparent;
          border: none;
          color: var(--title-color);
          text-transform: uppercase;
          cursor: pointer;
        }
      }
    }

    display: grid;
    grid-template-rows: auto auto 1fr;
  }
`;

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
const Register = () => {
  const [values, setValues] = useState(initialState);

  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  }, [user, navigate]);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('please provide all fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ email, password, name }));

    setValues({ name: '', email: '', password: '', isMember: true });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Logo />
        <h3 className='form-title'>{values.isMember ? 'login' : 'register'}</h3>
        <ul className='form-container'>
          {!values.isMember && (
            <FormRow
              type='text'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />
          )}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />

          <li>
            <button className='btn' type='submit' disabled={isLoading}>
              {isLoading ? 'loading...' : 'submit'}
            </button>
            <button
              type='button'
              style={{ marginTop: '1.2rem' }}
              className='btn btn-hipster'
              onClick={() => {
                dispatch(
                  loginUser({
                    email: 'demo@email.com',
                    password: 'adminpass',
                  })
                );
              }}
              disabled={isLoading}
            >
              {isLoading ? 'loading...' : 'demo user'}
            </button>
            <p>
              {values.isMember ? `Not a member yet? ` : 'Already a member! '}
            </p>
            <button className='btn-link' type='button' onClick={toggleMember}>
              {values.isMember ? `Register  Now ` : 'Login '}
            </button>
          </li>
        </ul>
      </form>
    </Wrapper>
  );
};

export default Register;
