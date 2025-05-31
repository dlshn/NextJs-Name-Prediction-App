// File: app/prediction/[name]/page.tsx

const getPredictedAge = async (name: string) => {
  const response = await fetch(`https://api.agify.io?name=${name}`);
  if (!response.ok) throw new Error('Failed to fetch age');
  return response.json();
};

const getPredictedGender = async (name: string) => {
  const response = await fetch(`https://api.genderize.io?name=${name}`);
  if (!response.ok) throw new Error('Failed to fetch gender');
  return response.json();
};

const getPredictedCountry = async (name: string) => {
  const response = await fetch(`https://api.nationalize.io?name=${name}`);
  if (!response.ok) throw new Error('Failed to fetch country');
  return response.json();
};

interface Params {
  params: { name: string };
}

import Link from 'next/link';

export default async function Page({ params }: Params) {
  const [age, gender, country] = await Promise.all([
    getPredictedAge(params.name),
    getPredictedGender(params.name),
    getPredictedCountry(params.name),
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Hi <span className="capitalize text-black font-bold">{params.name}</span>, here’s your prediction:
        </h1>

        <div className="space-y-4 text-lg">
          <div className='text-black'>
            <span className="font-semibold ">Predicted Age:</span> {age?.age ?? 'N/A'}
          </div>
          <div className='text-black'>
            <span className="font-semibold ">Predicted Gender:</span> {gender?.gender ?? 'N/A'}
          </div>
          <div className='text-black'>
            <span className="font-semibold">Most Likely Country:</span>{' '}
            {country?.country?.[0]?.country_id ?? 'N/A'}
          </div>
          <Link href="/" className="mt-6 inline-block text-blue-600 hover:underline">
            Try another name →
          </Link>
        </div>
      </div>
    </div>
  );
}
