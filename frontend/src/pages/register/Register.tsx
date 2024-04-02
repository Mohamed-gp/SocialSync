import { useState } from "react";

const Register = () => {
  const [data, setData] = useState({ firstName: "", lastName: "" });
  return (
    <div className="container rounded-2xl bg-white flex flex-col my-6 py-6 px-6 gap-3">
      <p>Welcome to SocialSync,The social Media for SocioPaths!</p>
      <div className="flex gap-2">
        <div className="relative w-[50%]">
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            name="firstName"
            id="firstName"
            className="peer w-full pt-5 pb-2 px-3 border-2 text-xs  focus:outline-none rounded-md "
          />
          <label
            htmlFor="firstName"
            className={`absolute ${
              !data.firstName ? "text-[13px] top-3" : "text-[10px] top-1 "
            }  peer-focus:text-[10px] peer-focus:top-1 duration-500 left-3  opacity-50`}
          >
            First Name
          </label>
        </div>
        <div className="relative w-[50%]">
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            name="lastName"
            id="lastName"
            className="peer pt-5 pb-2 px-3 border-2 text-xs w-full focus:outline-none rounded-md "
          />
          <label
            htmlFor="email"
            className={`absolute ${
              !data.lastName ? "text-[13px] top-3" : "text-[10px] top-1 "
            }  peer-focus:text-[10px] peer-focus:top-1 duration-500 left-3  opacity-50`}
          >
            Last Name
          </label>
        </div>
      </div>
      <div className="relative ">
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          name="lastName"
          id="lastName"
          className="peer pt-5 pb-2 px-3 border-2 text-xs w-full focus:outline-none rounded-md "
        />
        <label
          htmlFor="email"
          className={`absolute ${
            !data.lastName ? "text-[13px] top-3" : "text-[10px] top-1 "
          }  peer-focus:text-[10px] peer-focus:top-1 duration-500 left-3  opacity-50`}
        >
          Last Name
        </label>
      </div>
      <div className="relative ">
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          name="lastName"
          id="lastName"
          className="peer pt-5 pb-2 px-3 border-2 text-xs w-full focus:outline-none rounded-md "
        />
        <label
          htmlFor="email"
          className={`absolute ${
            !data.lastName ? "text-[13px] top-3" : "text-[10px] top-1 "
          }  peer-focus:text-[10px] peer-focus:top-1 duration-500 left-3  opacity-50`}
        >
          Last Name
        </label>
      </div>
      <div className="relative ">
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          name="lastName"
          id="lastName"
          className="peer pt-5 pb-2 px-3 border-2 text-xs w-full focus:outline-none rounded-md "
        />
        <label
          htmlFor="email"
          className={`absolute ${
            !data.lastName ? "text-[13px] top-3" : "text-[10px] top-1 "
          }  peer-focus:text-[10px] peer-focus:top-1 duration-500 left-3  opacity-50`}
        >
          Last Name
        </label>
      </div>
      <div className="relative ">
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          name="lastName"
          id="lastName"
          className="peer pt-5 pb-2 px-3 border-2 text-xs w-full focus:outline-none rounded-md "
        />
        <label
          htmlFor="email"
          className={`absolute ${
            !data.lastName ? "text-[13px] top-3" : "text-[10px] top-1 "
          }  peer-focus:text-[10px] peer-focus:top-1 duration-500 left-3  opacity-50`}
        >
          Last Name
        </label>
      </div>
      <div className="relative ">
        <input
          type="text"
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          name="lastName"
          id="lastName"
          className="peer pt-5 pb-2 px-3 border-2 text-xs w-full focus:outline-none rounded-md "
        />
        <label
          htmlFor="email"
          className={`absolute ${
            !data.lastName ? "text-[13px] top-3" : "text-[10px] top-1 "
          }  peer-focus:text-[10px] peer-focus:top-1 duration-500 left-3  opacity-50`}
        >
          Last Name
        </label>
      </div>
      <button className="bg-[#03a9f4] text-white font-bold py-2 rounded-xl my-2">
        Submit
      </button>
    </div>
  );
};
export default Register;
