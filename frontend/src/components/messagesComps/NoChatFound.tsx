const NoChatFound = () => {
  return (
    <div
      className="flex justify-center items-center w-full"
      style={{ minHeight: "calc(100vh - 200px)" }}
    >
      <div className="flex flex-col items-center">
        <p className="font-bold text-mainColor">No Chat Found</p>
        <p className="opacity-70 text-sm mt-1 mb-3 dark:text-white text-center">
          Try Connecting With People
        </p>
      </div>
    </div>
  );
};
export default NoChatFound;
