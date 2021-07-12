import { baseUrl } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const searchLocation = async (latt: any, long: any) => {
  return (
    await fetch(`${baseUrl}search?lattlong=${latt},${long}`).then((res) => res.json())
  ).sort((a: any, b: any) => a.distance - b.distance);
};

const getWeather = async (woeid: string) => {
  return await fetch(`${baseUrl}${woeid}`).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case 'GET':
      let { latt, long } = req.query;

      if (latt === '') latt = '51.506321';
      if (long === '') long = '-0.12714';

      const location: any = (await searchLocation(latt, long))[0];

      const weather = await getWeather(location.woeid);

      res.status(200).json(weather);
      break;
    default:
      res.status(403).json({ error: 'syntax error' });
      break;
  }
}
