import { useState, useEffect } from 'react';
import { MainLayout } from './view/layout';
import { Login, Register } from './view/pages/auth';
import CabinetLayout from './view/layout/cabinetLayout';
import { db, auth, doc, getDoc, onAuthStateChanged } from './services/firebase/firebase';
import { AuthContextProvider } from './context/AuthContext';
import LoadingWrapper from './view/components/shared/LoadingWrapper';
import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements,
  redirect } from 'react-router-dom';
import './App.css';
import { set } from 'firebase/database';
import { Button } from 'antd';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="cabinet" element={<CabinetLayout />}>
          
        </Route>
    </Route>
  )
);

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState({
    firstName: '',
    lastName: '',
    headline: '',
    email: ''
  });

  useEffect(() => {
    setLoading(true);

    onAuthStateChanged(auth, (user) => {
      setLoading(false)

      if (user) {
        setIsAuth(true);
          const { uid } = user;
          const ref = doc(db, 'registerUsers', uid);

          getDoc(ref).then((userData) => {
            if (userData.exists()) {
              setUserProfileInfo(userData.data())
          }
        })
      } else {
        redirect('/login');
      }
      
    })
  }, [])

  return (
    <LoadingWrapper loading={loading} fullScreen>
      <AuthContextProvider value={{ isAuth, userProfileInfo, setIsAuth }}>
        <RouterProvider router={route} />
      </AuthContextProvider>
    </LoadingWrapper>
  )
};

export default App;