import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Image as ImageIcon, 
  Quote, 
  Sparkles, 
  X, 
  ArrowRight,
  ExternalLink,
  Star,
  CheckCircle2,
  Users,
  Zap,
  Award
} from 'lucide-react';
import { testimonials, Testimonial } from './data/testimonials';

const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="glass p-6 rounded-2xl flex flex-col items-center text-center">
    <div className="w-12 h-12 bg-luxury-accent/10 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-luxury-accent" />
    </div>
    <div className="text-2xl font-serif mb-1">{value}</div>
    <div className="text-xs text-white/40 uppercase tracking-widest">{label}</div>
  </div>
);

const Avatar = ({ src, name, size = "md" }: { src: string, name: string, size?: "sm" | "md" | "lg" | "xl" }) => {
  const [error, setError] = useState(false);
  
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border border-white/20 bg-white/5 flex items-center justify-center`}>
      {!error && src ? (
        <img 
          src={src} 
          alt={name} 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-luxury-accent/10 text-luxury-accent font-bold text-xs">
          {name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-luxury-bg text-white selection:bg-luxury-accent selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-luxury-accent rounded-lg flex items-center justify-center font-bold text-black">O</div>
          <span className="font-serif text-xl tracking-tight">ODeX Wall of Love</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#testimonials" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Testimonials</a>
          <a href="#highlights" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Program Highlights</a>
          <a href="https://www.exoorg.com/ODeX" target="_blank" rel="noreferrer" className="px-5 py-2 bg-luxury-accent/10 text-luxury-accent rounded-full text-xs font-bold border border-luxury-accent/20 hover:bg-luxury-accent hover:text-black transition-all">
            ODeX
          </a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-bg/50 to-luxury-bg" />
          </div>
          
          <motion.div 
            style={{ opacity, scale }}
            className="relative z-10 text-center max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-luxury-accent/20"
            >
              <Zap className="w-4 h-4 text-luxury-accent" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-luxury-accent">Transformative ODeX Journey</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-serif font-light mb-8 tracking-tighter leading-[0.9]"
            >
              Voices of <br />
              <span className="italic text-luxury-accent">Transformation.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/60 max-w-2xl mx-auto text-xl font-light leading-relaxed mb-12"
            >
              Real stories from leaders who pushed boundaries, challenged assumptions, 
              and redefined their purpose through the ODeX program.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="https://www.exoorg.com/ODeX" target="_blank" rel="noreferrer" className="px-8 py-4 bg-luxury-accent text-black font-bold rounded-full hover:bg-white transition-all">
                Know More
              </a>
              <a href="#featured" className="px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/10">
                Featured Story
              </a>
              <a href="#testimonials" className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all">
                Wall of Love
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40"
          >
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
          </motion.div>
        </section>

        {/* Featured Testimonial Section (Revolving) */}
        <section id="featured" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="glass rounded-[3rem] p-8 md:p-20 relative overflow-hidden min-h-[600px] flex items-center">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-luxury-accent/5 blur-[120px] -z-10" />
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={featuredIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="grid lg:grid-cols-2 gap-16 items-center w-full"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-luxury-accent mb-8">
                    <Star className="w-5 h-5 fill-luxury-accent" />
                    <span className="text-xs font-bold uppercase tracking-widest">Featured Transformation</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                    "{testimonials[featuredIndex].text.substring(0, 80)}<span className="italic text-luxury-accent">...</span>"
                  </h2>
                  <p className="text-xl text-white/60 font-light leading-relaxed mb-12 italic">
                    "{testimonials[featuredIndex].text.substring(0, 250)}..."
                  </p>
                  <div className="flex items-center gap-6">
                    <Avatar src={testimonials[featuredIndex].image} name={testimonials[featuredIndex].name} size="lg" />
                    <div>
                      <h4 className="text-xl font-serif">{testimonials[featuredIndex].name}</h4>
                      <p className="text-xs text-white/40 uppercase tracking-widest">{testimonials[featuredIndex].role}</p>
                      <p className="text-[10px] text-luxury-accent uppercase tracking-widest">{testimonials[featuredIndex].company}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTestimonial(testimonials[featuredIndex])}
                    className="mt-12 group flex items-center gap-3 text-luxury-accent font-bold uppercase tracking-widest text-xs hover:gap-5 transition-all"
                  >
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden glass p-3">
                    <img 
                      src={testimonials[featuredIndex].image} 
                      className="w-full h-full object-cover rounded-[1.5rem] grayscale hover:grayscale-0 transition-all duration-700"
                      alt="Featured"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl animate-float hidden md:block">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-luxury-accent rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Strategic Thinking</span>
                    </div>
                    <p className="text-xs text-white/60">"Pushing boundaries and challenging assumptions."</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeaturedIndex(i)}
                  className={`h-1 transition-all duration-500 rounded-full ${i === featuredIndex ? 'w-12 bg-luxury-accent' : 'w-4 bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard icon={Users} label="Leaders Trained" value="500+" />
          <StatCard icon={Award} label="Success Rate" value="98%" />
          <StatCard icon={Zap} label="Industries" value="25+" />
          <StatCard icon={Star} label="Avg. Rating" value="4.9/5" />
        </section>

        {/* Wall of Love */}
        <section id="testimonials" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Wall of Love</h2>
            <p className="text-white/40 max-w-xl mx-auto">Hear directly from the senior professionals and business leaders who have experienced the ODeX transformation.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedTestimonial(t)}
                className="luxury-card glass p-8 cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Avatar src={t.image} name={t.name} />
                  <div>
                    <h3 className="font-serif text-lg leading-tight">{t.name}</h3>
                    <p className="text-[10px] text-luxury-accent uppercase tracking-widest mt-1">{t.company}</p>
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/5" />
                  <p className="text-white/80 font-light leading-relaxed italic relative z-10">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">{t.role}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-luxury-accent fill-luxury-accent" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The Destination Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">The <span className="text-luxury-accent italic">Destination</span></h2>
            <p className="text-white/40 max-w-xl mx-auto">What is an Extraordinary Organization? It goes far beyond hitting quarterly numbers. It's a new vision for what your organization can become.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div whileHover={{ scale: 1.05 }} className="text-center p-8 glass rounded-3xl border border-white/5">
              <div className="w-20 h-20 bg-luxury-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-luxury-accent/20">
                <Zap className="w-10 h-10 text-luxury-accent" />
              </div>
              <h4 className="text-2xl font-serif mb-4">Future Ready</h4>
              <p className="text-white/40 leading-relaxed">Nimble, adaptive, and built to pivot, ready for whatever curveballs the world throws at it.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="text-center p-8 glass rounded-3xl border border-white/5">
              <div className="w-20 h-20 bg-luxury-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-luxury-accent/20">
                <Users className="w-10 h-10 text-luxury-accent" />
              </div>
              <h4 className="text-2xl font-serif mb-4">People-Centric</h4>
              <p className="text-white/40 leading-relaxed">A place where people bring their whole selves to work: their Head (intellect), Heart (passion), and Soul (deep commitment).</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="text-center p-8 glass rounded-3xl border border-white/5">
              <div className="w-20 h-20 bg-luxury-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-luxury-accent/20">
                <Sparkles className="w-10 h-10 text-luxury-accent" />
              </div>
              <h4 className="text-2xl font-serif mb-4">Purpose-Driven</h4>
              <p className="text-white/40 leading-relaxed">It's not just about profit. It's about making a real, positive difference in the world and leaving a lasting mark.</p>
            </motion.div>
          </div>
        </section>

        {/* Program Highlights - The 5 Pillars Roadmap */}
        <section id="highlights" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">The ODeX <span className="text-luxury-accent italic">Roadmap</span></h2>
            <p className="text-white/40 max-w-xl mx-auto">A complete, integrated system designed to build greatness from the ground up, weaving leadership, culture, strategy, and talent into one actionable plan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[900px]">
            {/* Main Highlight: Leadership & Culture (Pillars 1 & 2) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 md:row-span-2 glass rounded-[2.5rem] p-12 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-luxury-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div>
                <div className="w-12 h-12 bg-luxury-accent/20 rounded-2xl flex items-center justify-center mb-8">
                  <Users className="w-6 h-6 text-luxury-accent" />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Transforming Leadership <br />& Organizational Culture</h3>
                <p className="text-xl text-white/60 font-light leading-relaxed max-w-xl">
                  Develop collective leadership where everyone takes initiative, collaborates, and co-creates the future. Break down silos and shift to an outside-in, customer-focused view across the entire organization.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-xs uppercase tracking-widest font-bold">Collective Leadership</div>
                <div className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-xs uppercase tracking-widest font-bold">Outside-In Perspective</div>
              </div>
            </motion.div>

            {/* Pillar 3: Strategic Breakthroughs */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-luxury-accent/20 transition-colors">
                <Zap className="w-8 h-8 text-luxury-accent" />
              </div>
              <h4 className="text-2xl font-serif mb-4">Strategic Breakthroughs</h4>
              <p className="text-sm text-white/40 leading-relaxed">Become truly unique and compelling in the eyes of your target customers.</p>
            </motion.div>

            {/* Pillar 4: Exceptional Execution */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-luxury-accent/20 transition-colors">
                <Award className="w-8 h-8 text-luxury-accent" />
              </div>
              <h4 className="text-2xl font-serif mb-4">Exceptional Execution</h4>
              <p className="text-sm text-white/40 leading-relaxed">Get everyone in the company aligned and playing the same game in a synchronized way.</p>
            </motion.div>

            {/* Pillar 5: Talent Management */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-3 glass rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 group"
            >
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-luxury-accent/10 rounded-3xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-10 h-10 text-luxury-accent" />
                </div>
                <div>
                  <h4 className="text-2xl font-serif mb-2">Master Talent Management</h4>
                  <p className="text-white/40 max-w-md">Learn the fundamentals of attracting, training, and managing the right people to fuel the entire system.</p>
                </div>
              </div>
              <a 
                href="https://www.exoorg.com/ODeX" 
                target="_blank" 
                rel="noreferrer" 
                className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-luxury-accent transition-all shrink-0"
              >
                Know More
              </a>
            </motion.div>
          </div>
        </section>

        {/* Elite Experience Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">An <span className="text-luxury-accent italic">Elite</span> Experience</h2>
            <p className="text-white/40 max-w-xl mx-auto">Not another training seminar. This is an elite development experience crafted for leaders committed to transformative results.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div whileHover={{ y: -10 }} className="text-center p-8 glass rounded-3xl border border-white/5">
              <div className="w-20 h-20 bg-luxury-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-luxury-accent/20">
                <Zap className="w-10 h-10 text-luxury-accent" />
              </div>
              <h4 className="text-2xl font-serif mb-4">Hands-on Practical Application</h4>
              <p className="text-white/40 leading-relaxed">Go beyond theory. Apply your learning directly to your biggest business challenges inside your own organization with full support.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="text-center p-8 glass rounded-3xl border border-white/5">
              <div className="w-20 h-20 bg-luxury-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-luxury-accent/20">
                <Award className="w-10 h-10 text-luxury-accent" />
              </div>
              <h4 className="text-2xl font-serif mb-4">World-Class Content</h4>
              <p className="text-white/40 leading-relaxed">Learn a curated suite of proven management technologies from faculty with decades of real-world experience transforming businesses.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="text-center p-8 glass rounded-3xl border border-white/5">
              <div className="w-20 h-20 bg-luxury-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-luxury-accent/20">
                <Sparkles className="w-10 h-10 text-luxury-accent" />
              </div>
              <h4 className="text-2xl font-serif mb-4">Generate Measurable Impact</h4>
              <p className="text-white/40 leading-relaxed">The entire program is laser-focused on one thing: generating tangible, measurable outcomes that you can see in real-time.</p>
            </motion.div>
          </div>
        </section>

        {/* The ODeX Journey Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">The ODeX <span className="text-luxury-accent italic">Journey</span></h2>
            <p className="text-white/40 max-w-xl mx-auto">Real transformation doesn't happen in a weekend. It takes sustained effort to build new habits and systems that stick.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass p-8 rounded-3xl border border-white/5">
              <div className="text-luxury-accent text-4xl font-serif mb-4">06</div>
              <h4 className="text-xl font-serif mb-2">Deep Learning Weekends</h4>
              <p className="text-sm text-white/40">One intensive weekend per month to create a new dimension of understanding in OD and Leadership.</p>
            </div>
            <div className="glass p-8 rounded-3xl border border-white/5">
              <div className="text-luxury-accent text-4xl font-serif mb-4">18</div>
              <h4 className="text-xl font-serif mb-2">Group Coaching Sessions</h4>
              <p className="text-sm text-white/40">Weekly 2-hour sessions to deepen learnings and get implementation support for your specific challenges.</p>
            </div>
            <div className="glass p-8 rounded-3xl border border-white/5">
              <div className="text-luxury-accent text-4xl font-serif mb-4">Peer</div>
              <h4 className="text-xl font-serif mb-2">Dedicated Teams</h4>
              <p className="text-sm text-white/40">Part of a dedicated team of 4-5 participants, providing support, accountability, and holistic development.</p>
            </div>
            <div className="glass p-8 rounded-3xl border border-white/5">
              <div className="text-luxury-accent text-4xl font-serif mb-4">Live</div>
              <h4 className="text-xl font-serif mb-2">Project Implementation</h4>
              <p className="text-sm text-white/40">Get live support for starting and implementing a transformational project right inside your own organization.</p>
            </div>
          </div>
        </section>

        {/* Meet Your Faculty Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="aspect-square rounded-[2rem] overflow-hidden glass p-2">
                <img 
                  src="https://i.ibb.co/jPR18mYW/manoj.jpg" 
                  className="w-full h-full object-cover rounded-[1.5rem] grayscale hover:grayscale-0 transition-all duration-700"
                  alt="Manoj Onkar"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-24 -left-8 lg:-left-32 glass p-6 rounded-3xl border border-white/10 max-w-[260px] z-20">
                <p className="text-sm font-serif italic mb-4">"His teaching style is dynamic, energetic, and highly motivational, making even complex subjects easy to grasp and apply."</p>
                <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-bold">Workshop Participant</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-serif mb-8">Meet Your <span className="text-luxury-accent italic">Faculty</span></h2>
              <h3 className="text-2xl font-serif mb-6">Manoj Onkar</h3>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-luxury-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-luxury-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">3 Decades of Experience</h4>
                    <p className="text-white/40 text-sm">Deep expertise in individual and organizational transformation across diverse sectors.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-luxury-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-luxury-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">50,000+ People Trained</h4>
                    <p className="text-white/40 text-sm">Empowered over 50,000 individuals and 200+ trainers, coaches, and consultants worldwide.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-luxury-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-luxury-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Global Impact</h4>
                    <p className="text-white/40 text-sm">Participants from 10+ countries and 30+ industries have benefited from his unique teaching style.</p>
                  </div>
                </div>
              </div>
              <a 
                href="https://www.exoorg.com/ODeX" 
                target="_blank" 
                rel="noreferrer" 
                className="mt-12 inline-block px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-luxury-accent transition-all"
              >
                Learn More About Manoj
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass mb-12 border border-luxury-accent/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            <Sparkles className="w-4 h-4 text-luxury-accent" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-luxury-accent">Next Cohort: April 2026 — Sept 2026</span>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-serif mb-8 tracking-tight">Ready to transform?</h2>
          <p className="text-white/40 mb-16 max-w-2xl mx-auto text-xl font-light leading-relaxed">
            Join an elite group of founders and CEOs in this 6-month immersive journey to build an extraordinary organization.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://www.exoorg.com/ODeX" 
              target="_blank" 
              rel="noreferrer" 
              className="px-12 py-6 bg-white text-black font-bold rounded-full text-xl hover:bg-luxury-accent transition-all hover:scale-105 shadow-2xl"
            >
              Join the Next OD Batch
            </a>
            <a 
              href="https://www.exoorg.com/ODeX" 
              target="_blank" 
              rel="noreferrer" 
              className="px-12 py-6 glass text-white font-bold rounded-full text-xl hover:bg-white/10 transition-all hover:scale-105 border border-white/10"
            >
              Know More
            </a>
          </div>
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Program Investment</p>
            <div className="flex gap-8 items-center">
              <span className="text-2xl font-serif text-white/60">INR 3L <span className="text-xs font-sans">+ tax</span></span>
              <div className="w-px h-8 bg-white/10" />
              <span className="text-2xl font-serif text-white/60">USD 3.5K</span>
            </div>
          </div>
        </section>
      </main>

      {/* Modal / Detail View */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-4xl glass rounded-[2rem] overflow-hidden flex flex-col h-auto max-h-[90vh]"
            >
              <div className="p-12 overflow-y-auto custom-scrollbar">
                <button 
                  onClick={() => setSelectedTestimonial(null)}
                  className="mb-8 p-3 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-6 mb-12">
                  <Avatar src={selectedTestimonial.image} name={selectedTestimonial.name} size="xl" />
                  <div>
                    <h2 className="text-4xl font-serif leading-tight">{selectedTestimonial.name}</h2>
                    <p className="text-sm text-luxury-accent uppercase tracking-[0.2em] mt-2">{selectedTestimonial.role}</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{selectedTestimonial.company}</p>
                  </div>
                </div>

                <div className="relative mb-12">
                  <Quote className="absolute -top-6 -left-6 w-16 h-16 text-white/5" />
                  <p className="text-2xl font-serif italic leading-relaxed text-white/90 relative z-10 pr-8">
                    "{selectedTestimonial.text}"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-luxury-accent rounded-xl flex items-center justify-center font-bold text-black">O</div>
                <span className="font-serif text-2xl tracking-tight">ODeX Wall of Love</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed">
                Transforming organizational development through deep listening, 
                strategic thinking, and massive transformative purpose.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-luxury-accent font-bold mb-6">Program</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="https://www.exoorg.com/ODeX" target="_blank" rel="noreferrer" className="hover:text-white transition-colors font-bold text-luxury-accent">ODeX Official Page</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Theory U</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Exponential Orgs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Strategic Thinking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Deep Listening</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-luxury-accent font-bold mb-6">Connect</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Billing Info</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs tracking-widest uppercase">© 2026 ODeX. Built with Gemini 2.5 & Veo AI.</p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] text-white/20 hover:text-luxury-accent transition-colors uppercase tracking-widest">Privacy Policy</a>
              <a href="#" className="text-[10px] text-white/20 hover:text-luxury-accent transition-colors uppercase tracking-widest">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
