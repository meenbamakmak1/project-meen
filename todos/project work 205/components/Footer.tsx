"use client"

import Link from "next/link";

import { Badge } from "@/components/tailgrids/core/badge";
import { Discord, Facebook, Instagram, Twitter } from "@tailgrids/icons";

export default function Footer() {
    return (
        //footer container
    
        <div className="mt-4 text-center">
         {/* student info */}
         <div>
            <Badge className ="text-xl text-black rounded-lg">68052228 นายกฤษณะ ฮุสเซ็น </Badge>
         </div>
         {/* contact info */}
        <div className="mt-4 flex justify-center gap-6">
            <Link href="https://www.facebook.com/meen.kritsana/">
            <Facebook  className="text-blue-600 hover:text-blue-800"/>
            </Link>
            <div className="border-l-1"></div>
            <Link href="https://www.instagram.com/keikoh_0/">
            <Instagram className="text-pink-600 hover:text-pink-800"/>
            </Link>
            <div className="border-l-1"></div>
            <Link href="https://twitter.com/keikoh_0">
            <Twitter className="text-blue-400 hover:text-blue-600"/>
            </Link>
            <div className="border-l-1"></div>
            <Link href="https://discord.gg/Ngr6cA9ra">
            <Discord className="text-blue-500 hover:text-gray-800"/>    
            </Link>
        </div>
           
        </div>
    ); 
}