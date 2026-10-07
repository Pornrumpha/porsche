import Link from 'next/link';
import { getPorscheCars } from '@/lib/wordpress';
import BackgroundVideo from '@/components/BackgroundVideo';

function getImageUrl(content: string) {
  const match = content?.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

const SERIES_LIST = ['911', '718', 'TAYCAN', 'PANAMERA', 'MACAN', 'CAYENNE'];

export default async function HomePage() {
  const cars = await getPorscheCars();

  const seriesData = SERIES_LIST.map((seriesName) => {
    const representativeCar = cars.find((car: any) =>
      car.title.toUpperCase().includes(seriesName) ||
      car.content.toUpperCase().includes(seriesName)
    );

    return {
      name: seriesName,
      image: representativeCar ? getImageUrl(representativeCar.content) : null,
      hasData: !!representativeCar,
    };
  }).filter((item) => item.hasData);

  return (
    <main className="relative min-h-screen text-white p-6 md:p-12 select-none font-[var(--font-montserrat)] overflow-hidden">
      
      <BackgroundVideo />

      <div className="fixed inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/95 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        <header className="text-center my-8 md:my-12 flex flex-col items-center">
          <img 
            src="http://porsche.local/wp-content/uploads/2026/10/porsche-logo-png_seeklogo-168544-3.png" 
            alt="Porsche Logo" 
            className="h-10 md:h-14 w-auto mb-3 object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)]"
          />
          <h1 className="font-[var(--font-cinzel)] text-3xl md:text-5xl font-extrabold tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 uppercase drop-shadow-md">
            MODELS
          </h1>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-neutral-500 to-transparent mt-4" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12">
          {seriesData.map((series: any) => (
            <Link 
              key={series.name} 
              href={`/models/${series.name.toLowerCase()}`}
              className="block group"
            >
              <div className="relative bg-neutral-950/40 border border-white/10 hover:border-white/30 p-6 rounded-2xl backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(255,255,255,0.1)] overflow-hidden cursor-pointer">
                
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative h-44 md:h-52 bg-gradient-to-b from-neutral-900/40 to-neutral-950/80 rounded-xl mb-6 flex items-center justify-center overflow-hidden p-4 border border-white/5">
                  
                  <div className="absolute w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 group-hover:scale-150 transition-all duration-700" />

                  {series.image ? (
                    <img 
                      src={series.image} 
                      alt={series.name} 
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-700 ease-out" 
                    />
                  ) : (
                    <span className="text-neutral-500 text-xs tracking-widest uppercase">No Image</span>
                  )}
                </div>

                <div className="flex items-center justify-between px-2">
                  <h2 className="font-[var(--font-cinzel)] text-xl md:text-2xl font-bold tracking-[0.2em] text-white group-hover:text-neutral-200 transition-colors">
                    {series.name}
                  </h2>
                  <span className="text-xs text-neutral-400 tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    EXPLORE &rarr;
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>

    </main>
  );
}