import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Button, Section, IconByName, Card } from '../components/Common';
import { Link } from 'react-router-dom';
import { Check, Star, MapPin, Phone, Mail, Clock } from 'lucide-react';

// --- HOME PAGE ---
export const HomePage: React.FC = () => {
  const { state } = useSite();
  const { home, services, testimonials } = state.content;
  const { animationsEnabled } = state.theme;

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 pt-16 pb-32">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(${state.theme.primaryColor} 1px, transparent 1px), linear-gradient(to right, ${state.theme.primaryColor} 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
        </div>
        
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10`}>
          <div className="md:w-1/2 text-center md:text-left pt-12">
            <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight ${animationsEnabled ? 'fade-in' : ''}`}>
              {home.heroTitle}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto md:mx-0">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button onClick={() => window.location.hash = '#contact'}>Get Started</Button>
              <Button variant="outline" onClick={() => window.location.hash = '#services'}>Learn More</Button>
            </div>
          </div>
          <div className={`md:w-1/2 mt-12 md:mt-0 ${animationsEnabled ? 'animate-float' : ''}`}>
            <img 
              src={home.heroImage} 
              alt="Digital Marketing" 
              className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 w-full object-cover h-[400px]"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-slate-900 text-white py-12" style={{ backgroundColor: state.theme.secondaryColor }}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {home.stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/80 uppercase text-sm tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Preview */}
      <Section id="services" background="white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Comprehensive solutions for your business growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service) => (
            <Card key={service.id} className="h-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-white" style={{ backgroundColor: state.theme.primaryColor }}>
                <IconByName name={service.icon} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{service.description}</p>
              <Link to="/services" className="text-sm font-semibold hover:underline" style={{ color: state.theme.primaryColor }}>Learn more &rarr;</Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section background="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Client Success Stories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < testimonial.rating ? "fill-current text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-slate-500">{testimonial.company}</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="mb-8 text-lg text-slate-300">Join hundreds of successful companies who have transformed their digital presence with us.</p>
            <Link to="/contact">
              <Button style={{ backgroundColor: 'white', color: 'black' }}>Start Your Project</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};

// --- ABOUT PAGE ---
export const AboutPage: React.FC = () => {
  const { state } = useSite();
  const { about, team } = state.content;

  return (
    <>
      <div className="bg-slate-900 text-white py-24 text-center" style={{ backgroundColor: state.theme.secondaryColor }}>
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-white/80">Illuminating brands since 2020.</p>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{about.story}</p>
            <h3 className="text-xl font-bold mb-3">Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">{about.mission}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {about.values.map((value, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="p-1 rounded-full bg-green-100 text-green-600"><Check size={14} /></div>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-lg mt-8" alt="Office" />
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" className="rounded-2xl shadow-lg" alt="Meeting" />
          </div>
        </div>
      </Section>

      <Section background="gray">
        <h2 className="text-3xl font-bold text-center mb-12">Meet The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <Card key={member.id} className="text-center overflow-hidden p-0">
              <div className="h-64 overflow-hidden relative group">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                   <div className="text-white space-x-3">
                     <span className="cursor-pointer hover:text-blue-300"><i className="fab fa-linkedin"></i></span>
                   </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <div className="text-sm font-medium mb-2" style={{ color: state.theme.primaryColor }}>{member.role}</div>
                <p className="text-sm text-slate-500">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
};

// --- SERVICES PAGE ---
export const ServicesPage: React.FC = () => {
  const { state } = useSite();
  const { services } = state.content;

  return (
    <>
      <div className="bg-slate-900 text-white py-24 text-center" style={{ backgroundColor: state.theme.secondaryColor }}>
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="max-w-2xl mx-auto text-white/80">Strategic solutions designed for ROI.</p>
      </div>

      <Section>
        <div className="grid gap-12">
          {services.map((service, index) => (
            <div key={service.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white text-3xl shadow-lg" style={{ backgroundColor: state.theme.primaryColor }}>
                  <IconByName name={service.icon} size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">{service.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold" style={{ color: state.theme.secondaryColor }}>{service.price}</span>
                  <span className="text-sm text-slate-400">/ starting price</span>
                </div>
                <ul className="mt-6 space-y-2">
                   <li className="flex items-center"><Check size={16} className="text-green-500 mr-2"/> Dedicated Support</li>
                   <li className="flex items-center"><Check size={16} className="text-green-500 mr-2"/> Monthly Reports</li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 min-h-[300px] flex items-center justify-center">
                 <div className="text-center opacity-30">
                    <IconByName name={service.icon} size={120} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="gray">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {['Basic', 'Professional', 'Enterprise'].map((tier, i) => (
             <Card key={tier} className={`relative ${i === 1 ? 'border-2 border-blue-500 transform scale-105 z-10' : ''}`} >
               {i === 1 && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">POPULAR</div>}
               <h3 className="text-xl font-bold mb-2">{tier}</h3>
               <div className="text-3xl font-bold mb-6">${i * 1000 + 999}<span className="text-sm font-normal text-slate-500">/mo</span></div>
               <ul className="space-y-4 mb-8">
                 {[1,2,3,4,5].map(n => (
                   <li key={n} className={`flex items-center text-sm ${n > 3 + i ? 'opacity-50' : ''}`}>
                     <Check size={16} className="mr-2 text-green-500" /> Feature Number {n}
                   </li>
                 ))}
               </ul>
               <Button variant={i === 1 ? 'primary' : 'outline'} className="w-full">Choose {tier}</Button>
             </Card>
           ))}
        </div>
      </Section>
    </>
  );
};

// --- BLOG PAGE ---
export const BlogPage: React.FC = () => {
  const { state } = useSite();
  const { blog } = state.content;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blog.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-slate-900 text-white py-24 text-center" style={{ backgroundColor: state.theme.secondaryColor }}>
        <h1 className="text-4xl font-bold mb-4">Latest Insights</h1>
        <p className="max-w-2xl mx-auto text-white/80">Trends, tips, and strategies for the digital age.</p>
      </div>

      <Section>
        <div className="mb-12 flex justify-center">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full max-w-md px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div key={post.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-4 h-64">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex items-center text-sm text-slate-500 mb-2">
                <span className="font-semibold text-blue-600 mr-4" style={{ color: state.theme.primaryColor }}>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center text-sm font-medium">
                <span>By {post.author}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

// --- CONTACT PAGE ---
export const ContactPage: React.FC = () => {
  const { state } = useSite();
  const { company } = state.content;

  return (
    <>
      <div className="bg-slate-900 text-white py-24 text-center" style={{ backgroundColor: state.theme.secondaryColor }}>
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="max-w-2xl mx-auto text-white/80">We'd love to hear about your project.</p>
      </div>

      <Section>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Service Interest</label>
                <select className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>SEO</option>
                  <option>Social Media</option>
                  <option>Content Strategy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tell us about your project..."></textarea>
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><MapPin /></div>
                <div>
                  <h3 className="font-bold">Our Office</h3>
                  <p className="text-slate-600 dark:text-slate-400">{company.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Phone /></div>
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-slate-600 dark:text-slate-400">{company.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Mail /></div>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-slate-600 dark:text-slate-400">{company.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600"><Clock /></div>
                <div>
                  <h3 className="font-bold">Business Hours</h3>
                  <p className="text-slate-600 dark:text-slate-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-800 rounded-xl text-center">
              <h3 className="font-bold mb-2">Need immediate assistance?</h3>
              <p className="text-sm text-slate-500 mb-4">Start a live chat with our support team.</p>
              <Button variant="outline" className="w-full">Start Live Chat</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};
