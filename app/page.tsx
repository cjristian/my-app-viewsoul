import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lugrasimo } from "@/components/fonts/lugrasimo";
import { signikaNegative } from "@/components/fonts/signika";
import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      <div className="w-full">
        <div className="text-center mb-12 md:mb-6">
          <h1 className={`${lugrasimo.className} text-6xl md:text-8xl md:leading-normal`}>
            <strong>View<span className='text-red-600'>Soul</span></strong>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:justify-around md:w-full">
          <div className="text-center md:w-2/4">
            <h2 className={`${signikaNegative.className} text-lg md:text-2xl`}>
              VIEWSOUL te ayuda a comunicarte y compartir con las personas que forman parte de tu vida
            </h2>
          </div>
          <div className="flex justify-center mt-8 md:mt-0">
            <LoginButton mode="modal" asChild>
              <Button variant="outline" className='flex items-center gap-5 self-center rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base' size="lg">
              <span>Inicia Sesion</span> <ArrowRightIcon className="w-5 md:w-6" />
              </Button>
            </LoginButton>
          </div>
        </div>
      </div>
    </main>


  );
}
