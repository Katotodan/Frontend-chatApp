import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState, useContext, createContext } from "react";
import { SingUp } from './Pages/SignUp/SignUp';
import { Login } from './Pages/Login/Login';
import { Home } from "./Pages/Protected/Home";
import { loaderFunction, loaderFunctionOnLogin } from "./loader";
import mitt from 'mitt'

export const emitter = mitt()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: loaderFunction
  },
  {
    path: "/login",
    element: <Login/>,
    loader: loaderFunctionOnLogin
  },
  {
    path: "/signup",
    element: <SingUp/>,
    loader: loaderFunctionOnLogin
  }
])

export const CurrentUserContext = createContext(null)

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  
  return (
    <CurrentUserContext.Provider value={{
      currentUser,
      setCurrentUser
    }}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

// Delete a message, search for contact and style