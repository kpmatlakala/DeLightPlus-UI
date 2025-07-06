import { Github, Globe, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-slate-300">{PERSONAL_INFO.title}</p>
            <p className="text-slate-400 text-sm mt-2">
              Passionate about creating innovative web and mobile solutions.
            </p>
          </div>
          
          <div className="text-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {['about', 'projects', 'skills', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-slate-300 hover:text-white transition-colors duration-200 capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href={PERSONAL_INFO.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors duration-300"
                aria-label="Portfolio Website"
              >
                <Globe size={20} />
              </a>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-slate-300 hover:text-white transition-colors duration-300"
                aria-label="Email Contact"
              >
                <Mail size={20} />
              </a>
              <a 
                href={`tel:${PERSONAL_INFO.phone}`}
                className="text-slate-300 hover:text-white transition-colors duration-300"
                aria-label="Phone Contact"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved. Built with ❤️ using modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
