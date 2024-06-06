export default function AuthLayaout({ children }: { children: React.ReactNode }) {

  return (
    <div className=" h-[1000px] flex items-center justify-center  bg-gradient-to-r from-black to-red-950 sm:h-[750px] md:h-[1000px] lg:h-[1050px]">
      {children}
    </div>
  )

}