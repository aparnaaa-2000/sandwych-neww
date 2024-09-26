import { useEffect, useState } from 'react';
import apiInstance from '../../instants/api';

const useNearByList = async () => {
  try {
    const response = await apiInstance.get(`/nearby/support`);
    console.log('Successfully listed:', response);
    return response.data;

  } catch (error) {
    console.log('Error code:', error);
    return null; // or return an empty array/object depending on expected data
  }
};

export default useNearByList;