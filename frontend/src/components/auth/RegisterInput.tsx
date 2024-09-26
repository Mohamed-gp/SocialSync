import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface RegisterInputProps {
  name: string;
  data: any;
  setData: any;
  isHalf?: boolean;
}

const RegisterInput = ({ name, data, setData }: RegisterInputProps) => {
  const [isPassword, setIsPassword] = useState(name == "password");
  return (
    <div className={`relative  w-full`}>
      <input
        type={isPassword ? `password` : "text"}
        value={data[name]}
        onChange={(e) =>
          setData((prev: any) => {
            let data = { ...prev };
            data[name] = e.target.value;
            return data;
          })
        }
        name={name}
        id={name}
        className="peer w-full pt-5 pb-2 px-3 border-2 text-xs dark:text-black  focus:outline-none rounded-md "
      />
      <label
        htmlFor={name}
        className={`absolute dark:text-black ${
          !data[name] ? "text-[13px] top-3" : "text-[10px] top-1 "
        }  peer-focus:text-[10px] peer-focus:top-1 duration-500 left-3  opacity-50`}
      >
        {name}
      </label>
      {(name == "email" || name == "username" || name == "password") && (
        <span
          className={`absolute text-xl  right-1  top-4 -translate-y-1/2 text-red-600`}
        >
          *
        </span>
      )}

      {name == "password" && (
        <>
          {isPassword ? (
            <FaEye
              onClick={() => setIsPassword((prev) => !prev)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-50`}
            />
          ) : (
            <FaEyeSlash
              onClick={() => setIsPassword((prev) => !prev)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer opacity-50`}
            />
          )}
        </>
      )}
    </div>
  );
};
export default RegisterInput;
