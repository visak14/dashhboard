import React, { useState, useEffect } from 'react';
import { FaReact, FaBars, FaTimes } from 'react-icons/fa';
import { Dashboard_sidebars_bottm, Dashboard_sidebars_top } from '../../lib/navigation';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const linkClasses = 
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };

    window.addEventListener('resize', handleResize);

   
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(true); 
    } else {
      setIsOpen(false); 
    }
  }, [isDesktop]);

  return (
    <div className='relative'>
  
      <div className={classNames('fixed top-0 left-0 z-50 transition-transform duration-300', {
        'translate-x-0': isOpen || isDesktop, 
        '-translate-x-full': !isOpen && !isDesktop, 
      }, 'bg-neutral-900 w-60 h-screen p-3 flex flex-col text-white')}>
      
        <button
          onClick={toggleSidebar}
          className='absolute top-3 right-3 p-2 text-white bg-neutral-700 rounded-full md:hidden'
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="flex items-center gap-2 px-2 py-4">
          <FaReact fontSize={24} />
          <span className="text-neutral-100 text-lg">MernApp</span>
        </div>
        
        <div className="flex-1 py-8 flex flex-col gap-0.5">
          {Dashboard_sidebars_top.map((item) => (
              <SidebarLink key={item.key} item={item} />
          ))}
        </div>
        <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
          {Dashboard_sidebars_bottm.map((item) => (
              <SidebarLink key={item.key} item={item} />
          ))}
        </div>
      </div>

  
      <div className={classNames('transition-all duration-300', {
        'ml-60': isOpen || isDesktop, 
        'ml-0': !isOpen && !isDesktop, 
      })}>
        
      </div>
    </div>
  );
}

function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link to={item.path} className={classNames(
      pathname === item.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
      linkClasses
    )}>
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
