import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gift">Merris Magic</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gift hover:bg-gift-dark text-white">
              Get Started
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Welcome to Merris Magic</DialogTitle>
              <DialogDescription>
                Join our magical community to start sending heartfelt digital gifts
              </DialogDescription>
            </DialogHeader>
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                style: {
                  button: {
                    background: '#FF69B4',
                    color: 'white',
                  },
                  anchor: {
                    color: '#FF69B4',
                  },
                },
              }}
              providers={[]}
              view="sign_in"
              showLinks={false}
              redirectTo={window.location.origin + '/dashboard'}
            />
          </DialogContent>
        </Dialog>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <section className="py-20 text-center">
          <h2 className="text-6xl font-bold text-gift mb-8">
            Share Joy Around The World 🎁
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Adventures of gifting are only a few taps away
          </p>
          <Button className="bg-gift hover:bg-gift-dark text-white px-8 py-6 rounded-full text-lg">
            Join Us
          </Button>
        </section>

        {/* Trending Gifts Section */}
        <section className="py-16">
          <h2 className="text-4xl font-bold mb-8">
            Trending 📸 Gifts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Video Messages", image: "/placeholder.svg" },
              { title: "Magic Cards", image: "/placeholder.svg" },
              { title: "Digital Charms", image: "/placeholder.svg" },
              { title: "Gift Vouchers", image: "/placeholder.svg" }
            ].map((item, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gift Packages Section */}
        <section className="py-16 bg-white/50 rounded-3xl p-8">
          <h2 className="text-4xl font-bold mb-8">
            Choose your range of expertly crafted gifts
          </h2>
          <p className="text-gray-600 mb-8">
            Browse carefully crafted gift packages tailored for your special moments and celebrations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Birthday Bundle", price: "$29.99", rating: "4.8" },
              { title: "Anniversary Magic", price: "$39.99", rating: "4.9" },
              { title: "Celebration Pack", price: "$49.99", rating: "4.7" }
            ].map((package_, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src="/placeholder.svg" alt={package_.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{package_.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span>Starting at {package_.price}</span>
                    <span>⭐ {package_.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Gift Categories */}
        <section className="py-16">
          <h2 className="text-4xl font-bold mb-8">
            Popular 🎁 Gift Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Digital Love Letters",
                description: "Send heartfelt messages enhanced with AI magic that capture your genuine emotions perfectly."
              },
              {
                title: "Celebration Bundles",
                description: "Curated gift packages that combine multiple digital surprises for maximum joy."
              }
            ].map((category, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg p-6 bg-white">
                <img src="/placeholder.svg" alt={category.title} className="w-full h-64 object-cover rounded-xl mb-4" />
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white/50 rounded-3xl p-8">
          <h2 className="text-4xl font-bold mb-8">
            Real Gift Stories from Real People
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Williams",
                rating: "4.9",
                story: "The digital charm bracelet I created for my sister's birthday was absolutely perfect! The AI suggestions really helped make it special."
              },
              {
                name: "Michael Chen",
                rating: "5.0",
                story: "I was able to send a beautiful anniversary package to my parents. The video message feature with background music was amazing!"
              },
              {
                name: "Emma Thompson",
                rating: "4.8",
                story: "The celebration bundle made my friend's day! The combination of digital cards and custom messages was exactly what I needed."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gift rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="text-gift">⭐ {testimonial.rating}</div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.story}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center bg-gradient-to-br from-gift to-gift-dark text-white rounded-3xl mb-16">
          <h2 className="text-4xl font-bold mb-6">
            GET READY TO SHARE YOUR MAGICAL GIFTS
          </h2>
          <Button className="bg-white text-gift hover:bg-gray-100 px-8 py-6 rounded-full text-lg">
            Start Gifting Now
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Landing;