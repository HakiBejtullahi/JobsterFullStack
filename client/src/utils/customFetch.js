import axios from 'axios';
import { getUserLocalStorage } from './localStorage';
import { clearStore } from '../features/user/userSlice';

const customFetch = axios.create({
  baseURL: '/api/v1',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserLocalStorage();
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }

  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Unauthorized! Logging out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
