import type { NextApiRequest, NextApiResponse } from 'next';

// http://localhost:3000/api/revalidate?secret=abc&path=/en/hong-kong/ssr-demo
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const url = req.query.path as string;

    if (url === undefined) {
        return res.status(500).send('Error path');
    }

    try {
        await res.revalidate(url);
        return res.json({ message: 'revalidated' });
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
}
