"use client";

import type { RootState } from "@/lib/store";
import { setListTabActive } from "@/lib/features/employeeSlice";
import { BiSolidGrid } from "react-icons/bi";
import { MdViewList } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@emp/ui";
import { TabsTrigger } from "@emp/ui/tabs";

function TabButtons() {
  const empTabActive = useSelector(
    (state: RootState) => state.employee.emp_tab_active,
  );
  const dispatch = useDispatch();

  const handleTabChange = (tab: "list" | "grid") => {
    dispatch(setListTabActive(tab));
  };

  return (
    <>
      <TabsTrigger
        value="list"
        className={cn(
          "h-10 w-10 rounded-full bg-zinc-200 p-0 data-[state=active]:bg-transparent dark:bg-zinc-700",
          empTabActive === "list" && "hidden",
        )}
        onClick={() => handleTabChange("list")}
      >
        <BiSolidGrid className="text-2xl" />
      </TabsTrigger>
      <TabsTrigger
        value="grid"
        className={cn(
          "h-10 w-10 rounded-full bg-zinc-200 p-0 data-[state=active]:bg-transparent dark:bg-zinc-700",
          empTabActive === "grid" && "hidden",
        )}
        onClick={() => handleTabChange("grid")}
      >
        <MdViewList className="text-2xl" />
      </TabsTrigger>
    </>
  );
}

export default TabButtons;
