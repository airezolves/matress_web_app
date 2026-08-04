import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/animation/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Category } from "@/types/category";

export function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <Link href={`/products?subcategory=${encodeURIComponent(category.name)}`}>
        <Card className="group overflow-hidden border-border/70 bg-white/90 transition hover:-translate-y-1 hover:shadow-glow">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-heading text-2xl text-secondary">{category.name}</h3>
              <ArrowUpRight className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{category.description}</p>
            <Badge variant="secondary">{category.productCount} products</Badge>
          </div>
        </Card>
      </Link>
    </Reveal>
  );
}
