const { execSync } = require('child_process');
const fs = require('fs');

try {
  // Set executable permissions
  execSync('chmod +x node_modules/.bin/react-scripts', { stdio: 'inherit' });
  // Run build
  execSync('node_modules/.bin/react-scripts build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}