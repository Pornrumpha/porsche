import Link from 'next/link';
import { getPorscheCars } from '@/lib/wordpress';

function getImageUrl(content: string) {
  const match = content?.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function getSubTitle(car: any) {
  if (!car.content) return car.title;
  const textOnly = car.content.replace(/<[^>]+>/g, '').trim();
  const firstLine = textOnly.split('\n')[0]?.trim();
  return firstLine && firstLine.length > 0 ? firstLine : car.title;
}

function getPrice(car: any) {
  if (!car.content) return ' THB 6,500,000*';
  const priceMatch = car.content.match(/(?:THB|฿|\bTHB\b)?\s*([0-9]{1,2}(?:,[0-9]{3})+|[0-9]{7,8})\s*(?:THB)?/i);
  if (priceMatch && priceMatch[1]) {
    return ` THB ${priceMatch[1]}`;
  }
  return 'THB 6,500,000*';
}

export default async function SeriesVariantsPage({
  params,
}: {
  params: Promise<{ series: string }>;
}) {
  const { series } = await params;
  const allCars = await getPorscheCars();
  const searchKey = series.toLowerCase().trim();

  const variantCars = allCars.filter((car: any) => {
    const titleMatch = car.title?.toLowerCase().includes(searchKey);
    const contentMatch = car.content?.toLowerCase().includes(searchKey);
    const slugMatch = car.slug?.toLowerCase().includes(searchKey);
    return titleMatch || contentMatch || slugMatch;
  });

  return (
    <main className="min-h-screen bg-black text-white p-8 font-[var(--font-montserrat)] select-none">
      
      <div className="max-w-6xl mx-auto mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs uppercase tracking-[0.2em]"
        >
          ← BACK TO ALL MODELS
        </Link>
      </div>

      <div className="text-center mb-12 flex flex-col items-center">
        <img 
          src="http://porsche.local/wp-content/uploads/2026/10/porsche-logo-png_seeklogo-168544-3.png" 
          alt="Porsche Logo" 
          className="h-12 w-auto mb-4 object-contain"
        />
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-2">PORSCHE</p>
        <h1 className="font-[var(--font-cinzel)] text-4xl font-bold tracking-[0.3em] text-white uppercase">
          {series.toUpperCase()} VARIANTS
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {variantCars.map((car: any) => {
          const imgUrl = getImageUrl(car.content);
          const subTitle = getSubTitle(car);
          const price = getPrice(car);

          return (
            <div 
              key={car.id} 
              className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl shadow-2xl backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="h-48 bg-neutral-950/80 rounded-xl mb-6 flex items-center justify-center overflow-hidden p-2">
                  {imgUrl ? (
                    <img 
                      src={imgUrl} 
                      alt={car.title} 
                      className="w-full h-full object-contain" 
                    />
                  ) : (
                    <span className="text-neutral-500 text-xs tracking-widest uppercase">No Image</span>
                  )}
                </div>

                <div className="text-center mb-4">
                  <p className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-1">
                    {car.title}
                  </p>
                  <h2 className="font-[var(--font-cinzel)] text-xl font-bold text-white tracking-wider mb-2">
                    {subTitle}
                  </h2>
                </div>
              </div>

              <div className="text-center pt-3 border-t border-neutral-800/80 mt-2">
                <p className="text-xs text-neutral-400 font-medium tracking-wider">
                  {price}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}