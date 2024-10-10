import React from 'react';
import { useNavigate, Link} from 'react-router-dom';
import SidebarItem from './SidebarItem';
import { Icons } from '../consts';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';

export default function SidebarLeft() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    return (
      <div className="hidden lg:flex h-screen flex-col justify-between w-48 fixed left-0 top-0 bottom-0 pt-24">
        <ul className="space-y-8">
          {[
            {icon:'favourites', text:'doctores', path: '/doctores'},
            {icon:'dashboard', text:'dashboard', path: '/dashboard'},
            {icon:'collection', text:'citas', path: '/citas'},
            {icon:'trending', text:'pacientes', path: '/pacientes'},
          ].map((item, index) => (
            <li key={item.icon} className="relative">
              <Link to={item.path}>
                <SidebarItem key={item.icon} text={item.text} icon={item.icon} path={item.path} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="pb-5  px-4">
          <hr className="mb-5 text-zinc-700" />
          <button onClick={async () => {            
            await dispatch(logout());
            navigate('/login', {replace: true}); 
          }} className="py-2 flex items-center  text-zinc-500">
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
          </button>
        </div>
      </div>
    );
  }