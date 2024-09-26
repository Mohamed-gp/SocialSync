import { FaVideo } from "react-icons/fa6";

interface CallUserProps {
  activeInbox: any;
}
const CallUser = ({ activeInbox }: CallUserProps) => {
  return (
    <>
      <FaVideo className="cursor-pointer text-mainColor duration-1000 hover:text-white " />
    </>
  );
};

export default CallUser;
