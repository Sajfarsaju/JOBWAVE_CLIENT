
export default function JobListingSkeleton() {
    return (
        <div className="shadow-md shadow-slate-400 lg:col-span-3 max-w-sm p-4 rounded animate-pulse md:p-6 dark:border-gray-300">
        <div className="flex items-center mt-3 space-x-3">
            <div className="w-14 h-14 bg-gray-200 dark:bg-gray-300 rounded-full"></div>
            <div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-2"></div>
                <div className="mt-3 w-48 h-2 bg-gray-200 dark:bg-gray-300 rounded-full dark-bg-gray-300"></div>
                <div className="inline-flex mt-3 items-center  rounded-full gap-x-1">
                    <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                    <h2 className="w-32 h-2 rounded-full bg-gray-300"></h2>
                </div>
            </div>
        </div>
        <div className="mt-5">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
    
    );
}
