import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { motion } from "framer-motion";

const Theme = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const html = document.querySelector("html");
    if (theme === "dark") {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {theme === "dark" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "tween" }}
          onClick={() => setTheme("light")}
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="fixed bg-white cursor-pointer flex justify-center items-center bottom-8 right-8 w-16 h-16 rounded-full"
        >
          <FaSun />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "tween" }}
          onClick={() => setTheme("dark")}
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          className="fixed bg-white cursor-pointer flex justify-center items-center bottom-8 right-8 w-16 h-16 rounded-full"
        >
          <FaMoon />
        </motion.div>
      )}
    </>
  );
};

export default Theme;
