import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { taskStatusModel } from 'src/view/pages/cabinetBoard/constants';
// import { collection, db, getDocs } from 'src/services/firebase/firebase';
import { taskStatusModel } from '../../view/pages/cabinetBoard/constants';
import { collection, db, getDocs } from '../../services/firebase/firebase';

const initialState = {
    issueColumns: [],
    count: 0,
    loading: false
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
      const updatedTaskStatusModel = taskStatusModel();
      const queryData = await getDocs(collection(db, 'issue'));
      queryData.docs.forEach(doc => {
          const data = doc.data();
          const { status } = data;

          if (updatedTaskStatusModel[status]) {
              updatedTaskStatusModel[status].items.push(data)
          };

      });

      return updatedTaskStatusModel;
  }
)

const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
        increment: (state) => {
            console.log(state.count, 'increment')
            state.count = state.count + 1;
        },

        decrement: (state) => {
            state.count = state.count - 1;
        },
    },
    extraReducers: (promise) => {
        promise.addCase(fetchData.pending, (state) => {
            state.loading = true
        })
          .addCase(fetchData.fulfilled, (state, action) => {
              console.log(action, 'action')
              state.loading = false;
              state.issueColumns = action.payload
          })
    }
});

export const { increment, decrement } = issuesSlice.actions;
export default issuesSlice.reducer;


