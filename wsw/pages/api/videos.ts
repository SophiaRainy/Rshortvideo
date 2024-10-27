import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const count = Number(req.query.count) || 1;

  try {
    const videos = [];
    for (let i = 0; i < count; i++) {
      const response = await fetch('https://api.mmp.cc/api/miss?type=json');
      if (!response.ok) {
        throw new Error(`Failed to fetch from external API: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data && data.link) {
        videos.push(data);
      }
    }

    res.status(200).json(videos);
  } catch (error: unknown) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Failed to fetch videos', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
