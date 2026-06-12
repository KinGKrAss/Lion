#!/bin/bash
# Complete Test Suite for LingoLion

echo "🧪 Running LingoLion Test Suite"
echo ""

# Type check
echo "📝 Type checking..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ TypeScript check passed"
else
    echo "❌ TypeScript errors found"
    exit 1
fi
echo ""

# Build check
echo "🔨 Building..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi
echo ""

# API health check
echo "🏥 Checking backend health..."
if [ -z "$(pgrep -f 'node server.ts')" ]; then
    echo "⚠️  Backend not running. Start with: npm run server:dev"
else
    response=$(curl -s http://localhost:5000/api/health)
    if echo "$response" | grep -q 'ok'; then
        echo "✅ Backend healthy"
    else
        echo "❌ Backend error"
        exit 1
    fi
fi
echo ""

echo "🎉 All tests passed!"
