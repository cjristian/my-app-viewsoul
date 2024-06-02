
export default function SkeletonCardListFriends() {
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
