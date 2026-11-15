import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Education from '../models/Education';
import Certificate from '../models/Certificate';
import Admin from '../models/Admin';
import Resume from '../models/Resume';
import Hero from '../models/Hero';
import About from '../models/About';
import Skill from '../models/Skill';
import Service from '../models/Service';
import bcrypt from 'bcryptjs';

dotenv.config();

const connString = process.env.MONGODB_URI;
if (!connString) {
  console.error('Error: MONGODB_URI is not defined in the backend .env file');
  process.exit(1);
}

const run = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(connString);
    console.log('Connected to MongoDB.');

    // Update all matching Education documents
    const result = await Education.updateMany(
      { institution: { $in: ['The University of Agriculture, Peshawar', 'Agriculture Uni Peshawar', 'University of Peshawar'] } },
      { $set: { institution: 'Agriculture University Peshawar' } }
    );
    console.log(`Successfully updated ${result.modifiedCount} education record(s).`);

    // Reset and update certificates collection
    await Certificate.deleteMany({});
    const certificatesData = [
      { title: 'MERN Stack Web Development', organization: 'SMIT Peshawar', issueDate: '2026', image: '' },
      { title: 'English Diploma', organization: 'Excel Learn Academy Peshawar', issueDate: '2024', image: '' }
    ];
    await Certificate.insertMany(certificatesData);
    console.log('Successfully updated certificates collection.');

    // Reset/update admin user login credentials
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('@shahid123', salt);
    await Admin.deleteMany({});
    const defaultAdmin = new Admin({
      username: 'shahidullahafridi31@gmail.com',
      password: passwordHash
    });
    await defaultAdmin.save();
    console.log('Successfully updated admin user credentials.');

    // Reset/update default Resume
    await Resume.deleteMany({});
    const defaultResume = new Resume({
      resumeUrl: '/Shahid_Afridi_CV.pdf'
    });
    await defaultResume.save();
    console.log('Successfully updated resume record.');

    // Update Hero Content
    await Hero.updateMany({}, {
      $set: {
        title: 'MERN Stack Web Developer',
        subtitle: 'I build high-end web applications, scalable MERN architectures, real-time analytics dashboards, and premium user interfaces that turn visitors into paying clients.',
        ctaButtons: [
          { label: 'Hire Me', action: '#contact', primary: true },
          { label: 'Download CV', action: '/Shahid_Afridi_CV.pdf', primary: false }
        ]
      }
    });
    console.log('Successfully updated Hero content and CTA buttons.');

    // Update About Content
    await About.updateMany({}, {
      $set: {
        description: 'Passionate MERN Stack Developer with expertise in building modern, responsive, and scalable web applications using MongoDB, Express.js, React.js, and Node.js. Experienced in developing clean, user-focused web solutions with practical knowledge of Full-Stack Architecture. Dedicated to writing efficient, maintainable code and continuously learning emerging technologies to deliver high-quality digital products.'
      }
    });
    console.log('Successfully updated About description.');

    // Remove any mobile/react-native/expo skills from database
    const removedSkills = await Skill.deleteMany({
      name: { $in: ['React Native', 'Expo', 'Android App Development', 'Cross-Platform Development'] }
    });
    console.log(`Removed ${removedSkills.deletedCount} mobile app skill(s) from database.`);

    // Update/Replace Mobile Services in DB
    await Service.deleteMany({
      name: { $regex: /mobile|react native/i }
    });
    await Service.updateOne(
      { name: 'API Design & Cloud Architecture' },
      {
        $setOnInsert: {
          name: 'API Design & Cloud Architecture',
          description: 'Constructing robust Node.js and Express backend servers with secure endpoints, MongoDB indexing, and cloud storage integration.',
          icon: 'FaServer'
        }
      },
      { upsert: true }
    );
    console.log('Successfully updated Services collection.');

    // Log current education records in DB
    const allEdus = await Education.find();
    console.log('Current education records in DB:', JSON.stringify(allEdus, null, 2));

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating university name in DB:', error);
    process.exit(1);
  }
};

run();
