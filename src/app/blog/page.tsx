'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

const posts = [
  {
    slug: 'the-86-billion-neuron-standard',
    title: 'The 86 Billion Neuron Standard: What the Human Brain Teaches Us About Building Enterprise AI',
    excerpt:
      'Your brain runs on 20 watts and outperforms every GPU cluster ever built. The lesson for enterprise AI is not about raw power — it's about specificity, context, and intelligence that knows who it serves.',
    category: 'AI Strategy',
    date: 'June 27, 2025',
    readTime: '6 min read',
    image: '/blog_hero_enterprise_ai.png',
    featured: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="max-w-2xl"
          >
            <motion.span variants={fadeUp} className="inline-block text-xs font-normal uppercase tracking-widest text-[#29B6F6] mb-4">
              Insights &amp; Perspectives
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-6xl font-bold text-[#0E202E] leading-[1.06] mb-5">
              The 86b.ai<br />
              <span className="text-zinc-400 font-normal italic">Blog</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-zinc-500 text-lg leading-relaxed">
              Thinking on enterprise AI — strategy, architecture, and the practical realities of building systems that actually work in production.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">

          {/* Featured post */}
          {posts.filter(p => p.featured).map(post => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-zinc-200 bg-white hover:shadow-lg transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative h-72 md:h-auto overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
                    {/* Featured badge */}
                    <div className="absolute top-5 left-5">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#29B6F6] text-white text-[10px] font-semibold uppercase tracking-wider">
                        Latest Post
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between p-10 md:p-12">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#29B6F6]">
                        {post.category}
                      </span>
                      <h2 className="mt-3 text-2xl md:text-3xl font-bold text-[#0E202E] leading-tight group-hover:text-[#1F3249] transition-colors">
                        {post.title}
                      </h2>
                      <p className="mt-4 text-zinc-500 text-base leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-zinc-400 text-xs">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#29B6F6] group-hover:gap-3 transition-all duration-200">
                        Read article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Coming soon placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 p-8 rounded-2xl border border-dashed border-zinc-300 bg-white/50 text-center"
          >
            <p className="text-zinc-400 text-sm">More articles coming soon. Follow our thinking as we publish.</p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0E202E] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want these insights in your inbox?
          </h2>
          <p className="text-white/60 mb-8 text-base font-light">
            We write when we have something worth saying. No noise.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#29B6F6] text-white font-normal hover:bg-[#039BE5] transition-colors"
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
