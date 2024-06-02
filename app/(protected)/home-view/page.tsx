import Search from '@/app/(protected)/_components/search';
import Table from '../_components/table';
import PostFriends from '../_components/profile/postFriends';


export default async function HomePage({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;


    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-4xl p-4">
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="Buscar personas con nombre o apellido" />
                </div>
                <Table query={query} currentPage={currentPage} />
                <PostFriends />
            </div>
        </div>
    );
}