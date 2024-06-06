"use client"
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function NotFoundPage() {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-black to-red-950">
            <h1 className="text-4xl font-bold mb-4 text-white">404 - Página no encontrada pequeña</h1>
            <p className="text-lg text-gray-400 mb-8">La página que estás buscando no pudo ser encontrada.</p>
            <img alt="Confused Travolta"  src="https://i.gifer.com/4qb.gif"></img>
            <button
                onClick={goBack}
                className="flex items-center mt-3 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Volver
            </button>
        </div>
    );
}
