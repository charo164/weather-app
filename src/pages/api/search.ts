import { baseUrl } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const searchLocation = async (query: any) => {
  return (await fetch(`${baseUrl}search?query=${query}`).then((res) => res.json())).sort(
    (a: any, b: any) => a.distance - b.distance
  );
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case 'GET':
      let { q } = req.query;

      if (q === '' || q.length < 2) return res.status(200).json([]);

      const location: any = await searchLocation(q);

      res.status(200).json(location);

      break;
    default:
      res.status(403).json({ error: 'syntax error' });
      break;
  }
}
