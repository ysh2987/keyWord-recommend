import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchSearchKeword = createAsyncThunk(
  'search/fetchByKeword',
  async (keword) => {
    console.log('hi');
    const response = await axios.get(
      `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${keword}`,
    );
    return response.data;
  },
);

export default fetchSearchKeword;
