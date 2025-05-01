const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Try to get the latest git tag
let version = 'v0.1.0'; // Default version if no git tags exist

try {
  // Get the latest tag from git
  const gitTag = execSync('git describe --tags --abbrev=0').toString().trim();
  if (gitTag) {
    version = gitTag;
  }
} catch (error) {
  console.log('No git tags found, using default version');
}

// Path to constants file
const constantsPath = path.join(__dirname, '../src/constants.js');

// Read the current constants file
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

// Replace the version line
constantsContent = constantsContent.replace(
  /export const APP_VERSION = .*?;/,
  `export const APP_VERSION = '${version}';`
);

// Write the updated content back
fs.writeFileSync(constantsPath, constantsContent);

console.log(`Updated version to ${version}`);