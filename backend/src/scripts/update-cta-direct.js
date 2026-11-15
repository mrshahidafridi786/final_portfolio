const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });
const Hero = require('../../dist/models/Hero').default;

const directCvUrl = 'https://raw.githubusercontent.com/mrshahidafridi786/final_portfolio/master/frontend/public/Shahid_Afridi_CV.pdf';

(async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const res = await Hero.updateMany({}, {
      $set: {
        ctaButtons: [
          { label: 'Hire Me', action: '#contact', primary: true },
          { label: 'Download CV', action: directCvUrl, primary: false }
        ]
      }
    });

    console.log('Updated documents:', res.modifiedCount);
    const updated = await Hero.findOne();
    console.log('Current CTA Buttons in DB:', JSON.stringify(updated.ctaButtons, null, 2));

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating Hero CTA:', err);
    process.exit(1);
  }
})();
