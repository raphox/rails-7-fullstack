import Link from "next/link";
import SearchList, { SearchListProps } from "../SearchList";

interface SidebarProps {
  children: React.ReactElement[];
}

function Sidebar({ children }: SidebarProps) {
  return (
    <div className="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r border-slate-200 w-80 h-[100vh]">
      <div>
        <div className="sticky top-0 z-10">{children}</div>
      </div>
    </div>
  );
}

interface SidebarHeaderProps {
  href: string;
  hrefNew: string;
  title: string;
}

function SidebarHeader({ href, hrefNew, title }: SidebarHeaderProps) {
  return (
    <div className="flex items-center bg-white border-b border-slate-200 px-5 h-16">
      <div className="w-full flex items-center justify-between">
        <div className="relative">
          <h1 className="font-semibold text-slate-800">
            <Link href={href} aria-label="List items">
              {title}
            </Link>
          </h1>
        </div>
        <Link
          href={hrefNew}
          aria-label="New item"
          className="p-1.5 shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm ml-2"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}

function SidebarList(props: SearchListProps) {
  return <SearchList {...props} />;
}

export { Sidebar as Root, SidebarHeader as Header, SidebarList as List };
