import { FaUser, FaPhone } from "react-icons/fa6";
import BuyPage from "../Navbar/BuyPage";
import PhoneModel from "./PhoneModel";

function FooterFlex() {
  return (
    <div className="bg-black    fixed inset-x-4 bottom-4 h-16 rounded-full shadow-lg flex justify-around items-center px-4">
      <ul className="flex justify-between w-full items-center text-white text-2xl">
        <li className="hover:scale-110 transition-transform duration-200 cursor-pointer">
          <FaUser />
        </li>
      
        <BuyPage />
        <PhoneModel />
      </ul>
    </div>
  );
}

export default FooterFlex;
