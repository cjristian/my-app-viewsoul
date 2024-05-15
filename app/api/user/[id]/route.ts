// import { db } from "@/lib/db";
// import { NextApiRequest, NextApiResponse } from 'next'
// import type { User, ResponseError } from "@/interfaces/user"

// export default async function userHandler(
//     req: NextApiRequest,
//     res: NextApiResponse<User | ResponseError>,
// ) {
//     try {
//         const { userId } = req.query;

//         const user = await db.user.findUnique({
//             where: {
//                 id: userId as string 
//             },
//             include: {
//                 posts: true,
//                 followers: true, 
//                 following: true ,
//             }
//         });

//         if (!user) {
//             res.status(404).json({ error: "Usuario no encontrado" });
//             return;
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.error("Error al obtener usuario:", error);
//         res.status(500).json({ error: "Error al obtener usuario" });
//     }
// }
