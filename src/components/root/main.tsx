import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
