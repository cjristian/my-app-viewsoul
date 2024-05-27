export default function AuthLayaout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-full flex items-center justify-center  bg-gradient-to-r from-black to-red-950">
      {children}
    </div>
  )

}