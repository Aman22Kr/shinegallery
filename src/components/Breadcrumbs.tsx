import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-0 text-xs text-stone-500">
      <ol className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
        <li>
          <Link to="/" className="flex items-center hover:text-amber-800 transition">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center space-x-1 sm:space-x-2">
              <ChevronRight className="h-3 w-3 text-stone-400 shrink-0" />
              {isLast || !item.path ? (
                <span className="font-semibold text-stone-800 truncate max-w-[200px] sm:max-w-xs">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-amber-800 transition truncate max-w-[150px]">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
