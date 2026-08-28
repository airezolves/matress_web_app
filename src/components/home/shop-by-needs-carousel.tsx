"use client";

import CardFanCarousel, { type CardItem } from "@/components/ui/card-fan-carousel";

const needs: CardItem[] = [
  {
    imgUrl: "/images/home_page/needs/back_support.png",
    title: "Orthopaedic Support",
    description: "Mattresses designed for back support and spinal alignment.",
    linkUrl: "/products?usecase=orthopedic"
  },
  {
    imgUrl: "/images/home_page/needs/cooling_comfort.png",
    title: "Cooling Sleep",
    description: "Breathable choices for a cooler, fresher sleep surface.",
    linkUrl: "/products?usecase=cooling"
  },
  {
    imgUrl: "/images/home_page/needs/no_partner_disturbance.png",
    title: "Couple-Friendly",
    description: "Reduced partner movement for more peaceful shared sleep.",
    linkUrl: "/products?usecase=couples"
  },
  {
    imgUrl: "/images/products/foam/copper-cool-pro/image_1.png",
    title: "Pressure Relief",
    description: "Adaptive comfort that helps ease common pressure points.",
    linkUrl: "/products?usecase=pressure+relief"
  },
  {
    imgUrl: "/images/home_page/needs/natural_collection.png",
    title: "Natural Sleep",
    description: "Latex and coir-led options made with natural materials.",
    linkUrl: "/products?usecase=natural"
  },
  {
    imgUrl: "/images/home_page/needs/sleep_accessories.png",
    title: "Pillows & Neck Support",
    description: "Supportive pillows for comfortable head and neck alignment.",
    linkUrl: "/products?usecase=pillow"
  },
  {
    imgUrl: "/images/products/sofa/soho-3-seater-sofa-bed/image_1.png",
    title: "Sofa Beds",
    description: "Flexible seating that creates extra space for guests.",
    linkUrl: "/products?usecase=sofa+bed"
  },
  {
    imgUrl: "/images/products/sofa/sunny-corner-sofa/image_1.png",
    title: "Living Room Seating",
    description: "Sofas for everyday comfort, lounging and family time.",
    linkUrl: "/products?usecase=sofa"
  }
];

export function ShopByNeedsCarousel() {
  return (
    <section className="overflow-hidden px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-1 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Shop by need</p>
          <h2 className="mt-2 font-heading text-4xl text-secondary md:text-5xl">What are you looking for?</h2>
        </div>
        <CardFanCarousel cards={needs} />
      </div>
    </section>
  );
}
