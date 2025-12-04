import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Button, Card } from '../components/Common';
import { Layout, Palette, Type, Home, FileText, Users, Settings, LogOut, Upload, Trash2, Plus, Lock } from 'lucide-react';
import { Service, TeamMember, BlogPost } from '../types';

export const AdminDashboard: React.FC = () => {
  const { state, dispatch } = useSite();
  const [activeTab, setActiveTab] = useState('theme');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-bold">Admin Access</h2>
            <p className="text-slate-500">Enter password to continue</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === 'admin123') {
              dispatch({ type: 'LOGIN' });
            } else {
              setError('Invalid password');
            }
          }}>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md mb-4 dark:bg-slate-700 dark:border-slate-600"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
            <Button className="w-full">Login</Button>
          </form>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'theme', label: 'Theme & Style', icon: Palette },
    { id: 'general', label: 'General Info', icon: Settings },
    { id: 'home', label: 'Home Content', icon: Home },
    { id: 'services', label: 'Services', icon: Layout },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'blog', label: 'Blog', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => dispatch({ type: 'LOGOUT' })}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white capitalize">{activeTab.replace('-', ' ')} Settings</h2>
          <Button variant="outline" onClick={() => window.open('/#/', '_blank')}>View Site</Button>
        </header>

        {activeTab === 'theme' && <ThemeEditor />}
        {activeTab === 'general' && <GeneralEditor />}
        {activeTab === 'home' && <HomeEditor />}
        {activeTab === 'services' && <ServicesEditor />}
        {activeTab === 'team' && <TeamEditor />}
        {activeTab === 'blog' && <BlogEditor />}
      </div>
    </div>
  );
};

// --- EDITORS ---

const EditorSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm mb-6">
    <h3 className="text-lg font-bold mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">{title}</h3>
    {children}
  </div>
);

const InputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
    {children}
  </div>
);

const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
    {...props} 
  />
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea 
    className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" 
    rows={4}
    {...props} 
  />
);

const ThemeEditor = () => {
  const { state, dispatch } = useSite();
  const { theme } = state;

  const updateTheme = (key: string, value: any) => {
    dispatch({ type: 'SET_THEME', payload: { [key]: value } });
  };

  return (
    <div className="max-w-4xl">
      <EditorSection title="Colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputGroup label="Primary Color">
            <div className="flex items-center space-x-2">
              <input type="color" value={theme.primaryColor} onChange={(e) => updateTheme('primaryColor', e.target.value)} className="h-10 w-10 rounded cursor-pointer" />
              <TextInput value={theme.primaryColor} onChange={(e) => updateTheme('primaryColor', e.target.value)} />
            </div>
          </InputGroup>
          <InputGroup label="Secondary Color">
            <div className="flex items-center space-x-2">
              <input type="color" value={theme.secondaryColor} onChange={(e) => updateTheme('secondaryColor', e.target.value)} className="h-10 w-10 rounded cursor-pointer" />
              <TextInput value={theme.secondaryColor} onChange={(e) => updateTheme('secondaryColor', e.target.value)} />
            </div>
          </InputGroup>
          <InputGroup label="Accent Color">
             <div className="flex items-center space-x-2">
              <input type="color" value={theme.accentColor} onChange={(e) => updateTheme('accentColor', e.target.value)} className="h-10 w-10 rounded cursor-pointer" />
              <TextInput value={theme.accentColor} onChange={(e) => updateTheme('accentColor', e.target.value)} />
            </div>
          </InputGroup>
        </div>
      </EditorSection>

      <EditorSection title="Appearance">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Theme Mode">
            <select 
              value={theme.mode} 
              onChange={(e) => updateTheme('mode', e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </InputGroup>
          <InputGroup label="Layout Width">
            <select 
              value={theme.layout} 
              onChange={(e) => updateTheme('layout', e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
            >
              <option value="boxed">Boxed</option>
              <option value="wide">Wide</option>
              <option value="full">Full Width</option>
            </select>
          </InputGroup>
          <InputGroup label="Button Style">
            <select 
              value={theme.buttonStyle} 
              onChange={(e) => updateTheme('buttonStyle', e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
            >
              <option value="rounded">Rounded</option>
              <option value="sharp">Sharp</option>
              <option value="pill">Pill</option>
            </select>
          </InputGroup>
           <InputGroup label="Cursor Style">
            <select 
              value={theme.cursor} 
              onChange={(e) => updateTheme('cursor', e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
            >
              <option value="default">Default</option>
              <option value="circle">Circle</option>
              <option value="dot">Dot</option>
            </select>
          </InputGroup>
          <InputGroup label="Font Family">
             <select 
              value={theme.font} 
              onChange={(e) => updateTheme('font', e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Montserrat">Montserrat</option>
            </select>
          </InputGroup>
           <div className="flex items-center space-x-3 mt-8">
            <input 
              type="checkbox" 
              checked={theme.animationsEnabled} 
              onChange={(e) => updateTheme('animationsEnabled', e.target.checked)}
              className="h-5 w-5"
            />
            <label>Enable Animations</label>
          </div>
        </div>
      </EditorSection>
    </div>
  );
};

const GeneralEditor = () => {
  const { state, dispatch } = useSite();
  const { company } = state.content;

  const updateCompany = (key: string, value: string) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: { company: { ...company, [key]: value } } });
  };

  return (
    <div className="max-w-4xl">
      <EditorSection title="Company Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Company Name">
            <TextInput value={company.name} onChange={(e) => updateCompany('name', e.target.value)} />
          </InputGroup>
          <InputGroup label="Logo Text">
            <TextInput value={company.logoText} onChange={(e) => updateCompany('logoText', e.target.value)} />
          </InputGroup>
          <InputGroup label="Tagline">
            <TextInput value={company.tagline} onChange={(e) => updateCompany('tagline', e.target.value)} />
          </InputGroup>
          <div className="md:col-span-2">
             <InputGroup label="Description">
              <TextArea value={company.description} onChange={(e) => updateCompany('description', e.target.value)} />
            </InputGroup>
          </div>
        </div>
      </EditorSection>

      <EditorSection title="Contact Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <InputGroup label="Address">
            <TextInput value={company.address} onChange={(e) => updateCompany('address', e.target.value)} />
          </InputGroup>
           <InputGroup label="Phone">
            <TextInput value={company.phone} onChange={(e) => updateCompany('phone', e.target.value)} />
          </InputGroup>
           <InputGroup label="Email">
            <TextInput value={company.email} onChange={(e) => updateCompany('email', e.target.value)} />
          </InputGroup>
        </div>
      </EditorSection>
    </div>
  );
};

const HomeEditor = () => {
  const { state, dispatch } = useSite();
  const { home } = state.content;

  const updateHome = (key: string, value: any) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: { home: { ...home, [key]: value } } });
  };

  return (
    <div className="max-w-4xl">
      <EditorSection title="Hero Section">
        <InputGroup label="Hero Title">
          <TextInput value={home.heroTitle} onChange={(e) => updateHome('heroTitle', e.target.value)} />
        </InputGroup>
        <InputGroup label="Hero Subtitle">
          <TextArea value={home.heroSubtitle} onChange={(e) => updateHome('heroSubtitle', e.target.value)} />
        </InputGroup>
        <InputGroup label="Hero Image URL">
          <TextInput value={home.heroImage} onChange={(e) => updateHome('heroImage', e.target.value)} />
        </InputGroup>
      </EditorSection>
      <EditorSection title="Statistics">
        <div className="grid grid-cols-2 gap-4">
          {home.stats.map((stat, index) => (
             <div key={index} className="p-4 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
               <InputGroup label={`Stat ${index + 1} Label`}>
                 <TextInput value={stat.label} onChange={(e) => {
                   const newStats = [...home.stats];
                   newStats[index].label = e.target.value;
                   updateHome('stats', newStats);
                 }} />
               </InputGroup>
               <InputGroup label={`Stat ${index + 1} Value`}>
                 <TextInput value={stat.value} onChange={(e) => {
                   const newStats = [...home.stats];
                   newStats[index].value = e.target.value;
                   updateHome('stats', newStats);
                 }} />
               </InputGroup>
             </div>
          ))}
        </div>
      </EditorSection>
    </div>
  );
};

const ServicesEditor = () => {
  const { state, dispatch } = useSite();
  const { services } = state.content;

  const updateServices = (newServices: Service[]) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: { services: newServices } });
  };

  const handleEdit = (index: number, key: keyof Service, value: string) => {
    const updated = [...services];
    // @ts-ignore
    updated[index][key] = value;
    updateServices(updated);
  };

  const handleDelete = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    updateServices(updated);
  };

  const handleAdd = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'New Service',
      description: 'Description here',
      icon: 'Star',
      price: '$0'
    };
    updateServices([...services, newService]);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-end mb-6">
        <Button onClick={handleAdd} className="flex items-center space-x-2"><Plus size={16}/> <span>Add Service</span></Button>
      </div>
      <div className="grid gap-6">
        {services.map((service, index) => (
          <Card key={service.id} className="relative group">
            <button 
              onClick={() => handleDelete(index)}
              className="absolute top-4 right-4 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={20} />
            </button>
            <div className="grid md:grid-cols-2 gap-4 pr-12">
               <InputGroup label="Title">
                 <TextInput value={service.title} onChange={(e) => handleEdit(index, 'title', e.target.value)} />
               </InputGroup>
               <InputGroup label="Icon Name (Lucide)">
                 <TextInput value={service.icon} onChange={(e) => handleEdit(index, 'icon', e.target.value)} />
               </InputGroup>
               <div className="md:col-span-2">
                 <InputGroup label="Description">
                   <TextArea value={service.description} onChange={(e) => handleEdit(index, 'description', e.target.value)} rows={2} />
                 </InputGroup>
               </div>
               <InputGroup label="Price">
                 <TextInput value={service.price} onChange={(e) => handleEdit(index, 'price', e.target.value)} />
               </InputGroup>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Similar structures for Team and Blog editors (simplified for brevity but functionally identical pattern)
const TeamEditor = () => {
  const { state, dispatch } = useSite();
  const { team } = state.content;

  const updateTeam = (newTeam: TeamMember[]) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: { team: newTeam } });
  };

  const handleAdd = () => {
    updateTeam([...team, { id: Date.now().toString(), name: 'New Member', role: 'Role', bio: 'Bio', image: 'https://via.placeholder.com/150' }]);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-end mb-6"><Button onClick={handleAdd}><Plus size={16}/> Add Member</Button></div>
      <div className="grid md:grid-cols-2 gap-6">
        {team.map((member, i) => (
          <Card key={member.id} className="relative">
             <button onClick={() => updateTeam(team.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-red-500"><Trash2 size={16}/></button>
             <div className="space-y-3">
               <TextInput value={member.name} onChange={(e) => { const n = [...team]; n[i].name = e.target.value; updateTeam(n); }} placeholder="Name" />
               <TextInput value={member.role} onChange={(e) => { const n = [...team]; n[i].role = e.target.value; updateTeam(n); }} placeholder="Role" />
               <TextArea value={member.bio} onChange={(e) => { const n = [...team]; n[i].bio = e.target.value; updateTeam(n); }} placeholder="Bio" rows={2} />
               <TextInput value={member.image} onChange={(e) => { const n = [...team]; n[i].image = e.target.value; updateTeam(n); }} placeholder="Image URL" />
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const BlogEditor = () => {
  const { state, dispatch } = useSite();
  const { blog } = state.content;

  const updateBlog = (newBlog: BlogPost[]) => {
    dispatch({ type: 'UPDATE_CONTENT', payload: { blog: newBlog } });
  };

  const handleAdd = () => {
    updateBlog([...blog, { 
      id: Date.now().toString(), 
      title: 'New Post', 
      excerpt: 'Excerpt', 
      content: 'Content', 
      category: 'General', 
      date: new Date().toISOString().split('T')[0], 
      author: 'Admin',
      image: 'https://via.placeholder.com/800x400' 
    }]);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-end mb-6"><Button onClick={handleAdd}><Plus size={16}/> Add Post</Button></div>
      <div className="space-y-6">
        {blog.map((post, i) => (
          <Card key={post.id} className="relative">
             <button onClick={() => updateBlog(blog.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-red-500"><Trash2 size={20}/></button>
             <div className="grid gap-4">
               <InputGroup label="Title">
                  <TextInput value={post.title} onChange={(e) => { const n = [...blog]; n[i].title = e.target.value; updateBlog(n); }} />
               </InputGroup>
               <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Category">
                    <TextInput value={post.category} onChange={(e) => { const n = [...blog]; n[i].category = e.target.value; updateBlog(n); }} />
                  </InputGroup>
                   <InputGroup label="Date">
                    <TextInput type="date" value={post.date} onChange={(e) => { const n = [...blog]; n[i].date = e.target.value; updateBlog(n); }} />
                  </InputGroup>
               </div>
               <InputGroup label="Excerpt">
                  <TextArea value={post.excerpt} onChange={(e) => { const n = [...blog]; n[i].excerpt = e.target.value; updateBlog(n); }} rows={2} />
               </InputGroup>
               <InputGroup label="Image URL">
                  <TextInput value={post.image} onChange={(e) => { const n = [...blog]; n[i].image = e.target.value; updateBlog(n); }} />
               </InputGroup>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
