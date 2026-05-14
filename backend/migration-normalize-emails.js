/**
 * MIGRATION SCRIPT: Normalize all existing emails to lowercase
 * 
 * This script connects to MongoDB and normalizes all email addresses
 * in the users collection to lowercase and trimmed format.
 * 
 * RUN THIS ONCE to fix existing user emails:
 * node migration-normalize-emails.js
 * 
 * IMPORTANT: Run this BEFORE deploying the updated code to Render
 */

import { connect } from "mongoose";
import { config } from "dotenv";
import { UserTypeModel } from "./models/userModel.js";

config();

async function normalizeEmails() {
  try {
    // Connect to MongoDB
    await connect(process.env.DB_URL);
    console.log("✓ Connected to MongoDB");

    // Find all users
    const users = await UserTypeModel.find({});
    console.log(`\nFound ${users.length} users to process...`);

    let updatedCount = 0;
    let skippedCount = 0;

    // Normalize each user's email
    for (const user of users) {
      const originalEmail = user.email;
      const normalizedEmail = originalEmail.toLowerCase().trim();

      // Check if email needs normalization
      if (originalEmail === normalizedEmail) {
        skippedCount++;
        continue; // Already normalized, skip
      }

      // Update the email
      user.email = normalizedEmail;
      await user.save();
      updatedCount++;
      console.log(`✓ Updated: "${originalEmail}" → "${normalizedEmail}"`);
    }

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Migration Complete:`);
    console.log(`  • Updated: ${updatedCount} users`);
    console.log(`  • Already normalized: ${skippedCount} users`);
    console.log(`  • Total processed: ${updatedCount + skippedCount} users`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

    process.exit(0);
  } catch (err) {
    console.error("✗ Error during migration:", err.message);
    process.exit(1);
  }
}

// Run migration
normalizeEmails();
