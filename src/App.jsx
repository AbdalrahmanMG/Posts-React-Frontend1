import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomeLayout from './pages/HomeLayout/HomeLayout'
import Posts from './components/Posts/Posts';
import AddPost from './components/AddPost/AddPost';
import EditPost from './components/EditPost/EditPost';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AuthContextProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


// routing
let router = createBrowserRouter([
  {
    path: '', element: <HomeLayout />, children: [
      { index: true, element: <Posts /> },
      { path: 'addpost', element: <ProtectedRoute> <AddPost /> </ProtectedRoute> },
      { path: 'editpost/:id', element:  <ProtectedRoute> <EditPost /> </ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ]
  }
])


function App() {

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  )
}

export default App
