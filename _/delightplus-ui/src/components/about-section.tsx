import { Download, GraduationCap, MapPin, Calendar, Code } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCE } from '@/lib/constants';

export default function AboutSection() {
  const handleResumeDownload = () => {
    // Create a blob URL for the resume download
    const link = document.createElement('a');
    link.href = '/resume/Mr-Kabelo-Peter-Matlakala-Resume.pdf';
    link.download = 'Kabelo_Matlakala_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:ml-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-green-400 mb-4 glitch-text" data-text="About Me">About Me</h2>
          <p className="text-xl text-slate-600 dark:text-green-200 max-w-3xl mx-auto">
            Passionate about creating exceptional digital experiences through code and design
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600/5 to-cyan-500/5 dark:bg-gradient-to-br dark:from-green-900/20 dark:to-green-800/10 p-8 rounded-2xl typewriter-card terminal-card">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-green-400 mb-4">My Journey</h3>
              <p className="text-slate-600 dark:text-green-200 leading-relaxed mb-4">
                I'm a <span className="font-semibold text-blue-600 dark:text-green-400">{PERSONAL_INFO.title}</span> 
                with a unique background in {EDUCATION.degree} from {EDUCATION.institution}. My journey combines 
                analytical thinking with creative problem-solving to build innovative web applications.
              </p>
              <p className="text-slate-600 dark:text-green-200 leading-relaxed">
                Currently training with mLab CodeTribe Academy, I specialize in modern web technologies including 
                React, Node.js, and full-stack development. I'm passionate about UI/UX design and creating 
                user-friendly interfaces that deliver exceptional experiences.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-slate-50 dark:bg-green-900/10 p-6 rounded-xl typewriter-card terminal-card">
                <div className="flex items-center mb-3">
                  <GraduationCap className="text-2xl text-blue-600 dark:text-green-400 mr-3" size={24} />
                  <h4 className="font-semibold text-slate-800 dark:text-green-300">Education</h4>
                </div>
                <p className="text-slate-600 dark:text-green-200">{EDUCATION.degree}</p>
                <p className="text-sm text-slate-500 dark:text-green-400">{EDUCATION.institution} ({EDUCATION.period})</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-green-900/10 p-6 rounded-xl typewriter-card terminal-card">
                <div className="flex items-center mb-3">
                  <MapPin className="text-2xl text-cyan-500 dark:text-green-400 mr-3" size={24} />
                  <h4 className="font-semibold text-slate-800 dark:text-green-300">Location</h4>
                </div>
                <p className="text-slate-600 dark:text-green-200">{PERSONAL_INFO.location}</p>
                <p className="text-sm text-slate-500 dark:text-green-400">Available for remote work</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Experience Timeline */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Experience</h3>
              
              <div className="space-y-6">
                {EXPERIENCE.map((exp, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mr-4">
                      <Code className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{exp.title}</h4>
                      <p className="text-blue-600 font-medium">{exp.role}</p>
                      <p className="text-sm text-slate-500 mb-2">{exp.period}</p>
                      <p className="text-slate-600 text-sm">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Personal Details */}
            <div className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Personal Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="text-amber-500 mr-2" size={16} />
                  <span className="text-slate-600">Born {PERSONAL_INFO.birthDate}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-slate-600">{PERSONAL_INFO.maritalStatus}</span>
                </div>
              </div>
            </div>
            
            {/* Resume Download */}
            <div className="text-center">
              <button
                onClick={handleResumeDownload}
                className="inline-flex items-center bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Download className="mr-3" size={20} />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
