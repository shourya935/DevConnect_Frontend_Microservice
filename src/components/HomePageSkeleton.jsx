import React from "react";
// import { Skeleton } from "@/components/ui/skeleton"; // if using shadcn-ui, else use divs with animate-pulse
import { Home, Bell, MessagesSquare } from "lucide-react";

const HomePageSkeleton = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    
      {/* ====== UserCard Skeleton ====== */}
      <div className="flex-1 px-4 py-4">
        <div className="bg-white shadow-md rounded-lg w-full overflow-hidden">
          {/* Image area */}
          <div className="relative h-[520px] w-full bg-gray-300 animate-pulse"></div>

          {/* Overlay section (simulate text and buttons) */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
            <div className="space-y-3">
              {/* Name + Age + Button */}
              <div className="flex justify-between items-center">
                <div className="h-6 w-32 bg-gray-400 rounded-md animate-pulse" />
                <div className="h-8 w-24 bg-gray-400 rounded-full animate-pulse" />
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {Array(3)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-5 w-20 bg-gray-400 rounded-full animate-pulse"
                    />
                  ))}
              </div>

              {/* About */}
              <div className="h-12 w-full bg-gray-400 rounded-md animate-pulse" />

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <div className="flex-1 h-10 bg-gray-400 rounded-lg animate-pulse" />
                <div className="flex-1 h-10 bg-gray-400 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Bottom Navigation Skeleton ====== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-20 max-w-md mx-auto px-4">
          {[Home, Bell, MessagesSquare].map((Icon, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-400"
            >
              <div className="w-7 h-7 bg-gray-300 rounded-full animate-pulse mb-1" />
              <div className="h-3 w-10 bg-gray-300 rounded-md animate-pulse" />
            </div>
          ))}

          {/* Profile image placeholder */}
          <div className="flex flex-col items-center justify-center flex-1 h-full text-gray-400">
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse mb-1" />
            <div className="h-3 w-10 bg-gray-300 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomePageSkeletonSignup = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

        {/* ====== Navbar Skeleton ====== */}
      <div className="navbar bg-base-100 shadow-sm px-4 h-14 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full animate-pulse" />
          <div className="h-5 w-24 bg-gray-300 rounded-md animate-pulse" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-5 w-24 bg-gray-300 rounded-md animate-pulse" />
          <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse relative" />
        </div>
      </div>
    
      {/* ====== UserCard Skeleton ====== */}
      <div className="flex-1 px-4 py-4">
        <div className="bg-white shadow-md rounded-lg w-full overflow-hidden">
          {/* Image area */}
          <div className="relative h-[520px] w-full bg-gray-300 animate-pulse"></div>

          {/* Overlay section (simulate text and buttons) */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
            <div className="space-y-3">
              {/* Name + Age + Button */}
              <div className="flex justify-between items-center">
                <div className="h-6 w-32 bg-gray-400 rounded-md animate-pulse" />
                <div className="h-8 w-24 bg-gray-400 rounded-full animate-pulse" />
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {Array(3)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-5 w-20 bg-gray-400 rounded-full animate-pulse"
                    />
                  ))}
              </div>

              {/* About */}
              <div className="h-12 w-full bg-gray-400 rounded-md animate-pulse" />

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <div className="flex-1 h-10 bg-gray-400 rounded-lg animate-pulse" />
                <div className="flex-1 h-10 bg-gray-400 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== Bottom Navigation Skeleton ====== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-20 max-w-md mx-auto px-4">
          {[Home, Bell, MessagesSquare].map((Icon, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center flex-1 h-full text-gray-400"
            >
              <div className="w-7 h-7 bg-gray-300 rounded-full animate-pulse mb-1" />
              <div className="h-3 w-10 bg-gray-300 rounded-md animate-pulse" />
            </div>
          ))}

          {/* Profile image placeholder */}
          <div className="flex flex-col items-center justify-center flex-1 h-full text-gray-400">
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse mb-1" />
            <div className="h-3 w-10 bg-gray-300 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
