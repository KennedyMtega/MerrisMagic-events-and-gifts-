import React from 'react';
import { Gift, Video, Sparkles, Heart } from "lucide-react";
import { motion } from 'framer-motion';

const giftOptions = [
  {
    title: "AI Video Messages",
    description: "Create heartfelt video messages enhanced with AI magic",
    icon: <Video className="w-8 h-8" />,
    price: "Starting at $10",
    color: "bg-pink-100"
  },
  {
    title: "Digital Magic Cards",
    description: "Send interactive cards that come alive with animations",
    icon: <Sparkles className="w-8 h-8" />,
    price: "From $5",
    color: "bg-purple-100"
  },
  {
    title: "Virtual Charms",
    description: "Share meaningful digital tokens that last forever",
    icon: <Heart className="w-8 h-8" />,
    price: "From $3",
    color: "bg-yellow-100"
  },
  {
    title: "Gift Vouchers",
    description: "Send digital gift cards with personal messages",
    icon: <Gift className="w-8 h-8" />,
    price: "Any amount",
    color: "bg-blue-100"
  }
];

export const GiftingOptionsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gift mb-4">
            Choose Your Magic
          </h2>
          <p className="text-xl text-gray-600">
            Select from our curated collection of digital gifts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {giftOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${option.color} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-white rounded-full">
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
                <span className="text-gift font-semibold">{option.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};