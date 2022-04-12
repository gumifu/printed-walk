import React from "react";
import { ChangeThemeButton } from "./ChangeThemeButton";

export const HeaderTest = () => {
  return (
    <header className="space-y-2 p-2 sm:px-4 sm:py-2 lg:p-2 xl:px-4 xl:py-2 hidden md:inline-block">
      <div className="flex items-center justify-between">
        <span className="group inline-flex items-center text-xl font-medium pl-2 pr-3 py-2">
          <ChangeThemeButton />
        </span>
      </div>
    </header>
  );
};
