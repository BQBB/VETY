import React, { createContext } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SnackContext = createContext(null)
export const SnackProvider = ({children}) => {

    const success = (msg) => {
        toast.success(msg, {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            });
    }

    const error = (msg)=> {
        toast.error(msg, {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            });
    }
  return (
    <SnackContext.Provider value={{
        error,
        success
    }}>
        {children}
        <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        limit={4}
        />
    </SnackContext.Provider>
  )
}

export default SnackContext