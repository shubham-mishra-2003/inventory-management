import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import { useTheme } from "@/hooks/ThemeProvider";
import { Colors } from "@/app/constants/Colors";

const Header = () => {
  const { colorScheme } = useTheme();
  return (
    <div
      className="w-full flex justify-between items-center py-2 px-4"
      style={{ backgroundColor: Colors[colorScheme].itemBackground }}
    >
      <div className="flex justify-center items-center gap-3">
        <Image src="/logo-icon.png" alt="Logo" height={40} width={40} />
        <h1
          style={{ color: Colors[colorScheme].text }}
          className="sm:text-2xl text-lg font-extrabold font-serif"
        >
          Gyan{" "}
          <span
            className={`${
              colorScheme == "dark" ? "text-green-400" : "text-green-600"
            }`}
          >
            Grove
          </span>
        </h1>
      </div>
      <ThemeSwitch />
    </div>
  );
};

export default Header;
