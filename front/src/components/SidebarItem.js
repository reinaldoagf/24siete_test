import React from 'react';
import { Icons } from '../consts';

export default function SidebarItem({ text, icon, index }) {
    return (
      <li className="relative">
        {index === 1 ? (
          <div className="absolute -left-1 top-0 bg-fuchsia-600 w-2 h-8 rounded-full" />
        ) : null}
        <a
          href="#"
          className={`pl-4 flex items-center capitalize   ${
            index === 1 ? 'text-fuchsia-600' : 'text-gray-500'
          }`}
        >
          <span
            className={`bg-gray-200 w-8 h-8 grid place-items-center mr-2 rounded-md ${
              index === 1 ? 'bg-fuchsia-600' : 'bg-gray-200'
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
        </a>
      </li>
    );
  }