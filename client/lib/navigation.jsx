
import { FaHireAHelper } from 'react-icons/fa'
import { HiOutlineCog, } from 'react-icons/hi'
import { FaChartSimple } from "react-icons/fa6";

export const  Dashboard_sidebars_top = [


  {
    key: 'charts',
    label: 'Charts',
    path: '/charts',
    icon: <FaChartSimple />

  },







]



export const Dashboard_sidebars_bottm = [

    {
        key: 'settings',
        label: 'Settings',
        path: '/settigns',
        icon: <HiOutlineCog/>
    },

    {
      key: 'help',
      label: 'Help and Support',
      path: '/help',
      icon: <FaHireAHelper/>
  }
]