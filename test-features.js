// Test script to verify core functionality
console.log('🧪 Testing Bond Studio Features...')

// Test 1: Check if loyalty settings page loads
async function testLoyaltySettings() {
  try {
    const response = await fetch('http://localhost:3000/loyalty-settings')
    console.log('✅ Loyalty Settings Page:', response.status === 200 ? 'LOADING' : 'FAILED')
    return response.status === 200
  } catch (error) {
    console.log('❌ Loyalty Settings Error:', error.message)
    return false
  }
}

// Test 2: Check if customer check-in page loads
async function testCustomerCheckin() {
  try {
    const response = await fetch('http://localhost:3000/c/test')
    console.log('✅ Customer Check-in Page:', response.status === 200 ? 'LOADING' : 'FAILED')
    return response.status === 200
  } catch (error) {
    console.log('❌ Customer Check-in Error:', error.message)
    return false
  }
}

// Test 3: Check if main page loads
async function testMainPage() {
  try {
    const response = await fetch('http://localhost:3000/')
    console.log('✅ Main Page:', response.status === 200 ? 'LOADING' : 'FAILED')
    return response.status === 200
  } catch (error) {
    console.log('❌ Main Page Error:', error.message)
    return false
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Feature Tests...')
  
  const results = await Promise.all([
    testMainPage(),
    testLoyaltySettings(),
    testCustomerCheckin()
  ])
  
  const passed = results.filter(Boolean).length
  const total = results.length
  
  console.log(`\n📊 Test Results: ${passed}/${total} passed`)
  
  if (passed === total) {
    console.log('🎉 All tests passed! Features are working correctly.')
  } else {
    console.log('⚠️  Some tests failed. Check the console for details.')
  }
}

// Run tests if this script is executed
if (typeof window !== 'undefined') {
  runTests()
} else {
  console.log('This test script should be run in a browser environment.')
}

