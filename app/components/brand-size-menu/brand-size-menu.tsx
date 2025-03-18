import { Separator } from "@/components/ui/separator";
import Brand from "./brand";
import Category from "./category";
import Gender from "./gender";
import Size from "./size";

export default function BrandSizeMenu(){

    return (
      <div className="w-full p-5 flex items-center justify-center rounded-xl">
          <div className="relative w-2xl rounded-full h-20 cursor-pointer shadow-2xl">
            <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-red-500 to-purple-500">
              <div className="flex gap-1 h-full w-full items-center bg-white rounded-full">
                  
                  <Brand />
                  <Separator orientation="vertical" className="!h-10"/>
                  <Category />
                  <Separator orientation="vertical" className="!h-10"/>
                  <Gender />
                  <Separator orientation="vertical" className="!h-10"/>
                  <Size />

                </div>
            </span>
          </div>
        </div>
        )}