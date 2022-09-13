import { request } from 'undici';
import { promises as fs } from 'fs';

const POKEMON_API = 'https://pokeapi.co/api/v2';

export type PokemonData = {
  pokemon: {
    name: string;
    url: string;
  };
};

const main = async (): Promise<void> => {
  const type = process.argv[2];
  if (!type) throw new Error('No target provided!');

  const { body, statusCode } = await request(`${POKEMON_API}/type/${type}`);

  if (statusCode < 200 || 299 < statusCode) throw new Error(await body.text());

  const data: { pokemon: PokemonData[] } = await body.json();
  await fs.writeFile(`pokemon_${type}.json`, JSON.stringify(data, null, 2));

  // TODO: count pokemon of dragon type
  // TODO: count pokemon of that type from 3rd Gen
  // TODO: print them to the console in numerical order
  // TODO: how many can learn 'incinerate'?
  // TODO: how many can learn 'hyper-beam'?
  // TODO: how many can learn both?
};

main()
  .then(() => console.log('Done!'))
  .catch(console.error);
