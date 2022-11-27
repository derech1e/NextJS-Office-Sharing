import type {NextApiRequest, NextApiResponse} from 'next'
import {PrismaClient} from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'POST':
            try {
                const prisma = new PrismaClient();
                const note = await prisma.notes.create({
                    data: {
                        title: req.body.title,
                        content: req.body.content,
                    },
                });
                res.status(200).json(note);
            } catch (err) {
                res.status(500).end({error: 'Failed to send data', details: err})
            }
            break;
        default:
            res.status(405).end({error: 'Method not allowed'})
    }
}