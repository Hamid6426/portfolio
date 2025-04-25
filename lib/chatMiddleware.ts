// // lib/chatMiddleware.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/react';

// export const withAuth = handler => async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getSession({ req });
//   if (!session) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
//   req.userId = session.user.id;
//   return handler(req, res);
// };
