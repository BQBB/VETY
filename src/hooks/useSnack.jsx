import React, { useContext } from 'react'
import SnackContext from '../context/SnackContext'

const useSnack = () => useContext(SnackContext)

export default useSnack