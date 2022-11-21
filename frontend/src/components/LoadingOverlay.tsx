import Loading from "./Loading";

interface LoadingOverlayProps {
  bgColor?: string;
}

export default function LoadingOverlay({
  bgColor = "slate-100",
}: LoadingOverlayProps) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full z-50 overflow-hidden bg-${bgColor} opacity-75 flex flex-col items-center justify-center`}
    >
      <Loading />
    </div>
  );
}
