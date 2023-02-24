import Image from "next/image";

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
  );
  const response = await data.json();
  return response.results.map((movie) => ({
    movie: toString(movie.id),
  }));
}

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
  );

  const response = await data.json();

  return (
    <div>
      <div>
        <h2 className="text-2xl">{response.title}</h2>
        <h2 className="text-lg">{response.release_date}</h2>
        <h2>Runtime: {response.runtime} minutes</h2>
        <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded-md">
          {response.status}
        </h2>
        <Image
          className="my-12 w-full"
          src={imagePath + response.backdrop_path}
          width={1000}
          height={1000}
          priority
        />

        <p>{response.overview}</p>
      </div>
    </div>
  );
}
