import React from 'react';
import SidebarItem from './SidebarItem';
import { Icons } from '../consts';
import { Artists } from '../consts';

export default function SidebarRight() {
    return (
      <div className="p-3 md:w-72 shrink-0 md:sticky md:top-16 shrink-0 h-full">
        <h2 className="text-xl font-semibold">Doctores más solicitados</h2>
        <ul className="mt-3 space-y-3">
          {Artists.map(({ name, handler, image }) => (
            <li
              className="bg-zinc-200 rounded-md p-2 flex shadow-lg"
              key={handler}
            >
              <img
                src={image}
                className="w-12 h-12 rounded-md"
                alt={`top artist ${name}`}
              />
              <div className="ml-3">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-zinc-400">{handler}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }