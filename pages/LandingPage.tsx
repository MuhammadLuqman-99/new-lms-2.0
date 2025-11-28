import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { motion } from 'framer-motion';
import { Bot, Zap, Shield, ArrowRight, Check } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Bot className="h-6 w-6 text-primary" /> Nebula AI
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-slate-500 bg-clip-text text-transparent">
            Intelligence, <br /> simplified.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the next generation of AI chat. Powered by Gemini 3 Pro, capable of reasoning, coding, and creative writing at lightning speeds.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="h-12 px-8 text-lg">Start Free Trial <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
            <Link to="/login">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg">Live Demo</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Powered by Gemini 2.5 Flash for instant responses." },
            { icon: Bot, title: "Advanced Reasoning", desc: "Complex problem solving with Gemini 3 Pro." },
            { icon: Shield, title: "Secure & Private", desc: "Enterprise-grade encryption for your data." }
          ].map((f, i) => (
            <motion.div 
                key={i} 
                className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
            >
              <f.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Free", price: "$0", features: ["Gemini 2.5 Flash", "10 Daily Queries", "Community Support"] },
            { name: "Pro", price: "$19", features: ["Gemini 3 Pro", "Unlimited Queries", "Priority Support", "Image Generation"], popular: true },
            { name: "Enterprise", price: "Custom", features: ["Custom Models", "SSO", "Dedicated Account Manager", "SLA"] }
          ].map((p, i) => (
            <div key={i} className={`p-8 rounded-xl border ${p.popular ? 'border-primary ring-2 ring-primary/20 relative' : 'bg-card'}`}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">Most Popular</span>}
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <div className="text-4xl font-bold mb-6">{p.price}<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> {f}</li>
                ))}
              </ul>
              <Button className="w-full" variant={p.popular ? 'default' : 'outline'}>Choose Plan</Button>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 border-t text-center text-muted-foreground">
        © 2024 Nebula AI. All rights reserved.
      </footer>
    </div>
  );
};
