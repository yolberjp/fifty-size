import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-10 items-center mt-[10%] max-w-5xl w-full m-auto">
      <h1 className="text-7xl font-bold p-1 bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-800">Fifty Size</h1>
        <div className="w-full p-5 flex items-center justify-center rounded-xl">
          <div className="relative w-2xl rounded-full h-16 cursor-pointer">
            <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-red-500 to-purple-500">
              <div className="flex h-full w-full items-center justify-between bg-white rounded-full">
                  <div className="relative flex flex-col justify-center items-center gap-2 h-full w-32 border-r">
                    <Image src="/images/zara.webp" alt="zara logo" width={50} height={0} />
                  </div>
                  
                  <div>Pants</div>
                  
                  <div>Man</div>
                  
                  <div className="flex justify-center items-center h-full w-32 border-l">
                    M
                  </div>
                </div>
            </span>
          </div>
        </div>
        
      </main>
    </div>
  );
}
