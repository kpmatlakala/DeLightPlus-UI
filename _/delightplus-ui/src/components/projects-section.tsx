import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '@/lib/constants';
import WeatherCard from './weather-card';

export default function ProjectsSection() {
  const getProjectImage = (projectId: string) => {
    const imageMap: Record<string, string> = {
      'weather-app': 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'restaurant-reservation': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'travel-planner': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'hotel-booking': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'shopping-list': 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'audio-recording': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'gallery': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'todo-list': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'map-server': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
    };
    
    return imageMap[projectId] || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400';
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'React & Native': 'bg-blue-100 text-blue-600',
      'MERN Stack': 'bg-green-100 text-green-600',
      'React.js': 'bg-cyan-100 text-cyan-600',
      'Redux Toolkit': 'bg-purple-100 text-purple-600',
      'SQLite': 'bg-orange-100 text-orange-600',
      'Node.js': 'bg-emerald-100 text-emerald-600'
    };
    
    return colorMap[category] || 'bg-slate-100 text-slate-600';
  };

  // Show featured projects (first 6)
  const featuredProjects = PROJECTS.slice(0, 6);

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:ml-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-green-400 mb-4 glitch-text" data-text="Featured Projects">Featured Projects</h2>
          <p className="text-xl text-slate-600 dark:text-green-200 max-w-3xl mx-auto">
            A collection of projects showcasing my skills in full-stack development and modern web technologies
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Live WeatherCard Demo */}
          {featuredProjects.map((project) => {
            if (project.id === 'weather-app') {
              return (
                <div key={project.id} className="lg:col-span-1">
                  <div className="bg-white dark:bg-green-900/10 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-green-500/20 transition-all duration-300 overflow-hidden typewriter-card terminal-card">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-green-400 mb-3">{project.name}</h3>
                      <p className="text-slate-600 dark:text-green-200 mb-4 text-sm leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-50 dark:bg-green-900/30 text-blue-600 dark:text-green-400 text-xs rounded-md font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Live Weather Demo */}
                      <div className="mb-4">
                        <WeatherCard />
                      </div>
                      
                      <div className="flex gap-3">
                        <button className="flex items-center px-3 py-2 bg-slate-100 dark:bg-green-900/20 text-slate-700 dark:text-green-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-green-900/30 transition-colors">
                          <Github size={16} className="mr-2" />
                          Code
                        </button>
                        <button className="flex items-center px-3 py-2 bg-blue-600 dark:bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-green-700 transition-colors">
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            return (
              <div 
                key={project.id}
                className="bg-white dark:bg-green-900/10 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden typewriter-card terminal-card"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 relative overflow-hidden">
                  <img 
                    src={getProjectImage(project.id)}
                    alt={`${project.name} interface`}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">{project.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-green-400 mb-3">{project.name}</h3>
                  <p className="text-slate-600 dark:text-green-200 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center font-medium transition-colors duration-200 flex items-center justify-center">
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </button>
                    <button className="flex-1 border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-600 py-2 px-4 rounded-lg text-center font-medium transition-colors duration-200 flex items-center justify-center">
                      <Github size={16} className="mr-2" />
                      Code
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/DeLightPlus" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Github className="mr-3" size={20} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
