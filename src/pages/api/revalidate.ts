import type { NextApiRequest, NextApiResponse } from 'next';

// on-demand demo url
// https://on-demand-isr.vercel.app/
// http://localhost:3000/api/revalidate?secret=abc&path=/en/hong-kong/ssr-demo

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const url = req.query.path as string;

    if (url === undefined) {
        return res.status(500).send('Error path');
    }

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate(url);
        return res.json({ message: 'revalidated' });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}
