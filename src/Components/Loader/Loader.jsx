import React from 'react'
import { LuLoader } from 'react-icons/lu'
import { RiLoader5Line } from "react-icons/ri";
import { BiLoaderCircle } from "react-icons/bi";

const Loader = () => {
  return (
    <BiLoaderCircle className='animate-spin mx-auto' size={24} />
  )
}

export default Loader