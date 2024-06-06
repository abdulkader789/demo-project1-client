import { Link } from "react-router-dom";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa"; // Import the down arrow icon
import { useMobileNav } from "../../contexts/MobileNavContext";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  {
    title: "Services",
    path: "/services",
    // dropdown: true,
    // submenu: ["Service 1", "Service 2", "Service 3"],
  },
  { title: "Team", path: "/team" },
  // { title: "Blogs", path: "/blogs" },
  { title: "Contact", path: "/contact" },
];

const NavLinks = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { isActive, handleClick } = useMobileNav();
  const handleDropdownClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <ul className=" flex flex-col  lg:flex-row relative z-50 w-full lg:w-auto">
      {navLinks.map((link, index) => (
        <li
          key={index}
          className="flex-1 px-10 lg:px-5 michroma-regular text-[10px] lg:text-[12px] py-4 border-b-[1px] border-gray-200 lg:border-none "
        >
          {link.dropdown ? (
            <div className="relative ">
              <span
                className="block uppercase cursor-pointer"
                onClick={() => handleDropdownClick(index)}
              >
                {link.title}
                <FaAngleDown className="ml-1 relative -top-[1px] inline-block  text-2xl" />
              </span>
              {activeIndex === index && (
                <ul className="lg:absolute lg:top-10 lg:bg-white  h-40 lg:left-0  py-2 px-4 lg:w-48 lg:py-5">
                  {link.submenu.map((item, subIndex) => (
                    <li
                      key={subIndex}
                      className=" lg:text-black text-white mb-2 cursor-pointer py-1"
                    >
                      <Link
                        to={`${link.path}/${item
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        onClick={handleClick}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              to={link.path}
              className="block uppercase"
              onClick={handleClick}
            >
              {link.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
