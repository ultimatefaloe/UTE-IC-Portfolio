import Link from 'next/link';
import React from 'react';

interface LinkProps {
  children: React.ReactNode;
  className?: string;
  onclick?: () => void;
  download?: boolean;
  href: string;
  prefetch?: boolean | 'auto' | 'unstable_forceStale' | null;
  style?: React.CSSProperties;
}

const LinkButton: React.FC<LinkProps> = ({
  children,
  className,
  href,
  prefetch,
  onclick,
  style,
  download,
}) => {
  return (
    <Link
      style={style}
      href={href}
      prefetch={prefetch}
      download={download}
      onClick={onclick}
      className={`className="items-center gap-2 border-2 border-sky-400  text-gray-700 hover:bg-sky-400 hover:text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
