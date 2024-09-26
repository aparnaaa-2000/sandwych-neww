import { CreateTaskBegin, CreateTaskClear, CreateTaskFailure, CreateTaskSuccess } from '../Slice/Task/CreateTaskKey';
import {TaskCategoryBegin,TaskCategoryClear,TaskCategoryFailure,TaskCategorySuccess}  from '../Slice/Task/TaskCategoryKey';
import { TaskListBegin, TaskListClear, TaskListFailure, TaskListSuccess } from '../Slice/Task/TaskListKey';

//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api';

//TASK CATEGORY

export const getTaskCategory = async (token, dispatch) => {
  dispatch(TaskCategoryClear());
  dispatch(TaskCategoryBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + `/task_categories`, {
      headers: headers,
    })

    .then(res => {
      dispatch(TaskCategorySuccess(res?.data));
    })
    .catch(error => {
      dispatch(TaskCategoryFailure(error));
    });
};


//CREATE TASK
export const OnCreateTask = async (
    patient_id,
    task_category_id,
    start_date,
    time,
    end_date,
    description,
    frequency,
    token,
    dispatch,
  ) => {
    dispatch(CreateTaskClear());
    dispatch(CreateTaskBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      patient_id,
      task_category_id,
      start_date,
      time,
      end_date,
      description,
      frequency,
    };
  
    try {
      const response = await axios.post(baseUrl + `/patient_task`, req, {
        headers: headers,
      });
  
      dispatch(CreateTaskSuccess(response.data));
    } catch (error) {
      dispatch(CreateTaskFailure(error));
    }
  };
  

  //LIST TASK
export const getTaskList = async (date, patient_id, token, dispatch) => {
    dispatch(TaskListClear());
    dispatch(TaskListBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      date,
    };
  
    try {
      const response = await axios.post(
        baseUrl + `/patient_daily_task/${patient_id}`,
        req,
        {
          headers: headers,
        },
      );
  
      dispatch(TaskListSuccess(response.data));
    } catch (error) {
      dispatch(TaskListFailure(error));
    }
  };
  