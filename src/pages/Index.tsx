import { useState, useEffect } from 'react';
import { FeatureCard } from '@/components/FeatureCard';
import { EmailCapture } from '@/components/EmailCapture';
import { FloatingElements } from '@/components/FloatingElements';
import { FileText, Mic, Video, Image, Sparkles, Zap, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    title: 'Script Generator',
    description: 'Create engaging scripts for any content type with AI-powered writing assistance that understands your audience and tone.',
    icon: FileText,
  },
  {
    title: 'Voice Generator',
    description: 'Transform text into natural-sounding speech with advanced AI voices that capture emotion and personality.',
    icon: Mic,
  },
  {
    title: 'Video Generator',
    description: 'Produce professional videos from scripts automatically with intelligent scene composition and transitions.',
    icon: Video,
  },
  {
    title: 'Image Generator',
    description: 'Generate stunning visuals and graphics that perfectly complement your content and brand aesthetic.',
    icon: Image,
  },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Logo/Brand */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-3 p-4 bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <img src="/lovable-uploads/31aeb07d-e998-4f9d-9792-668ee0bf5f2e.png" alt="Clippy Logo" className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Clippy
                </h1>
              </div>
            </div>

            {/* Hero Content */}
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                The Future of{' '}
                <span className="text-primary">
                  AI Content
                </span>{' '}
                Creation
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                One powerful AI tool to generate scripts, voices, videos, and images. 
                Transform your creative workflow with intelligent automation.
              </p>

              <div className="flex justify-center">
                <EmailCapture />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-secondary/10 rounded-2xl">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful AI Generators
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four cutting-edge tools that work together seamlessly to bring your creative vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <img src="/lovable-uploads/31aeb07d-e998-4f9d-9792-668ee0bf5f2e.png" alt="Clippy Logo" className="w-5 h-5" />
            <span className="font-semibold text-primary">Clippy AI</span>
          </div>
          <p className="text-muted-foreground">
            Revolutionizing content creation with artificial intelligence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
