"use client"
import { ReactNode } from "react";

type MainProps = {
  children: ReactNode
}

const Main = ({children}: MainProps) => {
  return (
      <div className="lg:ml-64 p-4">
        <div className="min-h-screen bg-gray-100 rounded-xs p-2">
            {children}
        </div>
      </div>
  )
}

export default Main;