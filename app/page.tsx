import { lugrasimo } from "@/components/fonts/lugrasimo";
import { signikaNegative } from "@/components/fonts/signika";
import { LoginForm } from '@/components/auth/login-form';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center md:justify-between md:w-full">
          <div className="text-left md:text-center mb-12 md:mb-6 md:w-2/4">
            <h1 className={`${lugrasimo.className} text-6xl hidden md:block md:text-8xl md:leading-normal`}>
              <strong>View<span className='text-red-600'>Soul</span></strong>
            </h1>
            <h2 className={`${signikaNegative.className} hidden md:block text-lg md:text-2xl mt-4 md:mt-2`}>
              VIEWSOUL te ayuda a comunicarte y compartir con las personas que forman parte de tu vida
            </h2>
          </div>
          <div className="flex justify-center md:w-2/4">
            <LoginForm />
          </div>
        </div>
      </div>
      <footer className="w-full  py-4 text-center text-gray-600">
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Download the ViewSoul app</a>
          <a href="#" className="hover:underline">Help Centre</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Ads info</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Careers</a>
          <a href="#" className="hover:underline">Brand Resources</a>
          <a href="#" className="hover:underline">Advertising</a>
          <a href="#" className="hover:underline">Marketing</a>
          <a href="#" className="hover:underline">ViewSoul for Business</a>
          <a href="#" className="hover:underline">Developers</a>
          <a href="#" className="hover:underline">Directory</a>
          <a href="#" className="hover:underline">Settings</a>
        </div>
        <div className="mt-4">
          <p className="text-sm">© 2024 ViewSoul Corp.</p>
        </div>
      </footer>
    </main>
  );
}
