import { FormRow, SelectRow } from '.';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilters, handleChange } from '../features/alljobs/allJobsSlice';
import { useState, useMemo } from 'react';
const Wrapper = styled.div`
  h4 {
    text-align: center;
    font-weight: bolder;
  }
  .form-center {
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    place-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
    .form-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.4rem;
    }
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
      width: 250px;
      margin-left: auto;
      padding-left: 0.5em;
      letter-spacing: 1.1px;
    }
    select {
      text-transform: capitalize;
      justify-self: flex-end;
      width: 250px;
      margin-left: auto;
      padding-left: 0.5em;
      letter-spacing: 1.1px;
    }
    .btn {
      max-width: 250px;
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-size: 1.3rem;
    }
  }
`;

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const debounce = () => {
    console.log('debounce called');
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };
  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <h4>Search Form</h4>
      <ul className='form-center'>
        <FormRow
          type={'search'}
          name={'search'}
          value={localSearch}
          handleChange={optimizedDebounce}
        />
        <SelectRow
          labelText={'status'}
          name={'searchStatus'}
          value={searchStatus}
          handleChange={handleSearch}
          options={['all', ...statusOptions]}
        />
        <SelectRow
          labelText={'type'}
          name={'searchType'}
          value={searchType}
          handleChange={handleSearch}
          options={['all', ...jobTypeOptions]}
        />
        <SelectRow
          name={'sort'}
          value={sort}
          handleChange={handleSearch}
          options={sortOptions}
        />
        <button
          className='btn btn-block btn-danger'
          disabled={isLoading}
          onClick={handleSubmit}
        >
          Clear filters
        </button>
      </ul>
    </Wrapper>
  );
};

export default SearchContainer;
