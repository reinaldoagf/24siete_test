import React from 'react';
import { Icons } from '../consts';
import { useLocation } from 'react-router-dom'; // Importa el hook useLocation

export default function SidebarItem({ text, icon, path }) {
    const location = useLocation(); 
    const isActive = location.pathname === path; 
    return (
      <>
        {isActive? (
          <div className="absolute -left-1 top-0 bg-fuchsia-600 w-2 h-8 rounded-full" />
        ) : null}
        <div
          className={`pl-4 flex items-center capitalize   ${
            isActive ? 'text-fuchsia-600' : 'text-gray-500'
          }`}
        >
          <span
            className={`bg-gray-200 w-8 h-8 grid place-items-center mr-2 rounded-md ${
              isActive ? 'bg-fuchsia-600' : 'bg-gray-200'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {Icons[icon]()}
            </svg>
          </span>
          {text}
        </div>
      </>
    );
  }