const Loader: React.FC<{ size: '30' | '50' | '80'; color: string }> = ({ size, color }) => {
  return (
    <div
      className={`flex justify-center items-center relative`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <div
        style={{
          borderTopColor: `${color}`,
          width: `${parseInt(size) - 4}px`,
          height: `${parseInt(size) - 4}px`,
        }}
        className={`animate-spin w- loader inline-block absolute border-4 border-gray-200 rounded-full`}
      ></div>
    </div>
  );
};

export default Loader;
