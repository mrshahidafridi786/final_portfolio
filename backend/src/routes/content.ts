import { Router, Request, Response } from 'express';
import Hero from '../models/Hero';
import About from '../models/About';
import Experience from '../models/Experience';
import Education from '../models/Education';
import Certificate from '../models/Certificate';
import Service from '../models/Service';
import Resume from '../models/Resume';
import Settings from '../models/Settings';
import Skill from '../models/Skill';
import Project from '../models/Project';
import Contact from '../models/Contact';
import { verifyToken, AuthenticatedRequest } from '../middleware/auth';
import { upload, uploadFile, deleteFile } from '../middleware/upload';

const router = Router();

// ==========================================
// 1. HERO SECTION
// ==========================================
router.get('/hero', async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero || null);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching hero data', error: error.message });
  }
});

router.put('/hero', verifyToken, upload.single('profileImage'), async (req: Request, res: Response) => {
  try {
    const { name, title, subtitle, ctaButtons, socialLinks } = req.body;
    let hero = await Hero.findOne();

    const parsedCta = typeof ctaButtons === 'string' ? JSON.parse(ctaButtons) : ctaButtons;
    const parsedSocials = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;

    let imageUrl = hero?.profileImage || '';
    if (req.file) {
      if (hero?.profileImage) {
        await deleteFile(hero.profileImage);
      }
      imageUrl = await uploadFile(req.file, 'hero');
    }

    const updateData = {
      name,
      title,
      subtitle,
      profileImage: imageUrl,
      ctaButtons: parsedCta,
      socialLinks: parsedSocials
    };

    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, updateData, { new: true });
    } else {
      hero = new Hero(updateData);
      await hero.save();
    }
    res.json(hero);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating hero data', error: error.message });
  }
});

// ==========================================
// 2. ABOUT SECTION
// ==========================================
router.get('/about', async (req: Request, res: Response) => {
  try {
    const about = await About.findOne();
    res.json(about || null);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching about data', error: error.message });
  }
});

router.put('/about', verifyToken, upload.single('profileImage'), async (req: Request, res: Response) => {
  try {
    const { description, statistics } = req.body;
    let about = await About.findOne();

    const parsedStats = typeof statistics === 'string' ? JSON.parse(statistics) : statistics;

    let imageUrl = about?.profileImage || '';
    if (req.file) {
      if (about?.profileImage) {
        await deleteFile(about.profileImage);
      }
      imageUrl = await uploadFile(req.file, 'about');
    }

    const updateData = {
      description,
      profileImage: imageUrl,
      statistics: parsedStats
    };

    if (about) {
      about = await About.findByIdAndUpdate(about._id, updateData, { new: true });
    } else {
      about = new About(updateData);
      await about.save();
    }
    res.json(about);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating about data', error: error.message });
  }
});

// ==========================================
// 3. EXPERIENCE MODULE
// ==========================================
router.get('/experience', async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching experiences', error: error.message });
  }
});

router.post('/experience', verifyToken, async (req: Request, res: Response) => {
  try {
    const { company, position, duration, description } = req.body;
    const newExp = new Experience({ company, position, duration, description });
    await newExp.save();
    res.status(201).json(newExp);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating experience', error: error.message });
  }
});

router.put('/experience/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { company, position, duration, description } = req.body;
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      { company, position, duration, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Experience not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating experience', error: error.message });
  }
});

router.delete('/experience/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting experience', error: error.message });
  }
});

// ==========================================
// 4. EDUCATION MODULE
// ==========================================
router.get('/education', async (req: Request, res: Response) => {
  try {
    const educations = await Education.find().sort({ createdAt: -1 });
    res.json(educations);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching education', error: error.message });
  }
});

router.post('/education', verifyToken, async (req: Request, res: Response) => {
  try {
    const { institution, degree, duration, description } = req.body;
    const newEdu = new Education({ institution, degree, duration, description });
    await newEdu.save();
    res.status(201).json(newEdu);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating education', error: error.message });
  }
});

router.put('/education/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { institution, degree, duration, description } = req.body;
    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      { institution, degree, duration, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Education not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating education', error: error.message });
  }
});

router.delete('/education/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Education not found' });
    res.json({ message: 'Education deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting education', error: error.message });
  }
});

// ==========================================
// 5. CERTIFICATES MODULE
// ==========================================
router.get('/certificates', async (req: Request, res: Response) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
});

router.post('/certificates', verifyToken, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, organization, issueDate } = req.body;
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadFile(req.file, 'certificates');
    }

    const newCert = new Certificate({ title, organization, issueDate, image: imageUrl });
    await newCert.save();
    res.status(201).json(newCert);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating certificate', error: error.message });
  }
});

router.put('/certificates/:id', verifyToken, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, organization, issueDate } = req.body;
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    let imageUrl = cert.image;
    if (req.file) {
      if (cert.image) {
        await deleteFile(cert.image);
      }
      imageUrl = await uploadFile(req.file, 'certificates');
    }

    cert.title = title || cert.title;
    cert.organization = organization || cert.organization;
    cert.issueDate = issueDate || cert.issueDate;
    cert.image = imageUrl;

    await cert.save();
    res.json(cert);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating certificate', error: error.message });
  }
});

router.delete('/certificates/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    if (cert.image) {
      await deleteFile(cert.image);
    }

    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting certificate', error: error.message });
  }
});

// ==========================================
// 6. SERVICES MODULE
// ==========================================
router.get('/services', async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});

router.post('/services', verifyToken, async (req: Request, res: Response) => {
  try {
    const { name, description, icon } = req.body;
    const newService = new Service({ name, description, icon });
    await newService.save();
    res.status(201).json(newService);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
});

router.put('/services/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { name, description, icon } = req.body;
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, icon },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Service not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
});

router.delete('/services/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

// ==========================================
// 7. CONTACT MESSAGES (CONTACT)
// ==========================================
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }
    const newContact = new Contact({ name, email, subject, message, isRead: false });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message submitted successfully! Thank you.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error submitting contact message', error: error.message });
  }
});

router.get('/messages', verifyToken, async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
        { message: { $regex: search as string, $options: 'i' } },
        { subject: { $regex: search as string, $options: 'i' } }
      ];
    }
    const messages = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

router.put('/messages/:id/read', verifyToken, async (req: Request, res: Response) => {
  try {
    const { isRead } = req.body;
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: isRead !== undefined ? isRead : true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error: any) {
    res.status(500).json({ message: 'Error marking message as read', error: error.message });
  }
});

router.delete('/messages/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
});

// ==========================================
// 8. RESUME MANAGEMENT
// ==========================================
router.get('/resume', async (req: Request, res: Response) => {
  try {
    const resume = await Resume.findOne();
    res.json(resume || null);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching resume details', error: error.message });
  }
});

router.post('/resume', verifyToken, upload.single('resume'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please attach a resume document file (PDF)' });
    }

    let resume = await Resume.findOne();
    if (resume?.resumeUrl) {
      await deleteFile(resume.resumeUrl);
    }

    const fileUrl = await uploadFile(req.file, 'resume');
    
    if (resume) {
      resume.resumeUrl = fileUrl;
      await resume.save();
    } else {
      resume = new Resume({ resumeUrl: fileUrl });
      await resume.save();
    }

    res.json(resume);
  } catch (error: any) {
    res.status(500).json({ message: 'Error uploading resume document', error: error.message });
  }
});

router.delete('/resume', verifyToken, async (req: Request, res: Response) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) return res.status(404).json({ message: 'No resume record found' });

    await deleteFile(resume.resumeUrl);
    await Resume.deleteOne({ _id: resume._id });
    
    res.json({ message: 'Resume deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting resume document', error: error.message });
  }
});

// ==========================================
// 9. WEBSITE GLOBAL SETTINGS
// ==========================================
router.get('/settings', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings || null);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching global settings', error: error.message });
  }
});

router.put('/settings', verifyToken, async (req: Request, res: Response) => {
  try {
    const { socialLinks, email, phone, location } = req.body;
    let settings = await Settings.findOne();

    const parsedSocials = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;

    const updateData = {
      socialLinks: parsedSocials,
      email,
      phone,
      location
    };

    if (settings) {
      settings = await Settings.findByIdAndUpdate(settings._id, updateData, { new: true });
    } else {
      settings = new Settings(updateData);
      await settings.save();
    }
    res.json(settings);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating global settings', error: error.message });
  }
});

// ==========================================
// 10. SKILLS CRUD
// ==========================================
router.get('/skills', async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ level: -1 });
    res.json(skills);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
});

router.post('/skills', verifyToken, async (req: Request, res: Response) => {
  try {
    const { name, category, level, iconName } = req.body;
    const newSkill = new Skill({ name, category, level, iconName });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating skill', error: error.message });
  }
});

router.put('/skills/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { name, category, level, iconName } = req.body;
    const updated = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, category, level, iconName },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Skill not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating skill', error: error.message });
  }
});

router.delete('/skills/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting skill', error: error.message });
  }
});

// ==========================================
// 11. PROJECTS CRUD
// ==========================================
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
});

router.post('/projects', verifyToken, upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), async (req: Request, res: Response) => {
  try {
    const { 
      title, description, category, technologies, liveLink, githubLink,
      problem, solution, responsibilities, features, results, challenge,
      research, planning, wireframes, designDecisions, developmentProcess,
      architecture, codeSnippets, performance, lessonsLearned
    } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    let heroImageUrl = '';
    if (files && files['heroImage']) {
      heroImageUrl = await uploadFile(files['heroImage'][0], 'projects');
    }

    const galleryUrls: string[] = [];
    if (files && files['gallery']) {
      for (const file of files['gallery']) {
        const url = await uploadFile(file, 'projects');
        galleryUrls.push(url);
      }
    }

    const parsedTech = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
    const parsedResp = typeof responsibilities === 'string' ? JSON.parse(responsibilities) : responsibilities;
    const parsedFeat = typeof features === 'string' ? JSON.parse(features) : features;
    const parsedSnippets = typeof codeSnippets === 'string' ? JSON.parse(codeSnippets) : codeSnippets;

    const newProject = new Project({
      title,
      description,
      heroImage: heroImageUrl,
      gallery: galleryUrls,
      category,
      technologies: parsedTech,
      liveLink,
      githubLink,
      problem,
      solution,
      responsibilities: parsedResp,
      features: parsedFeat,
      results,
      challenge,
      research,
      planning,
      wireframes,
      designDecisions,
      developmentProcess,
      architecture,
      codeSnippets: parsedSnippets,
      performance,
      lessonsLearned
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

router.put('/projects/:id', verifyToken, upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const { 
      title, description, category, technologies, liveLink, githubLink,
      problem, solution, responsibilities, features, results, challenge,
      research, planning, wireframes, designDecisions, developmentProcess,
      architecture, codeSnippets, performance, lessonsLearned, existingGallery
    } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    let heroImageUrl = project.heroImage;
    if (files && files['heroImage']) {
      if (project.heroImage) {
        await deleteFile(project.heroImage);
      }
      heroImageUrl = await uploadFile(files['heroImage'][0], 'projects');
    }

    // Handle gallery update
    let galleryUrls: string[] = [];
    
    // Parse which gallery files from the database are kept
    if (existingGallery) {
      galleryUrls = typeof existingGallery === 'string' ? JSON.parse(existingGallery) : existingGallery;
    } else {
      galleryUrls = project.gallery;
    }

    // Add any newly uploaded gallery files
    if (files && files['gallery']) {
      for (const file of files['gallery']) {
        const url = await uploadFile(file, 'projects');
        galleryUrls.push(url);
      }
    }

    // Delete any files that are removed from the gallery list
    const deletedFiles = project.gallery.filter(url => !galleryUrls.includes(url));
    for (const url of deletedFiles) {
      await deleteFile(url);
    }

    const parsedTech = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
    const parsedResp = typeof responsibilities === 'string' ? JSON.parse(responsibilities) : responsibilities;
    const parsedFeat = typeof features === 'string' ? JSON.parse(features) : features;
    const parsedSnippets = typeof codeSnippets === 'string' ? JSON.parse(codeSnippets) : codeSnippets;

    project.title = title || project.title;
    project.description = description || project.description;
    project.heroImage = heroImageUrl;
    project.gallery = galleryUrls;
    project.category = category || project.category;
    project.technologies = parsedTech || project.technologies;
    project.liveLink = liveLink !== undefined ? liveLink : project.liveLink;
    project.githubLink = githubLink !== undefined ? githubLink : project.githubLink;
    
    project.problem = problem || project.problem;
    project.solution = solution || project.solution;
    project.responsibilities = parsedResp || project.responsibilities;
    project.features = parsedFeat || project.features;
    project.results = results || project.results;
    project.challenge = challenge || project.challenge;
    project.research = research || project.research;
    project.planning = planning || project.planning;
    project.wireframes = wireframes !== undefined ? wireframes : project.wireframes;
    project.designDecisions = designDecisions || project.designDecisions;
    project.developmentProcess = developmentProcess || project.developmentProcess;
    project.architecture = architecture || project.architecture;
    project.codeSnippets = parsedSnippets || project.codeSnippets;
    project.performance = performance || project.performance;
    project.lessonsLearned = lessonsLearned || project.lessonsLearned;

    await project.save();
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

router.delete('/projects/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.heroImage) {
      await deleteFile(project.heroImage);
    }
    for (const url of project.gallery) {
      await deleteFile(url);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

export default router;
