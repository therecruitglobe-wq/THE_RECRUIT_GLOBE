
import React from 'react';

const JobCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-lg shadow-md flex flex-col overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="p-6 flex flex-col flex-1 relative">
            <div className="absolute top-4 right-4 bg-gray-300 w-6 h-6 rounded"></div>

            <div className="flex justify-between items-start">
                <div className="pr-10 w-full">
                    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="bg-gray-300 h-5 w-20 rounded-full"></div>
            </div>
            <div className="mt-4 space-y-2 flex-grow">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
            
            <div className="mt-auto pt-4">
                <div className="h-10 bg-gray-300 rounded-full w-full"></div>
            </div>
        </div>
    </div>
);

export default JobCardSkeleton;
