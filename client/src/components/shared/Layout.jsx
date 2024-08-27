import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { adminState } from '../../store/atoms/admin';
import axios from 'axios';
import { BASE_URL } from '../../config';

export default function Layout() {

  
  return (
    <div className='flex flex-row bg-white-100 h-screen w-full overflow-hidden'>
      <Sidebar />
      <div className='flex flex-col flex-grow p-2 overflow-auto'>
        <InitAdmin/>
        <Header />
        <div className='flex-grow overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}


function InitAdmin() {
  const setAdmin = useSetRecoilState(adminState);
  const inits = async() => {
      try {
          const response = await axios.get(`${BASE_URL}/me`, {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })

          if (response.data.username) {
              setAdmin({
                  isLoad: false,
                  adminEmail: response.data.username
              })
          } else {
              setAdmin({
                  isLoad: false,
                  adminEmail: null
              })
          }
      } catch (e) {

          setAdmin({
              isLoad: false,
              adminEmail: null
          })
      }
  };

  useEffect(() => {
      inits();
  }, []);

  return <></>
}
