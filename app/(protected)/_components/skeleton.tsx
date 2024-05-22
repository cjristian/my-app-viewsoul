
const Skeleton = () => {
    return (
        <div className="skeleton animate-pulse">
            <div className="skeleton-row flex items-center space-x-4">
                <div className="skeleton-item w-16 h-16 rounded-full bg-gray-300"></div>
                <div className="skeleton-item w-20 h-4 bg-gray-300"></div>
                <div className="skeleton-item w-20 h-4 bg-gray-300"></div>
                <div className="skeleton-item w-20 h-4 bg-gray-300"></div>
                <div className="skeleton-item w-20 h-4 bg-gray-300"></div>
            </div>
        </div>
    );
};

export default Skeleton;
