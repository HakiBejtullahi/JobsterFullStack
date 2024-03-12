import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../features/alljobs/allJobsSlice';
const Wrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 0.2em;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .prev-btn,
  .next-btn {
    color: var(--color-title);
    font-size: 1.5rem;
    font-weight: bolder;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .num-btn {
    color: var(--color-text);
    background-color: transparent;
    border: none;
    font-weight: bolder;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .active {
    color: var(--color-title);
  }
`;

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  const pages = Array.from({ length: numOfPages }, (_, indx) => {
    return indx + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(setPage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(setPage(newPage));
  };
  const setCurrPage = (val) => {
    const numb = parseInt(val);
    if (numb) {
      return dispatch(setPage(numb));
    } else {
      return;
    }
  };
  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
      </button>
      {pages.map((pageNum) => {
        return (
          <button
            key={pageNum}
            className={pageNum === page ? 'num-btn active' : 'num-btn'}
            onClick={() => setCurrPage(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}
      <button type='button' className='next-btn' onClick={nextPage}>
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
