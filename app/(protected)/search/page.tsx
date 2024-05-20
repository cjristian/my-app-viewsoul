import Search from '@/app/(protected)/_components/search';
import Table from '../_components/table';


export default async function Page({
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
        <div className="w-full">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Buscar personas con nombre o apellido" />
            </div>
            <Table query={query} currentPage={currentPage} />
        </div>
    );
}