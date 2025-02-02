import React from "react";
import { BiCopyAlt } from "react-icons/bi";
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md";

const Card = () => {
  return (
    <div className="flex flex-col border rounded-2xl p-5 w-[350px] h-[400px] hover:bg-gray-100 cursor-pointer">
      <div className="flex flex-col flex-1">
        <div className="">
          <span>date</span>
          <span>text</span>
        </div>
        <span>title</span>
        <div className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, nobis
          quisquam accusamus at non earum minus enim laborum recusandae alias?
        </div>
        <span>image</span>
      </div>
      {/* buttons ------------------------- */}
      <div className="flex items-end justify-end *:text-2xl gap-1 *:text-slate-400 *:p-2">
        <button className="hover:bg-gray-200 rounded-full">
          <BiCopyAlt />
        </button>
        <button className="hover:bg-gray-200 rounded-full">
          <MdDriveFileRenameOutline />
        </button>
        <button className="hover:bg-gray-200 rounded-full">
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Card;
