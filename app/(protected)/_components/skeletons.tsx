
export function SkeletonCardListFriends() {
    return (
        <div className="w-full h-full bg-gray-300 animate-pulse md:flex md:flex-col md:items-start md:w-1/2 md:h-[244px] md:bg-red-950 p-4 md:mt-0 mt-2 md:ml-2 rounded-sm overflow-y-scroll">
            <h2 className="text-xl font-bold mb-4">Friends</h2>
            <hr className="w-full h-1 border-none bg-gradient-to-r from-white to-red-950" />
            <ul>
                {[...Array(5)].map((_, index) => (
                    <li key={index} className="mb-2">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-400 rounded-full mr-2"></div>
                            <div>
                                <div className="w-24 h-6 bg-gray-400 mb-1"></div>
                                <div className="w-16 h-4 bg-gray-300"></div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export function SkeletonCardDetails() {
    return (
        <div className="w-full h-full md:flex md:flex-col md:items-start md:justify-center md:w-1/2 md:h-[244px] bg-gradient-to-r from-black to-red-950 p-4 md:mr-2 rounded">
            <h2 className="text-xl font-bold mb-4 animate-pulse">Detalles</h2>
            <hr className="w-full h-1 border-none bg-gradient-to-r from-white to-red-950 mb-4" />

            <div className="animate-pulse mb-4">
                <div className="text-lg mb-2 bg-gray-300 h-6 w-36 rounded-md"></div>
                <div className="text-lg mb-2 bg-gray-300 h-6 w-96 rounded-md"></div>
                <div className="text-lg mb-2 bg-gray-300 h-6 w-80 rounded-md"></div>
                <div className="text-lg mb-2 bg-gray-300 h-6 w-96 rounded-md"></div>
            </div>

            <hr className="w-full h-1 border-none bg-gradient-to-r from-white to-red-950" />
        </div>
    );
}
export function SkeletonCardProfilePicture() {
    return (
        <div className="flex flex-col items-center mb-4 mt-20 relative z-10">
            <div className="flex flex-col items-center" >
                <div className="rounded-full w-32 h-32 mb-2  bg-gray-500"></div>
                <h1 className="text-3xl font-bold w-24 h-8 bg-gray-300 mb-1"></h1>
                <h1 className="text-1xl text-white/35 w-16 h-4 bg-gray-300"></h1>
            </div>
        </div>
    );
}
export function SkeletonFrontPage() {
    return (
        <div className="absolute top-0 left-0 w-full h-80 rounded-sm bg-gray-300">

        </div>

    );
}
export function SkeletonPostProfile({ showOptions }: { showOptions?: boolean }) {
    return (
        <div className="rounded-lg shadow-md bg-black/35 mb-4 p-4 animate-pulse">
            <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
                <div className="flex-1 ml-4">
                    <div className="h-4 bg-gray-500 rounded w-1/3"></div>
                    <div className="mt-2 h-4 bg-gray-500 rounded w-1/4"></div>
                </div>
                {showOptions && (
                    <div className="ml-auto mr-3 rounded-full bg-gray-500 p-2 w-8 h-8"></div>
                )}
            </div>
            <div className="flex flex-col mt-4">
                <div className="h-4 bg-gray-500 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-500 rounded w-5/6"></div>
                <div className="relative flex justify-center w-full mt-2">
                    <div className="relative w-full h-64 bg-gray-500 rounded"></div>
                </div>
            </div>
        </div>
    );
}
