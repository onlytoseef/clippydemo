import { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export const FeatureCard = ({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`feature-card group cursor-pointer animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-6 flex justify-center">
        <div className={`relative p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 transition-all duration-500 ${
          isHovered ? 'scale-110 shadow-xl bg-gradient-to-br from-primary/20 to-secondary/20' : ''
        }`}>
          <div className={`p-4 bg-gradient-to-br from-white to-white/80 rounded-xl shadow-md transition-all duration-300 ${
            isHovered ? 'scale-110 bg-gradient-to-br from-primary to-primary-glow text-white' : 'text-primary'
          }`}>
            <Icon size={32} className="transition-all duration-300" />
          </div>
          
          {/* Floating decorative elements */}
          <div className={`absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full transition-all duration-500 ${
            isHovered ? 'scale-150 animate-pulse' : ''
          }`} />
          <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full transition-all duration-500 ${
            isHovered ? 'scale-150 animate-pulse' : ''
          }`} style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className={`mt-6 h-1 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ${
        isHovered ? 'w-full' : 'w-0'
      }`} />
    </div>
  );
};