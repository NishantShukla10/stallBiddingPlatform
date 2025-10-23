export default function Button({
  onClick,
  text,
  icon: Icon,
  color = "yellow",
  className="",
}) {
  // Tailwind color map
  const colorClasses = {
    yellow: "bg-yellow-400 hover:bg-yellow-500 text-gray-800",
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} px-4 py-2 rounded-lg 
      font-medium shadow-sm hover:shadow-md hover:cursor-pointer transition-all duration-200 
      flex items-center gap-2 ${className} `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </button>
  );
}
