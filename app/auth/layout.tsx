export default function AuthLayaout({ children }: { children: React.ReactNode }) {

  return (
    <div className=" h-[000px] md:h-[1000] w-screen sm:h-[750px] lg:h-[1050px] flex items-center justify-center  bg-gradient-to-r from-black to-red-950">
      {children}
    </div>
  )

}