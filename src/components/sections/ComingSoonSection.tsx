import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Users, Wallet } from 'lucide-react';

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Friend Groups",
    description: "Organize your contacts and send group gifts"
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Smart Wallet",
    description: "Save on gifts with prepaid balance"
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Gift Scheduling",
    description: "Plan your gifts in advance"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Gift Suggestions",
    description: "Get personalized gift recommendations"
  }
];

export const ComingSoonSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gift-light/20 to-accent/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gift mb-4">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600">
            Exciting new features on the horizon
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gift/10 rounded-full text-gift">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};