
export default function Spinner() {
    return (
        <>
            <div className='bg-slate-100 space-x-4 flex items-center justify-center min-h-screen' >
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-600 border-b-green-800 rounded-full animate-bounce' style={{ animationDelay: '-0.3s' }}></div>
                <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-600 border-b-green-800 rounded-full animate-bounce' style={{ animationDelay: '-0.15s' }}></div>
                <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-600 border-b-green-800 rounded-full animate-bounce'></div>
            </div>
        </>
    )
}