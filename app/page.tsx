import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lugrasimo } from "@/components/fonts/lugrasimo";
import { signikaNegative } from "@/components/fonts/signika";


export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center ">
      <div className="flex   justify-around">
        <div className="flex-col w-2/4 ">
          <h1 className={`${lugrasimo.className} text-4xl  md:text-8xl md:leading-normal`}>
            <strong>View<span className='text-red-600'>Soul</span></strong>
          </h1>
          <h2 className={`${signikaNegative.className},mt-3 text-lg md:text-2xl`}>VIEWSOUL te ayuda a comunicarte y compartir con las personas que forman parte de tu vida</h2>
        </div>
        <div className="flex justify-center content-center">

          <Link
            href="/auth/login"
            className="flex items-center gap-5 self-center rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base"
          >
            <span>Inicia Sesion</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>


        </div>
      </div>
    </main>
  );
}
