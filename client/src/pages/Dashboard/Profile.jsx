import { useState } from 'react';
import { FormRow } from '../../components/';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { updateUser } from '../../features/user/userSlice';

const Wrapper = styled.div`
  .dashboard-form {
    max-width: 700px;
    margin: 0 auto;
    h3 {
      text-align: center;
      margin-bottom: 3rem;
    }
  }
  .form-center {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 3rem;
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin-bottom: 1.5rem;

      label {
        text-transform: capitalize;
        margin-left: 2rem;
        letter-spacing: 1.2px;
        font-size: 1.2rem;
        font-weight: bolder;
        color: var(--title-color);
        justify-self: left;
        cursor: pointer;
      }
      input {
        justify-self: flex-end;
        min-width: 280px;
        max-width: 300px;
        margin-left: auto;
        padding-left: 0.5em;
        letter-spacing: 1.1px;
      }
      @media (min-width: 700px) {
        display: grid;
        grid-template-columns: auto 1fr;
        margin-bottom: 0.5rem;
      }
    }
  }
  .btn {
    max-width: 300px;
    display: block;
    margin: 0 auto;
    padding-top: 1em;
    padding-bottom: 1em;
    font-weight: bolder;
    font-size: 1.2rem;
  }
`;

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error('Please fill out all fields.');
      return;
    }
    dispatch(updateUser({ name, email, lastName, location }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };
  return (
    <Wrapper>
      <form className='dashboard-form' onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <ul className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={userData.name}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={userData.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            value={userData.location}
            handleChange={handleChange}
          />
        </ul>
        <button className='btn btn-block' type='submit' disabled={isLoading}>
          {isLoading ? 'loading...' : 'change info'}
        </button>
      </form>
    </Wrapper>
  );
};

export default Profile;
