const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
    sourceDir: './',
    buildDir: './dist',
    optimizeImages: true,
    minifyCSS: true,
    minifyJS: true,
    generateManifest: true
};

// Create build directory
if (!fs.existsSync(config.buildDir)) {
    fs.mkdirSync(config.buildDir, { recursive: true });
}

// Copy HTML files
const htmlFiles = ['index.html', 'about.html', 'publications.html', 'books.html', 'contact.html'];
htmlFiles.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(config.buildDir, file));
        console.log(`✓ Copied ${file}`);
    }
});

// Copy CSS files
if (fs.existsSync('css')) {
    execSync(`cp -r css ${config.buildDir}/`, { stdio: 'inherit' });
    console.log('✓ Copied CSS files');
}

// Copy images
if (fs.existsSync('images')) {
    execSync(`cp -r images ${config.buildDir}/`, { stdio: 'inherit' });
    console.log('✓ Copied images');
}

// Copy fonts
if (fs.existsSync('fonts')) {
    execSync(`cp -r fonts ${config.buildDir}/`, { stdio: 'inherit' });
    console.log('✓ Copied fonts');
}

// Copy JavaScript
if (fs.existsSync('script.js')) {
    fs.copyFileSync('script.js', path.join(config.buildDir, 'script.js'));
    console.log('✓ Copied script.js');
}

// Copy .htaccess
if (fs.existsSync('.htaccess')) {
    fs.copyFileSync('.htaccess', path.join(config.buildDir, '.htaccess'));
    console.log('✓ Copied .htaccess');
}

// Generate manifest
if (config.generateManifest) {
    const manifest = {
        name: "Ricardo Fenochietto - Economista & Autor",
        short_name: "Ricardo Fenochietto",
        description: "Sitio web personal de Ricardo Fenochietto, economista argentino especialista en política fiscal",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2563eb",
        icons: [
            {
                src: "/favicon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/favicon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    };
    
    fs.writeFileSync(
        path.join(config.buildDir, 'manifest.json'),
        JSON.stringify(manifest, null, 2)
    );
    console.log('✓ Generated manifest.json');
}

// Generate sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://ricardofenochietto.com/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://ricardofenochietto.com/about.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ricardofenochietto.com/publications.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ricardofenochietto.com/books.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://ricardofenochietto.com/contact.html</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>
</urlset>`;

fs.writeFileSync(path.join(config.buildDir, 'sitemap.xml'), sitemap);
console.log('✓ Generated sitemap.xml');

// Generate robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: https://ricardofenochietto.com/sitemap.xml`;

fs.writeFileSync(path.join(config.buildDir, 'robots.txt'), robots);
console.log('✓ Generated robots.txt');

console.log('\n🎉 Build completed successfully!');
console.log(`📁 Files are ready in: ${config.buildDir}`);
console.log('🚀 Ready for deployment!');
