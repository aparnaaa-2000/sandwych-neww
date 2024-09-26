import { useEffect, useState } from 'react';
import apiInstance from '../../instants/api'; // Adjust the path if necessary

const useDays = () => {
  const [data, setData] = useState([]);        // Holds the fetched data
  const [loading, setLoading] = useState(true); // Initially true because loading starts immediately
  const [error, setError] = useState(null);     // Holds any error if API fails

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await apiInstance.get('/days'); // Adjust the endpoint as necessary
        console.log('Days list response:', response?.data);
        setData(response?.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching days:', error);
        setError(error); // Set error if API fails
      } finally {
        setLoading(false); // Stop loading when API call is done
      }
    };

    fetchDays();
  }, []); // Empty dependency array to run only on component mount

  return { data, loading, error }; // Return data, loading, and error state
};

export default useDays;
