import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Education from '../models/Education';
import Certificate from '../models/Certificate';
import Admin from '../models/Admin';
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
