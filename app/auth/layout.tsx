export default function AuthLayaout({ children }: { children: React.ReactNode }) {

  return (
    <div className=" h-[1000px] md:h-screen w-screen sm:h-[750px] flex items-center justify-center  bg-gradient-to-r from-black to-red-950">
      {children}
    </div>
  )

}