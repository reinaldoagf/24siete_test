import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab } from '../redux/features/tabsSlice';

export default function ArtworkSelector({ text, index }) {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.tabs.selectedTab);

  return (
      <li className="">
        <button
        onClick={() => {
          dispatch(setSelectedTab(text));
        }}
          className={` ${
            selectedTab === text ?  'text-fuchsia-600 underline font-bold' : 'text-zinc-500'
          }`}
        >
          {text}
        </button>
      </li>
  );
}