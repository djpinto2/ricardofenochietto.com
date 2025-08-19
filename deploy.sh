#!/bin/bash

# =============================================================================
# DEPLOY SCRIPT FOR HOSTINGER
# =============================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="Ricardo Fenochietto Website"
BUILD_DIR="css"
DEPLOY_FILES=(
    "index.html"
    "css/main.css"
    "fonts/"
    "images/"
    "script.js"
)

echo -e "${BLUE}🚀 ${PROJECT_NAME} - Deploy Script${NC}"
echo "=================================="

# Check if build exists
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}❌ Build directory not found. Run 'npm run build' first.${NC}"
    exit 1
fi

# Check if main.css exists
if [ ! -f "$BUILD_DIR/main.css" ]; then
    echo -e "${RED}❌ CSS file not found. Run 'npm run build' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build files found${NC}"

# Show file sizes
echo -e "\n${BLUE}📊 File Information:${NC}"
echo "--------------------------------"
for file in "${DEPLOY_FILES[@]}"; do
    if [ -e "$file" ]; then
        if [ -d "$file" ]; then
            size=$(du -sh "$file" | cut -f1)
            echo -e "📁 $file ($size)"
        else
            size=$(du -h "$file" | cut -f1)
            echo -e "📄 $file ($size)"
        fi
    else
        echo -e "${RED}❌ $file (not found)${NC}"
    fi
done

echo -e "\n${BLUE}📋 Deploy Instructions for Hostinger:${NC}"
echo "=============================================="
echo -e "${YELLOW}1. FTP Connection Details:${NC}"
echo "   - Host: srv1893-files.hstgr.io"
echo "   - Username: Your Hostinger username"
echo "   - Password: Your Hostinger password"
echo "   - Port: 21 (FTP) or 22 (SFTP)"
echo ""
echo -e "${YELLOW}2. Upload these files to your public_html directory:${NC}"
for file in "${DEPLOY_FILES[@]}"; do
    echo "   ✅ $file"
done
echo ""
echo -e "${YELLOW}3. Alternative: Use Hostinger File Manager${NC}"
echo "   - Go to your Hostinger control panel"
echo "   - Navigate to 'File Manager'"
echo "   - Upload the files manually"
echo ""
echo -e "${YELLOW}4. File Structure on Server:${NC}"
echo "   public_html/"
echo "   ├── index.html"
echo "   ├── css/"
echo "   │   └── main.css"
echo "   ├── fonts/"
echo "   │   ├── fonts.css"
echo "   │   ├── UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
echo "   │   └── nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qC0s.woff2"
echo "   ├── images/"
echo "   │   ├── fondo.jpg"
echo "   │   ├── image1.png"
echo "   │   ├── image2.png"
echo "   │   ├── image3.png"
echo "   │   └── image4.png"
echo "   └── script.js"
echo ""
echo -e "${GREEN}🎉 Your site will be live at: ricardofenochietto.com${NC}"
echo ""
echo -e "${BLUE}💡 Tips:${NC}"
echo "   - Keep the original scss/ folder for future updates"
echo "   - Run 'npm run build' before each deployment"
echo "   - Test locally before uploading"
echo "   - Backup your current site before updating"
echo ""
echo -e "${YELLOW}⚠️  Important:${NC}"
echo "   - Make sure all images are uploaded to the images/ folder"
echo "   - Verify that css/main.css is accessible"
echo "   - Check that all links work correctly"
echo ""
echo -e "${GREEN}✅ Deploy script completed successfully!${NC}" 