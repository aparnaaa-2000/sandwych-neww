import { SET_TASK_DATA } from "./actions";


const initialState = {
  taskData: {},
};

const taskReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_TASK_DATA:
      return {
        ...state,
        taskData: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;