import React from 'react';
import { MainLayout } from './view/layout';
import { Login, Register } from './view/pages/auth';
import CabinetLayout from './view/layout/cabinetLayout';
import { db, auth, doc, getDoc, onAuthStateChanged } from './services/firebase/firebase';
import LoadingWrapper from './view/components/shared/LoadingWrapper';
import { 
  Route, 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements } from 'react-router-dom';
import './App.css';

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isAuth: false,
      userProfileInfo: {
        firstName: '',
        lastName: '',
        headline: '',
        email: ''
      },

    }

  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    onAuthStateChanged(auth, (user) => {
      this.setState({
        loading: false
      });

      if (user) {
        this.setState({
          isAuth: true
        })

        const { uid } = user;
        const ref = doc(db, 'registerUsers', uid);

        getDoc(ref).then((userData) => {
          if (userData.exists()) {
            this.setState({
              userProfileInfo: userData.data()
            })
          }
        })
      } else {

      }
      
    })
  }

  render() {
    const { userProfileInfo, loading, isAuth } = this.state;
    
    return (
      <LoadingWrapper loading={loading} fullScreen>
        <RouterProvider  router={route} />
      </LoadingWrapper>
    )
  }
}

export default App;