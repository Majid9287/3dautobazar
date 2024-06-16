import Link from 'next/link';
import { useState, useEffect } from 'react';

// Skeleton Component (CarCardSkeleton.jsx)
const CarCardSkeleton = () => (
    <div className="group my-2 rounded-lg flex w-full p-2 md:max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md animate-pulse">
        <div className="relative flex h-60 overflow-hidden">
            <div className="absolute top-0 rounded-lg right-0 h-full w-full object-cover bg-gray-200 opacity-75" /> 
        </div>
        <div className="mt-4 px-5 pb-5 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/2" />
        </div>
    </div>
);
export default CarCardSkeleton;