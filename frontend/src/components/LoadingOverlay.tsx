import Loading from "./Loading";

export default function LoadingOverlay() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full z-50 overflow-hidden bg-slate-100 opacity-75 flex flex-col items-center justify-center">
      <Loading />
    </div>
  );
}
