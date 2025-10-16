import React from "react";

const SidebarSkeleton = () => {
  // Generate placeholder items
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="w-full animate-pulse p-4">
      {skeletonItems.map((_, index) => (
        <div key={index} className="flex items-center gap-4 mb-4">
          {/* Avatar skeleton */}
          <div className="w-14 h-14 bg-gray-200 rounded-full flex-shrink-0" />

          {/* Text skeletons */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarSkeleton;
