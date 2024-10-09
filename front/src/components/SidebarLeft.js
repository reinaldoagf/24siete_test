import React from 'react';
import SidebarItem from './SidebarItem';
import { Icons } from '../consts';

export default function SidebarLeft() {
    return (
      <div className="hidden lg:flex h-screen flex-col justify-between w-48 fixed left-0 top-0 bottom-0 pt-24">
        <ul className="space-y-8">
          {[
            {icon:'favourites', text:'doctores'},
            {icon:'dashboard', text:'dashboard'},
            {icon:'collection', text:'citas'},
            {icon:'trending', text:'pacientes'}
          ].map((key, index) => (
            <SidebarItem key={key.icon} text={key.text} icon={key.icon} index={index} />
          ))}
        </ul>
        <div className="pb-5  px-4">
          <hr className="mb-5 text-zinc-700" />
          <a href="#" className="py-2 flex items-center  text-zinc-500">
            <span className="bg-gray-200 w-8 h-8 grid place-items-center mr-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {Icons.logout()}
              </svg>
            </span>
            Logout
          </a>
        </div>
      </div>
    );
  }