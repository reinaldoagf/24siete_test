import React from 'react'
import SidebarLeft from "./SidebarLeft";
import Header from "./Header";

export default function Layout({children}) {
  return (
    <>
        <Header />
        <div className="flex flex-col md:flex-row">
            <div className="w-48 hidden lg:block shrink-0" >
            <SidebarLeft />
            </div>
                <div className="grow">
                    {children}
                </div>
        </div>
    </>
  )
}
