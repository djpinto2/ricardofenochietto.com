#!/usr/bin/env node

/**
 * Build Script for Ricardo Fenochietto Website
 * Compiles Sass, optimizes CSS, and prepares for production
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Logging functions
const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}`)
};

// Build configuration
const config = {
  sourceDir: 'scss',
  outputDir: 'css',
  mainFile: 'main.scss',
  watchMode: process.argv.includes('--watch'),
  production: process.argv.includes('--production'),
  sourceMaps: !process.argv.includes('--production')
};

// Utility functions
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    log.info(`Created directory: ${dir}`);
  }
};

const runCommand = (command, description) => {
  try {
    log.info(description);
    execSync(command, { stdio: 'inherit' });
    log.success(`${description} completed`);
    return true;
  } catch (error) {
    log.error(`${description} failed: ${error.message}`);
    return false;
  }
};

const getFileSize = (filePath) => {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2);
  }
  return 0;
};

const analyzeCSS = () => {
  const cssFile = path.join(config.outputDir, 'main.css');
  const size = getFileSize(cssFile);
  
  if (size > 0) {
    log.info(`CSS file size: ${size} KB`);
    
    // Read CSS content for analysis
    const content = fs.readFileSync(cssFile, 'utf8');
    const lines = content.split('\n').length;
    const selectors = (content.match(/[.#][a-zA-Z0-9_-]+/g) || []).length;
    
    log.info(`CSS lines: ${lines}`);
    log.info(`CSS selectors: ${selectors}`);
  }
};

// Main build function
const build = () => {
  log.header('🏗️  Building Ricardo Fenochietto Website');
  
  // Ensure output directory exists
  ensureDir(config.outputDir);
  
  // Build command
  const sassCommand = `npx sass ${config.sourceDir}/${config.mainFile}:${config.outputDir}/main.css`;
  const sassOptions = config.production ? '--style compressed --no-source-map' : '--style expanded --source-map';
  
  const fullCommand = `${sassCommand} ${sassOptions}`;
  
  // Run Sass compilation
  if (!runCommand(fullCommand, 'Compiling Sass to CSS')) {
    process.exit(1);
  }
  
  // Analyze output
  analyzeCSS();
  
  // Production optimizations
  if (config.production) {
    log.info('Running production optimizations...');
    
    // Add vendor prefixes if needed
    // runCommand('npx autoprefixer css/main.css', 'Adding vendor prefixes');
    
    // Minify further if needed
    // runCommand('npx cssnano css/main.css -o css/main.min.css', 'Minifying CSS');
    
    log.success('Production build completed');
  }
  
  log.success('Build completed successfully! 🎉');
};

// Watch mode
const watch = () => {
  log.header('👀 Starting Sass watch mode');
  log.info('Watching for changes in scss/ directory...');
  log.info('Press Ctrl+C to stop watching');
  
  const watchCommand = `npx sass --watch ${config.sourceDir}:${config.outputDir} --style expanded --source-map`;
  
  try {
    execSync(watchCommand, { stdio: 'inherit' });
  } catch (error) {
    if (error.signal === 'SIGINT') {
      log.info('Watch mode stopped');
    } else {
      log.error(`Watch mode failed: ${error.message}`);
    }
  }
};

// Clean function
const clean = () => {
  log.header('🧹 Cleaning build artifacts');
  
  if (fs.existsSync(config.outputDir)) {
    fs.rmSync(config.outputDir, { recursive: true, force: true });
    log.success('Cleaned css/ directory');
  }
  
  // Remove source maps
  const sourceMaps = fs.readdirSync('.').filter(file => file.endsWith('.css.map'));
  sourceMaps.forEach(file => {
    fs.unlinkSync(file);
    log.info(`Removed ${file}`);
  });
};

// Help function
const showHelp = () => {
  console.log(`
${colors.bright}${colors.cyan}Ricardo Fenochietto Website - Build Script${colors.reset}

${colors.bright}Usage:${colors.reset}
  node build.js [options]

${colors.bright}Options:${colors.reset}
  --watch       Watch for changes and recompile automatically
  --production  Build for production (compressed, no source maps)
  --clean       Clean build artifacts
  --help        Show this help message

${colors.bright}Examples:${colors.reset}
  node build.js                    # Development build
  node build.js --production       # Production build
  node build.js --watch            # Watch mode
  node build.js --clean            # Clean build artifacts

${colors.bright}Scripts:${colors.reset}
  npm run build                    # Production build
  npm run dev                      # Development build with source maps
  npm run sass                     # Watch mode
  npm run clean                    # Clean build artifacts
`);
};

// Main execution
const main = () => {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  if (args.includes('--clean')) {
    clean();
    return;
  }
  
  if (config.watchMode) {
    watch();
  } else {
    build();
  }
};

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { build, watch, clean, config }; 