import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useAuthStorage = async () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;