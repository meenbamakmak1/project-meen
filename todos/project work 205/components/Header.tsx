"use client"

import { Badge } from "@/components/tailgrids/core/badge";
import { useGlobalData } from "@/context/GlobalData";

export default function Header() {
    const { user } = useGlobalData();

    return (
        //header container
        <div className ="mt-4 text-center">
            {/* code */}
        <div className="flex justify-center gap-4">
    <Badge  className="text-3xl rounded-xl py-1 px-3 bg-red-300 text-gray-200 rotate-20">C</Badge>
    <Badge  className="text-3xl rounded-xl py-1 px-3 bg-blue-300 text-gray-200 -rotate-20">S</Badge>
    <Badge  className="text-3xl rounded-xl py-1 px-3 bg-green-300 text-gray-200 rotate-20">I</Badge>
    <Badge  className="text-3xl rounded-xl py-1 px-3 bg-yellow-300 text-gray-200 -rotate-20">2</Badge>
    <Badge  className="text-3xl rounded-xl py-1 px-3 bg-purple-300 text-gray-200 rotate-30">0</Badge>
    <Badge  className="text-3xl rounded-xl py-1 px-3 bg-pink-300 text-gray-200 -rotate-30">5</Badge>
        </div>
        {/* name */}
        <div className="mt-4">
         <Badge size="lg">FRONT END SOFTWARE DEVELOPER</Badge>

        </div>

        {/* logged-in user */}
        {user && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-lg">
            <span className="font-bold">
              ROLE:{" "}
              <span className="rounded-md bg-red-50 px-2 text-red-700">{user.role}</span>
            </span>
            <span className="font-bold">
              NAME:{" "}
              <span className="rounded-md bg-green-50 px-2 text-green-700">{user.name}</span>
            </span>
            <span className="font-bold">
              EMAIL:{" "}
              <span className="rounded-md bg-gray-100 px-2 font-normal text-gray-800">{user.email}</span>
            </span>
          </div>
        )}

    </div>
    );
}
