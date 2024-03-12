import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStats } from '../../features/stats/statsSlice';
import { Loading, StatsContainer, ChartsContainer } from '../../components/';

const Stats = () => {
  const { isLoading, defaultStats, monthlyApplications } = useSelector(
    (store) => store.stats
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStats());
  }, []);
  if (isLoading) {
    return (
      <div>
        <Loading center />
      </div>
    );
  }
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      <ChartsContainer monthlyApplications={monthlyApplications} />
    </>
  );
};

export default Stats;
