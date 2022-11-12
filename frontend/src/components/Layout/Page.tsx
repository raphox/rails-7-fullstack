function Page(props: { children: React.ReactElement[] }) {
  return <div className="relative flex">{props.children}</div>;
}

function PageSidebar(props: { children: React.ReactElement }) {
  return <div>{props.children}</div>;
}

function PageHeader() {
  return (
    <div className="sticky">
      <div className="flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 md:px-5 h-16">
        <div className="flex items-center"></div>
        <div className="flex"></div>
      </div>
    </div>
  );
}

function PageContent(props: { children: React.ReactElement }) {
  return (
    <div className="grow flex flex-col">
      <PageHeader />
      <div className="grow px-4 sm:px-6 md:px-5 py-6">{props.children}</div>
    </div>
  );
}

export {
  Page as Root,
  PageSidebar as Sidebar,
  PageHeader as Header,
  PageContent as Content,
};
