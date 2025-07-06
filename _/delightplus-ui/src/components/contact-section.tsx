import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Github, Globe, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertContactSubmissionSchema } from '@shared/schema';
import { PERSONAL_INFO } from '@/lib/constants';
import type { InsertContactSubmission } from '@shared/schema';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: InsertContactSubmission) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await apiRequest('POST', '/api/contact', data);
      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        form.reset();
        toast({
          title: 'Message Sent!',
          description: result.message,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      setSubmitStatus('error');
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:ml-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-green-400 mb-4 glitch-text" data-text="Let's Work Together">Let's Work Together</h2>
          <p className="text-xl text-slate-600 dark:text-green-200 max-w-3xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-green-900/10 p-8 rounded-2xl shadow-lg dark:shadow-green-500/20 typewriter-card terminal-card">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-green-400 mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Email</h4>
                    <a 
                      href={`mailto:${PERSONAL_INFO.email}`} 
                      className="text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="text-cyan-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Phone</h4>
                    <a 
                      href={`tel:${PERSONAL_INFO.phone}`} 
                      className="text-slate-600 hover:text-cyan-500 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Location</h4>
                    <p className="text-slate-600">{PERSONAL_INFO.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a 
                    href={PERSONAL_INFO.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href={PERSONAL_INFO.portfolio} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 hover:bg-cyan-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <Globe size={20} />
                  </a>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="w-10 h-10 bg-slate-100 hover:bg-green-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-green-900/10 p-8 rounded-2xl shadow-lg dark:shadow-green-500/20 typewriter-card terminal-card">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-green-400 mb-6">Send Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your full name" 
                            {...field} 
                            className="focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            {...field}
                            className="focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="What's this about?" 
                          {...field}
                          className="focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={6} 
                          placeholder="Tell me about your project or inquiry..." 
                          {...field}
                          className="resize-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Mail className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Something went wrong. Please try again or contact me directly.
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
