import { ChevronDown, Github, Globe, Mail, Phone, Camera } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import TypewriterEffect from '@/components/typewriter-effect';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden matrix-rain">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-500/5 to-slate-50 dark:from-green-900/20 dark:via-green-800/10 dark:to-black matrix-bg"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-600/10 dark:bg-green-500/20 rounded-full animate-pulse dark:shadow-green-500/50"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-cyan-500/10 dark:bg-green-400/20 rounded-full animate-pulse delay-75 dark:shadow-green-400/50"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-amber-500/10 dark:bg-green-300/20 rounded-full animate-pulse delay-150 dark:shadow-green-300/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Professional headshot */}
          <div className="mb-8 inline-block relative group">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-green-600 dark:to-green-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl dark:shadow-green-500/50 overflow-hidden relative">
              {/* Profile image placeholder - can be replaced with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 dark:from-green-600 dark:to-green-500 opacity-90"></div>
              <span className="relative z-10">
                {PERSONAL_INFO.name.split(' ').slice(0, 2).map(name => name[0]).join('')}
              </span>
              
              {/* Upload indicator */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="text-white" size={20} />
              </div>
            </div>
            
            {/* To add a profile picture, replace the gradient background with:
                 <img src="/path/to/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
            */}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-slate-800 dark:text-green-300">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-green-400 dark:to-green-500 bg-clip-text text-transparent">
              <span className="hidden dark:inline glitch-text" data-text={PERSONAL_INFO.name}>
                {PERSONAL_INFO.name}
              </span>
              <span className="dark:hidden">
                <TypewriterEffect 
                  text={PERSONAL_INFO.name} 
                  speed={150} 
                  delay={500}
                />
              </span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-green-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-blue-600 dark:text-green-400">{PERSONAL_INFO.title}</span> passionate about creating innovative web solutions 
            with modern technologies and elegant design.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-green-600 dark:hover:bg-green-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl dark:shadow-green-500/50"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-blue-600 dark:border-green-400 text-blue-600 dark:text-green-400 hover:bg-blue-600 dark:hover:bg-green-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 text-2xl">
            <a 
              href={PERSONAL_INFO.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-green-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors duration-300 transform hover:scale-110 dark:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a 
              href={PERSONAL_INFO.portfolio} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-green-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors duration-300 transform hover:scale-110 dark:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              aria-label="Portfolio Website"
            >
              <Globe size={24} />
            </a>
            <a 
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-600 dark:text-green-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors duration-300 transform hover:scale-110 dark:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              aria-label="Email Contact"
            >
              <Mail size={24} />
            </a>
            <a 
              href={`tel:${PERSONAL_INFO.phone}`}
              className="text-slate-600 dark:text-green-300 hover:text-blue-600 dark:hover:text-green-400 transition-colors duration-300 transform hover:scale-110 dark:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
              aria-label="Phone Contact"
            >
              <Phone size={24} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-slate-400 w-8 h-8" />
      </div>
    </section>
  );
}
