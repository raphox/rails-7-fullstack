import clsx from "clsx";

interface NotificationProps {
  message: string | undefined;
  type?: "success" | "warning" | "error" | "info";
}

export default function Notification({ message, type }: NotificationProps) {
  if (!message) return null;

  let colorClass;

  switch (type) {
    case "warning":
      colorClass = "";
      break;

    case "error":
      colorClass = "";
      break;

    case "info":
      colorClass = "";
      break;

    default:
      colorClass = "bg-emerald-100 border border-emerald-200 text-emerald-600";
      break;
  }

  return message ? (
    <div className={`px-4 py-2 rounded-sm text-sm ${colorClass}`}>
      <div className="flex w-full justify-between items-start">
        <div className="flex">
          <svg
            className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"></path>
          </svg>
          <div>{message}</div>
        </div>
      </div>
    </div>
  ) : null;
}
