"use client"
import { ReactNode } from "react";

type MainProps = {
  children: ReactNode
}

const Main = ({children}: MainProps) => {
  return (
      <div className="lg:ml-64">
        <div className="min-h-screen bg-gray-100 rounded-xs">
            {children}
        </div>
      </div>
  )
}

export default Main;