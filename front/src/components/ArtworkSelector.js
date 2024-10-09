import React from 'react';

export default function ArtworkSelector({ text, index }) {
    return (
      <li className="">
        <button
          className={` ${
            index ? 'text-zinc-500' : 'text-fuchsia-600 underline font-bold'
          }`}
        >
          {text}
        </button>
      </li>
    );
  }