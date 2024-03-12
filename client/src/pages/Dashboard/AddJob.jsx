import { FormRow, SelectRow } from '../../components';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createJob,
  handleChange,
  clearValues,
  editJob,
} from '../../features/job/jobSlice';
import { useEffect } from 'react';

const Wrapper = styled.div`
  form {
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
        min-width: 250px;
        max-width: 300px;
        margin-left: auto;
        padding-left: 0.5em;
        letter-spacing: 1.1px;
      }
      select {
        text-transform: capitalize;
        justify-self: flex-end;
        min-width: 250px;
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
  .btn-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 1rem;
    margin-top: 4rem;

    @media (min-width: 500px) {
      flex-direction: row;
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
  }
`;

const AddJob = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditting,
    editJobId,
  } = useSelector((store) => store.job);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !jobLocation || !company) {
      toast.error('Please fill out all fields');
      return;
    }

    if (isEditting) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
      return;
    }

    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };
  const clearForm = () => {
    dispatch(clearValues());
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditting) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditting ? 'edit job' : 'add job'}</h3>
        <ul className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* job location */}
          <FormRow
            type='text'
            name='jobLocation'
            value={jobLocation}
            labelText='job location'
            handleChange={handleJobInput}
          />
          {/* position */}
          <SelectRow
            handleChange={handleJobInput}
            name='jobType'
            value={jobType}
            options={jobTypeOptions}
            labelText='job type'
          />
          {/* status */}
          <SelectRow
            handleChange={handleJobInput}
            name='status'
            value={status}
            options={statusOptions}
          />
          {/* btn-container */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block btn-danger'
              onClick={clearForm}
            >
              {isEditting ? 'create new' : 'clear all'}
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </ul>
      </form>
    </Wrapper>
  );
};

export default AddJob;
