#!/usr/bin/env node

// Server setup validation script
const { exec } = require('child_process');
const fs = require('fs');

console.log('🔍 Checking deployment setup...\n');

// Check if .env.prod exists
if (fs.existsSync('.env.prod')) {
    console.log('✅ .env.prod file exists');
    
    // Read and validate .env.prod
    const envContent = fs.readFileSync('.env.prod', 'utf8');
    const requiredVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];
    
    requiredVars.forEach(varName => {
        if (envContent.includes(`${varName}=`)) {
            console.log(`✅ ${varName} is configured`);
        } else {
            console.log(`❌ ${varName} is missing`);
        }
    });
} else {
    console.log('❌ .env.prod file missing');
}

// Check if deployment package exists
if (fs.existsSync('plp-backend-deploy.tar.gz')) {
    console.log('✅ Deployment package exists');
} else {
    console.log('❌ Deployment package missing - run: npm run build first');
}

// Check if build directory exists
if (fs.existsSync('dist')) {
    console.log('✅ Build directory exists');
} else {
    console.log('❌ Build directory missing - run: npm run build');
}

console.log('\n🚀 Ready for deployment!');
console.log('\nNext steps:');
console.log('1. Run: ./simple-direct-deploy.sh');
console.log('2. Follow the manual instructions');
console.log('3. Test: http://157.10.73.52:8080/api/v1/health');