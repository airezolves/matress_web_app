import Image from "next/image";

type SizeCard = {
  title: string;
  dimensions: string;
  image: string;
};

const sizes: SizeCard[] = [
  {
    title: "Single Bed Mattress",
    dimensions: "L x W: 72 inch x 30 inch",
    image: "/images/home_page/sizes/single_size.png"
  },
  {
    title: "Double Bed Mattress",
    dimensions: "L x W: 72 inch x 48 inch",
    image: "/images/home_page/sizes/double_size.png"
  },
  {
    title: "Queen Size Mattress",
    dimensions: "L x W: 72 inch x 60 inch",
    image: "/images/home_page/sizes/queen_size.png"
  },
  {
    title: "King Size Mattress",
    dimensions: "L x W: 72 inch x 72 inch",
    image: "/images/home_page/sizes/king_size.png"
  },
  {
    title: "Custom Size Mattress",
    dimensions: "L x W: X inch x X inch",
    image: "/images/home_page/sizes/custom_size.png"
  }
];

export function ShopBySizeRow() {
  return (
    <section className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-5xl leading-tight text-secondary md:text-6xl">
          Perfect Fit, Perfect Sleep,
          <br />
          Sizes built for every sleeper
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {sizes.map((item) => (
            <article key={item.title} className="px-1">
              <Image
                src={item.image}
                alt={item.title}
                width={240}
                height={240}
                className="h-56 w-full object-contain"
              />
              <h3 className="mt-3 text-center text-2xl font-semibold leading-tight text-secondary">{item.title}</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">({item.dimensions})</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
