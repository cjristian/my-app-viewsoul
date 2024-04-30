import { PowerIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from "@/auth"


// export default async function Layout({ children }: { children: React.ReactNode }) {
//     const session = await auth();

//     return (
//         // <body className='bg-red-400'>

//         //     <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
//         //         <div className="w-full flex-none md:w-64">
//         //             <div className="flex h-full flex-col px-3 py-4 md:px-2">
//         //                 <div className="mb-2 flex h-20 place-items-center rounded-md bg-red-600  md:h-40" >
//         //                     <div className="m-auto md:w-40 text-slate-50 text-center">

//         //                     </div>
//         //                 </div>

//         //                 <div className="flex grow flex-row justify-between bg-white space-x-2 md:flex-col md:space-x-0 md:space-y-2">
//         //                     <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
//         //                     <form action={async () => {
//         //                         "use server";
//         //                         await signOut();
//         //                     }}>
//         //                         <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
//         //                             <PowerIcon className="w-6" />
//         //                             <div className="hidden md:block">Sign Out</div>
//         //                         </button>
//         //                     </form>
//         //                 </div>
//         //             </div>
//         //         </div>
//         //         <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
//         //     </div>
//         // </body>

//     );
// }