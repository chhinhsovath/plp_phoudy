#!/bin/bash

# API Testing Script
API_BASE="http://157.10.73.52:8080/api/v1"

echo "🧪 Testing PLP Backend API..."
echo "================================"

# Test health endpoint
echo "1️⃣ Testing health endpoint..."
if curl -s -f "${API_BASE}/health" > /dev/null; then
    echo "✅ Health endpoint working: ${API_BASE}/health"
    curl -s "${API_BASE}/health" | head -1
else
    echo "❌ Health endpoint failed: ${API_BASE}/health"
fi

echo ""

# Test API documentation
echo "2️⃣ Testing API documentation..."
if curl -s -f "${API_BASE}/docs" > /dev/null; then
    echo "✅ API docs working: ${API_BASE}/docs"
else
    echo "❌ API docs failed: ${API_BASE}/docs"
fi

echo ""

# Test base endpoint
echo "3️⃣ Testing base endpoint..."
if curl -s -f "${API_BASE}/" > /dev/null; then
    echo "✅ Base endpoint working: ${API_BASE}/"
    curl -s "${API_BASE}/" | head -1
else
    echo "❌ Base endpoint failed: ${API_BASE}/"
fi

echo ""
echo "📱 Available endpoints:"
echo "   - Health: ${API_BASE}/health"
echo "   - API Docs: ${API_BASE}/docs"
echo "   - Base: ${API_BASE}/"
echo ""
echo "🌐 Open in browser: ${API_BASE}/docs"