"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  features: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, category, features }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-brand-light rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-muted"
    >
      <div className="relative h-[400px] w-full bg-brand-muted/30 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-accent text-brand-light text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
            {category}
          </span>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-brand-light/80 rounded-full text-brand-dark hover:bg-brand-accent hover:text-brand-light transition-colors backdrop-blur-sm">
          <Heart size={18} />
        </button>
      </div>

      <div className="p-8 text-left">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-serif text-brand-dark mb-1">{name}</h3>
            <p className="text-brand-accent font-semibold">{price}</p>
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-brand-accent text-xs">★</span>
            ))}
          </div>
        </div>

        <ul className="space-y-2 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-brand-dark/60">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full mr-3"></span>
              {feature}
            </li>
          ))}
        </ul>

        <button className="w-full border border-brand-dark text-brand-dark py-4 rounded-xl flex items-center justify-center space-x-3 hover:bg-brand-dark hover:text-brand-light transition-all">
          <span className="uppercase tracking-widest text-[10px] font-semibold">Discover More</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
