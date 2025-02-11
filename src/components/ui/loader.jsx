export default function SpinnerLoader() {
    return (
      <div className="relative w-[54px] h-[54px] rounded-md">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-[30%] w-[8%] h-[24%] bg-gray-500 opacity-0 rounded-full shadow-md"
            style={{
              transform: `rotate(${index * 30}deg) translate(0, -130%)`,
              animation: "fade458 1s linear infinite",
              animationDelay: `-${1.2 - index * 0.1}s`,
            }}
          ></div>
        ))}
        <style>
          {`
            @keyframes fade458 {
              from { opacity: 1; }
              to { opacity: 0.25; }
            }
          `}
        </style>
      </div>
    );
  }
  