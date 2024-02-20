
export default function Spinner({JobSection , candidatesPages}) {
    return (
        <>
            <div className={`${JobSection && 'pt-20 justify-center lg:justify-start items-start' }  flex ${JobSection || candidatesPages ? 'bg-white' : ' bg-slate-100 justify-center items-center' } ${candidatesPages ? 'w-1/2 justify-center mx-auto sm:mx-0 pt-14 lg:pt-20 h-screen sm-auto' : 'min-h-screen'} space-x-4 `} >
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-600 border-b-green-800 rounded-full animate-bounce' style={{ animationDelay: '-0.3s' }}></div>
                <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-600 border-b-green-800 rounded-full animate-bounce' style={{ animationDelay: '-0.15s' }}></div>
                <div className='h-8 w-8 border-t-4 border-b-4 border-t-green-600 border-b-green-800 rounded-full animate-bounce'></div>
            </div>
        </>
    )
}