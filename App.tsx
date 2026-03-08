import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Play, 
  Image as ImageIcon, 
  Quote, 
  Sparkles, 
  Video, 
  X, 
  Upload,
  Loader2,
  ArrowRight,
  ExternalLink,
  Star,
  CheckCircle2,
  Users,
  Zap,
  Award
} from 'lucide-react';
import { testimonials, Testimonial } from './data/testimonials';
import { generateVisual, generateVideo } from './services/ai';

// Extend window for AI Studio API
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

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
  const [generatedVisual, setGeneratedVisual] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleGenerateVisual = async (testimonial: Testimonial) => {
    setIsGenerating(true);
    setGenerationStep('Crafting world-class visual...');
    try {
      const visual = await generateVisual(testimonial.text);
      setGeneratedVisual(visual);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleGenerateVideo = async (testimonial: Testimonial, image?: string) => {
    if (!hasKey) {
      await handleOpenKeySelector();
    }
    setIsGenerating(true);
    setGenerationStep('Initializing cinematic video engine...');
    try {
      const prompt = `A cinematic, professional video representing the growth and transformation described in this testimonial: ${testimonial.text}. High production value, smooth transitions, professional lighting.`;
      const video = await generateVideo(prompt, image);
      setGeneratedVideo(video);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnimateUploadedImage = async () => {
    if (!uploadImage) return;
    if (!hasKey) await handleOpenKeySelector();
    
    setIsGenerating(true);
    setGenerationStep('Animating your image with Veo...');
    try {
      const video = await generateVideo("Animate this professional scene with subtle, cinematic motion. Maintain high quality and professional atmosphere.", uploadImage);
      setGeneratedVideo(video);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

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
          <a href="#highlights" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Highlights</a>
          <a href="#animate" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">Magic Studio</a>
          {!hasKey && (
            <button 
              onClick={handleOpenKeySelector}
              className="px-4 py-2 bg-white/10 rounded-full text-xs font-semibold hover:bg-white/20 transition-all border border-white/10"
            >
              Connect Veo
            </button>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-bg/50 to-luxury-bg" />
            <img 
              src="https://picsum.photos/seed/leadership/1920/1080?blur=10" 
              className="w-full h-full object-cover opacity-20"
              alt="Background"
              referrerPolicy="no-referrer"
            />
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
              <a href="#featured" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-luxury-accent transition-all">
                Featured Story
              </a>
              <a href="#testimonials" className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all">
                Explore Wall of Love
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

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedTestimonial(t)}
                className="break-inside-avoid luxury-card glass p-8 cursor-pointer group"
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

        {/* Program Highlights */}
        <section id="highlights" className="py-32 bg-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-serif mb-8">The ODeX <br /><span className="text-luxury-accent italic">Edge.</span></h2>
                <div className="space-y-6">
                  {[
                    "Deep Listening & Strategic Thinking",
                    "Theory U & Exponential Organizations",
                    "5 Choices Framework of AG Lafley",
                    "Actionable Implementation Roadmaps",
                    "Inclusive Growth & Massive Purpose",
                    "Eco-thinking for Social Impact"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-6 h-6 text-luxury-accent" />
                      <span className="text-lg font-light text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden glass p-2">
                  <img 
                    src="https://picsum.photos/seed/strategy/800/800" 
                    className="w-full h-full object-cover rounded-2xl opacity-80"
                    alt="Strategy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 glass p-8 rounded-2xl max-w-xs border border-white/10">
                  <p className="text-sm font-serif italic mb-6 leading-relaxed">"This program challenges the status quo and gives an opportunity to practice all the learning."</p>
                  <div className="flex items-center gap-4">
                    <Avatar src={testimonials[0].image} name={testimonials[0].name} size="sm" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-luxury-accent font-bold">{testimonials[0].name}</p>
                      <p className="text-[8px] uppercase tracking-widest text-white/40">{testimonials[0].company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Magic Studio / Animate Section */}
        <section id="animate" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="glass rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-luxury-accent to-transparent" />
            
            <Sparkles className="w-12 h-12 text-luxury-accent mx-auto mb-8 animate-pulse" />
            <h2 className="text-4xl md:text-7xl font-serif mb-8 tracking-tight">Magic Studio</h2>
            <p className="text-white/60 mb-16 max-w-2xl mx-auto text-lg font-light">
              Experience the power of Veo AI. Upload your professional photo or a testimonial 
              visual and let us animate it into a cinematic masterpiece.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
              
              {uploadImage ? (
                <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden border border-white/20 group shadow-2xl">
                  <img src={uploadImage} alt="Upload" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setUploadImage(null)}
                    className="absolute top-4 right-4 p-3 bg-black/50 rounded-full hover:bg-black transition-colors z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                    <button 
                      onClick={handleAnimateUploadedImage}
                      className="px-10 py-5 bg-luxury-accent text-black font-bold rounded-full flex items-center gap-3 transform scale-90 group-hover:scale-100 transition-all shadow-xl"
                    >
                      <Video className="w-6 h-6" />
                      Animate with Veo AI
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full max-w-2xl aspect-video border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-6 hover:border-luxury-accent/50 hover:bg-white/5 transition-all group"
                >
                  <div className="p-6 bg-white/5 rounded-full group-hover:scale-110 transition-transform group-hover:bg-luxury-accent/10">
                    <Upload className="w-10 h-10 text-white/40 group-hover:text-luxury-accent" />
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-serif mb-2">Drop your visual here</span>
                    <span className="text-sm text-white/20 uppercase tracking-widest">Supports PNG, JPG, WEBP</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-12">Ready to transform?</h2>
          <button className="px-12 py-6 bg-white text-black font-bold rounded-full text-xl hover:bg-luxury-accent transition-all hover:scale-105">
            Join the Next OD Batch
          </button>
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
              className="w-full max-w-6xl glass rounded-[2rem] overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]"
            >
              {/* Left Side: Content */}
              <div className="flex-1 p-12 overflow-y-auto custom-scrollbar">
                <button 
                  onClick={() => {
                    setSelectedTestimonial(null);
                    setGeneratedVisual(null);
                    setGeneratedVideo(null);
                  }}
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

                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => handleGenerateVisual(selectedTestimonial)}
                    disabled={isGenerating}
                    className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-3 hover:bg-luxury-accent transition-all disabled:opacity-50"
                  >
                    <Sparkles className="w-5 h-5" />
                    Magic Visual
                  </button>
                  <button 
                    onClick={() => handleGenerateVideo(selectedTestimonial)}
                    disabled={isGenerating}
                    className="px-8 py-4 bg-luxury-accent text-black font-bold rounded-full flex items-center gap-3 hover:scale-105 transition-all disabled:opacity-50"
                  >
                    <Video className="w-5 h-5" />
                    Cinematic Video
                  </button>
                </div>
              </div>

              {/* Right Side: Media Display */}
              <div className="flex-1 bg-black/60 border-l border-white/10 flex flex-col items-center justify-center p-12 relative min-h-[500px]">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-8 text-center">
                    <div className="relative">
                      <Loader2 className="w-20 h-20 text-luxury-accent animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-luxury-accent/20 rounded-full animate-ping" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-3">AI is Crafting...</h3>
                      <p className="text-white/40 text-sm animate-pulse tracking-widest uppercase">{generationStep}</p>
                    </div>
                  </div>
                ) : generatedVideo ? (
                  <div className="w-full h-full flex flex-col gap-6">
                    <video 
                      src={generatedVideo} 
                      controls 
                      autoPlay 
                      className="w-full aspect-video rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                    />
                    <div className="flex justify-between items-center px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-luxury-accent rounded-full animate-pulse" />
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Veo AI Generation</span>
                      </div>
                      <a href={generatedVideo} download="testimonial-video.mp4" className="text-luxury-accent text-xs flex items-center gap-2 hover:underline font-bold">
                        Download HD <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : generatedVisual ? (
                  <div className="w-full h-full flex flex-col gap-6">
                    <img 
                      src={generatedVisual} 
                      alt="Generated Visual" 
                      className="w-full aspect-video object-cover rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                    />
                    <div className="flex justify-between items-center px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-luxury-accent rounded-full animate-pulse" />
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Gemini 2.5 Visual</span>
                      </div>
                      <button 
                        onClick={() => handleGenerateVideo(selectedTestimonial, generatedVisual)}
                        className="text-luxury-accent text-xs flex items-center gap-2 hover:underline font-bold"
                      >
                        Animate with Veo AI <Video className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                      <ImageIcon className="w-10 h-10 text-white/20" />
                    </div>
                    <p className="text-white/40 font-serif italic text-lg leading-relaxed">
                      Select an action to generate <br />
                      <span className="text-luxury-accent">world-class media</span>
                    </p>
                  </div>
                )}
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
