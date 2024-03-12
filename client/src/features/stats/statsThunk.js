import customFetch from '../../utils/customFetch';
import { checkForUnauthorizedResponse } from '../../utils/customFetch';

export const getStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs/stats');
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
