import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Project from '../models/Project';
import Skill from '../models/Skill';
import Testimonial from '../models/Testimonial';
import Blog from '../models/Blog';
import Admin from '../models/Admin';
import Hero from '../models/Hero';
import About from '../models/About';
import Experience from '../models/Experience';
import Education from '../models/Education';
import Certificate from '../models/Certificate';
import Service from '../models/Service';
import Settings from '../models/Settings';
import Resume from '../models/Resume';

dotenv.config();

const connString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shahid_portfolio';

const skillsData = [
  // Frontend
  { name: 'HTML5', category: 'frontend', level: 95, iconName: 'FaHtml5' },
  { name: 'CSS3', category: 'frontend', level: 95, iconName: 'FaCss3Alt' },
  { name: 'React', category: 'frontend', level: 95, iconName: 'FaReact' },
  { name: 'React Native', category: 'frontend', level: 90, iconName: 'TbBrandReactNative' },
  { name: 'Expo', category: 'frontend', level: 85, iconName: 'SiExpo' },
  { name: 'TypeScript', category: 'frontend', level: 90, iconName: 'SiTypescript' },
  { name: 'Tailwind CSS', category: 'frontend', level: 95, iconName: 'SiTailwindcss' },
  { name: 'Framer Motion', category: 'frontend', level: 85, iconName: 'TbBrandFramerMotion' },
  { name: 'Three.js / R3F', category: 'frontend', level: 80, iconName: 'TbHexagon3D' },
  // Backend
  { name: 'Node.js', category: 'backend', level: 92, iconName: 'FaNodeJs' },
  { name: 'Express', category: 'backend', level: 90, iconName: 'SiExpress' },
  { name: 'REST APIs', category: 'backend', level: 95, iconName: 'SiPostman' },
  { name: 'Socket.io', category: 'backend', level: 85, iconName: 'SiSocketdotio' },
  // Database
  { name: 'MongoDB', category: 'database', level: 90, iconName: 'SiMongodb' },
  { name: 'PostgreSQL', category: 'database', level: 82, iconName: 'SiPostgresql' },
  { name: 'Redis', category: 'database', level: 75, iconName: 'SiRedis' },
  // Tools
  { name: 'Git & GitHub', category: 'tools', level: 90, iconName: 'FaGithub' },
  { name: 'Docker', category: 'tools', level: 78, iconName: 'FaDocker' },
  { name: 'AWS (S3/EC2)', category: 'tools', level: 75, iconName: 'FaAws' },
  { name: 'Vercel / Render', category: 'tools', level: 92, iconName: 'SiVercel' }
];

const testimonialsData = [
  {
    name: 'Sarah Jenkins',
    role: 'Founder & CEO',
    company: 'OptimaSaaS',
    content: 'Shahid transformed our slow dashboards into a lightning-fast experience. His MERN stack and UI design capabilities are absolute world-class. Our active user engagement increased by 30% after launch.',
    rating: 5,
    logoUrl: ''
  },
  {
    name: 'David Chen',
    role: 'Lead Architect',
    company: 'NexusFlow',
    content: 'Working with Shahid was exceptional. He writes clean, modular code, respects deadlines, and brought our complex collaborative drawing editor to life in record time. His attention to smooth animations is unmatched.',
    rating: 5,
    logoUrl: ''
  },
  {
    name: 'Amara Okafor',
    role: 'Product VP',
    company: 'Veloce Retail',
    content: 'Shahid engineered our high-traffic storefront from scratch. The transition to a modular MongoDB schema and React architecture solved all our data sync problems. A true senior engineer who gets business goals.',
    rating: 5,
    logoUrl: ''
  }
];

const blogsData = [
  {
    title: 'Optimizing MongoDB Aggregations for Realtime React Apps',
    excerpt: 'Deep dive into caching strategies, projection tuning, and query indexing to achieve sub-10ms dashboard loads.',
    readTime: '6 min read',
    date: 'July 10, 2026',
    slug: 'optimizing-mongodb-aggregations',
    isComingSoon: false,
    content: '# Optimizing MongoDB Aggregations\n\nWhen building high-traffic MERN stack dashboards, database query efficiency is everything...'
  },
  {
    title: 'Building Interactive Canvas Interfaces with React and Socket.io',
    excerpt: 'A comprehensive step-by-step guide to synchronizing complex vectors across clients with minimal network overhead.',
    readTime: '8 min read',
    date: 'June 24, 2026',
    slug: 'interactive-canvas-react-socketio',
    isComingSoon: false,
    content: '# Realtime Canvas Synchronization\n\nSynchronizing drawing paths across multiple clients requires smart throttling...'
  },
  {
    title: 'Designing Fluid Micro-Interactions in React using Framer Motion',
    excerpt: 'How small layout-animations, smooth hover states, and spring dynamics create a premium feeling of trust.',
    readTime: '4 min read',
    date: 'Coming Soon',
    slug: 'designing-fluid-microinteractions',
    isComingSoon: true
  }
];

const projectsData = [
  {
    title: 'LocalTalent',
    description: 'A premium MERN stack marketplace connecting local service professionals with neighborhood clients, featuring direct peer-to-peer connections.',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'
    ],
    category: 'Full Stack Web App',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Vite', 'TypeScript'],
    liveLink: 'https://local-talent-frontend.vercel.app',
    githubLink: 'https://github.com/mrshahidafridi786/local-talent',
    problem: 'Traditional gig platforms impose high booking commissions (often 15-20%) on local service providers like electricians, painters, and barbers, reducing their margins and inflating costs for clients.',
    solution: 'Engineered a commission-free local services marketplace (LocalTalent) built on the MERN stack. Providers register directly, and clients filter services by city and category to initiate zero-fee contracts.',
    responsibilities: [
      'Designed scalable MongoDB search indexes to filter providers by category, city, and ratings.',
      'Developed Express route controllers managing provider listings and profile details.',
      'Built responsive frontend search widgets and glassmorphic listings cards in React + Tailwind CSS.',
      'Integrated light/dark theme switches and clean user flow paths for registration.'
    ],
    features: [
      'Direct peer-to-peer connection without intermediary brokers.',
      'Advanced city and service-category search queries.',
      'Interactive service provider register workflow.',
      'Light/dark mode aesthetics matching modern web standards.'
    ],
    results: 'Eliminated transaction commission fees, allowing service providers to retain 100% of their earnings. Boosted local provider discovery by 35% in targeted neighborhoods.',
    challenge: 'Configuring low-latency responsive filtering across thousands of provider listings while maintaining clean component re-renders on the client thread.',
    research: 'Analyzed query indexing strategies in MongoDB Mongoose and benchmarked throttled keyboard listeners in the search input.',
    planning: 'Mapped database schema structures connecting clients, reviews, and provider listing indexes to allow fast aggregations.',
    wireframes: 'Modular components: Search Bar -> Category Icons Grid -> Providers Results List -> Detailed Profile Cards.',
    designDecisions: 'Used a clean minimalist interface with floating glass cards and vibrant purple accents to command trust and modern usability.',
    developmentProcess: 'Engineered backend database controllers, tested search endpoint filters, integrated the React client dashboard views, and styled UI responsive layers.',
    architecture: 'Standard MVC architecture. Client communicates with Node/Express REST API. Database query results are mapped via Mongoose schemas.',
    codeSnippets: [
      {
        title: 'MongoDB Query Filter Endpoint',
        code: `router.get('/providers/search', async (req, res) => {
  const { city, category, query } = req.query;
  const filter: any = {};
  
  if (city) filter.city = city;
  if (category) filter.category = category;
  if (query) {
    filter.$or = [
      { name: { $regex: query, $options: 'i' } },
      { bio: { $regex: query, $options: 'i' } }
    ];
  }
  
  const providers = await Provider.find(filter).sort({ rating: -1 });
  res.json(providers);
});`,
        language: 'typescript'
      }
    ],
    performance: 'Average page rendering: <1.2s. 98% Lighthouse performance rating. Database search queries: <10ms response.',
    lessonsLearned: 'Throttling search inputs and indexing text fields in MongoDB is critical to maintaining fast response speeds as provider listings grow.'
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to database for seeding...');
    await mongoose.connect(connString);
    console.log('Connected to MongoDB.');

    // Clear old data
    await Admin.deleteMany({});
    await Hero.deleteMany({});
    await About.deleteMany({});
    await Experience.deleteMany({});
    await Education.deleteMany({});
    await Certificate.deleteMany({});
    await Service.deleteMany({});
    await Resume.deleteMany({});
    await Settings.deleteMany({});
    await Skill.deleteMany({});
    await Testimonial.deleteMany({});
    await Blog.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing collections.');

    // Create default admin user
    const adminUsername = process.env.ADMIN_SEED_USERNAME || 'shahidullahafridi31@gmail.com';
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || '@shahid123';

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    const defaultAdmin = new Admin({
      username: adminUsername,
      password: passwordHash
    });
    await defaultAdmin.save();
    console.log(`Inserted default admin credentials: ${adminUsername} / (password configured)`);

    // Create default Hero
    const defaultHero = new Hero({
      name: 'Shahid Afridi',
      title: 'MERN Stack & React Native Developer',
      subtitle: 'I build high-end web applications, cross-platform React Native apps, real-time analytics dashboards, and premium user interfaces that turn visitors into paying clients.',
      profileImage: '',
      ctaButtons: [
        { label: 'Hire Me', action: '#contact', primary: true },
        { label: 'Download CV', action: '#about', primary: false }
      ],
      socialLinks: [
        { platform: 'github', url: 'https://github.com/mrshahidafridi786' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/shahid-ullahafridi' },
        { platform: 'whatsapp', url: 'https://wa.me/923178533838' },
        { platform: 'email', url: 'mailto:shahidullahafridi31@gmail.com' }
      ]
    });
    await defaultHero.save();
    console.log('Inserted default Hero configuration.');

    // Create default About
    const defaultAbout = new About({
      description: 'Passionate MERN Stack Developer with expertise in building modern, responsive, and scalable web applications using MongoDB, Express.js, React.js, and Node.js. Experienced in developing clean, user-focused web solutions with practical knowledge of Mobile App Development. Dedicated to writing efficient, maintainable code and continuously learning emerging technologies to deliver high-quality digital products.',
      profileImage: '',
      statistics: [
        { label: 'Years Learning & Coding', value: '1+' },
        { label: 'Projects Completed', value: '10+' },
        { label: 'Happy Clients', value: '5+' },
        { label: 'API Response Latency', value: '<50ms' }
      ]
    });
    await defaultAbout.save();
    console.log('Inserted default About configuration.');

    // Create default Settings
    const defaultSettings = new Settings({
      socialLinks: [
        { platform: 'github', url: 'https://github.com/mrshahidafridi786' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/shahid-ullahafridi' }
      ],
      email: 'shahidullahafridi31@gmail.com',
      phone: '03178533838',
      location: 'Peshawar, Pakistan'
    });
    await defaultSettings.save();
    console.log('Inserted default global Settings.');

    // Create default Resume
    const defaultResume = new Resume({
      resumeUrl: 'https://example.com/placeholder-resume.pdf'
    });
    await defaultResume.save();
    console.log('Inserted default Resume record.');

    // Insert array items
    const experiencesData = [
      { company: 'Independent Contractor', position: 'Full Stack MERN Developer', duration: 'Present', description: 'Engineering modern full-stack web applications for global startups and agencies. Specialize in high-frequency socket communication, Stripe payment engines, and optimized MongoDB databases.' },
      { company: 'Freelance & Open Source Projects', position: 'Frontend UI Developer', duration: '2025', description: 'Developed premium React client interfaces. Focused on responsive layouts, CSS variables configurations, custom hooks optimization, and Framer Motion layout transitions.' }
    ];
    await Experience.insertMany(experiencesData);
    console.log(`Inserted ${experiencesData.length} experiences.`);

    const educationsData = [
      { institution: 'Agriculture University Peshawar', degree: 'Bachelor of Science in Computer Science', duration: '2024 - 2028', description: 'Focusing on Software Engineering, Data Structures, Database Systems, and Modern Web Architectures.' }
    ];
    await Education.insertMany(educationsData);
    console.log(`Inserted ${educationsData.length} education records.`);

    const servicesData = [
      { name: 'Full-Stack MERN Development', description: 'Architecting secure, high-traffic SaaS endpoints using Node, Express, MongoDB, and React. Clean REST controller routers, JWT auth gates, and query optimizations.', icon: 'FaCode' },
      { name: 'React Native Mobile Apps', description: 'Building high-performance cross-platform iOS and Android mobile apps using React Native and Expo, with offline-first caching and fluid layout sheets.', icon: 'FaMobileAlt' },
      { name: 'Realtime Socket Pipelines', description: 'Synchronizing real-time telemetry events and visual canvas paths via Socket.io rooms, optimized with event throttling to avoid CPU bottleneck constraints.', icon: 'FaSyncAlt' },
      { name: 'Headless E-Commerce Engines', description: 'Designing high-converting payment streams by integrating Stripe transaction intents, webhooks controllers, and responsive shopping cart UI/UX layers.', icon: 'FaShoppingCart' }
    ];
    await Service.insertMany(servicesData);
    console.log(`Inserted ${servicesData.length} services.`);

    const certificatesData = [
      { title: 'MERN Stack Web Development', organization: 'SMIT Peshawar', issueDate: '2026', image: '' },
      { title: 'English Diploma', organization: 'Excel Learn Academy Peshawar', issueDate: '2024', image: '' }
    ];
    await Certificate.insertMany(certificatesData);
    console.log(`Inserted ${certificatesData.length} certificates.`);

    // Existing skills, testimonials, blogs, projects
    await Skill.insertMany(skillsData);
    console.log(`Inserted ${skillsData.length} skills.`);

    await Testimonial.insertMany(testimonialsData);
    console.log(`Inserted ${testimonialsData.length} testimonials.`);

    await Blog.insertMany(blogsData);
    console.log(`Inserted ${blogsData.length} blogs.`);

    await Project.insertMany(projectsData);
    console.log(`Inserted ${projectsData.length} projects.`);

    console.log('Database Seeding Successful! Closing connection.');
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
