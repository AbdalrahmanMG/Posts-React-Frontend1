import './App.css'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import HomeLayout from './pages/HomeLayout/HomeLayout'
import Posts from './components/Posts/Posts';
import AddPost from './components/AddPost/AddPost';
import EditPost from './components/EditPost/EditPost';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
// import AuthContextProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LoginProtectedRoute from './components/LoginProtectedRoute/LoginProtectedRoute';
import { AuthProvider } from './Hooks/useAuth';


// routing
let router = createHashRouter([
  {
    path: '', element: <HomeLayout />, children: [
      { index: true, element: <Posts /> },
      { path: 'addpost', element: <ProtectedRoute> <AddPost /> </ProtectedRoute> },
      { path: 'editpost/:id', element:  <ProtectedRoute> <EditPost /> </ProtectedRoute> },
      { path: 'login', element: <LoginProtectedRoute> <Login /></LoginProtectedRoute> },
      { path: 'register', element: <LoginProtectedRoute> <Register /></LoginProtectedRoute> },
    ]
  }
])


function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
