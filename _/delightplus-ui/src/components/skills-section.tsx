import { useState, useEffect, useRef } from 'react';
import { SKILLS } from '@/lib/constants';

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const SkillBar = ({ skill, delay = 0 }: { skill: { name: string; level: number }; delay?: number }) => (
    <div className="skill-item mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-slate-700">{skill.name}</span>
        <span className="text-blue-600 font-medium">{skill.level}%</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-white dark:bg-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:ml-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-green-400 mb-4 glitch-text" data-text="Skills & Technologies">Skills & Technologies</h2>
          <p className="text-xl text-slate-600 dark:text-green-200 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable web applications
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Programming Languages</h3>
              {SKILLS.languages.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} delay={index * 200} />
              ))}
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Frameworks & Libraries</h3>
              {SKILLS.frameworks.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} delay={(index + 4) * 200} />
              ))}
            </div>
          </div>
          
          {/* Design & Tools */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Design Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Figma', 'Photoshop', 'Canva', 'Corel Draw'].map((tool, index) => (
                  <div 
                    key={tool}
                    className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">{tool[0]}</span>
                    </div>
                    <h4 className="font-semibold text-slate-800">{tool}</h4>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Databases & Tools</h3>
              <div className="grid grid-cols-2 gap-4">
                {['MongoDB', 'MySQL', 'Git', 'SQLite'].map((tool, index) => (
                  <div 
                    key={tool}
                    className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">{tool[0]}</span>
                    </div>
                    <h4 className="font-semibold text-slate-800">{tool}</h4>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Core Strengths */}
            <div className="bg-gradient-to-br from-blue-600/5 to-cyan-500/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Core Strengths</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.design.map((strength, index) => (
                  <span 
                    key={strength}
                    className="bg-white border border-blue-200 text-blue-700 font-medium px-4 py-2 rounded-full text-sm hover:bg-blue-50 transition-colors duration-200"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Currently Learning */}
            <div className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Currently Learning</h3>
              <div className="flex flex-wrap gap-3">
                {['TypeScript', 'GraphQL', 'Next.js', 'Docker'].map((tech, index) => (
                  <span 
                    key={tech}
                    className="bg-white border border-amber-200 text-amber-700 font-medium px-4 py-2 rounded-full text-sm hover:bg-amber-50 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
