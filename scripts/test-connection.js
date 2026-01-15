/**
 * Test Supabase connection
 * Run with: node scripts/test-connection.js
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...\n')

// Check environment variables
console.log('1️⃣ Checking environment variables...')
if (!supabaseUrl) {
    console.error('   ❌ NEXT_PUBLIC_SUPABASE_URL is not set')
    process.exit(1)
}
if (!supabaseKey) {
    console.error('   ❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set')
    process.exit(1)
}
console.log('   ✅ Environment variables are set')
console.log(`   📍 URL: ${supabaseUrl}\n`)

// Create Supabase client
console.log('2️⃣ Creating Supabase client...')
const supabase = createClient(supabaseUrl, supabaseKey)
console.log('   ✅ Client created\n')

// Test database connection
console.log('3️⃣ Testing database connection...')
async function testConnection() {
    try {
        // Try to fetch from products table
        const { data, error } = await supabase
            .from('products')
            .select('count')
            .limit(1)

        if (error) {
            if (error.code === '42P01') {
                console.log('   ⚠️  Products table does not exist yet')
                console.log('   💡 You need to create the database schema in Supabase Dashboard')
                console.log('   📖 Refer to the implementation plan for SQL scripts\n')
                return false
            }
            throw error
        }

        console.log('   ✅ Successfully connected to database')
        console.log('   ✅ Products table exists\n')

        // Get product count
        const { count, error: countError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })

        if (countError) {
            console.log('   ⚠️  Could not get product count:', countError.message)
        } else {
            console.log(`   📊 Products in database: ${count}\n`)
        }

        return true
    } catch (error) {
        console.error('   ❌ Connection failed:', error.message)
        return false
    }
}

// Test storage
async function testStorage() {
    console.log('4️⃣ Testing storage bucket...')
    try {
        const { data, error } = await supabase.storage.getBucket('product-images')

        if (error) {
            if (error.message.includes('not found')) {
                console.log('   ⚠️  Storage bucket "product-images" does not exist')
                console.log('   💡 Create it in Supabase Dashboard → Storage\n')
                return false
            }
            throw error
        }

        console.log('   ✅ Storage bucket "product-images" exists')
        console.log(`   🔓 Public: ${data.public}\n`)
        return true
    } catch (error) {
        console.error('   ❌ Storage test failed:', error.message)
        return false
    }
}

// Run tests
async function runTests() {
    const dbConnected = await testConnection()
    const storageExists = await testStorage()

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📋 Test Summary:')
    console.log(`   Database: ${dbConnected ? '✅ Connected' : '❌ Not connected'}`)
    console.log(`   Storage:  ${storageExists ? '✅ Ready' : '⚠️  Not configured'}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (!dbConnected) {
        console.log('📝 Next steps:')
        console.log('   1. Go to your Supabase project dashboard')
        console.log('   2. Navigate to SQL Editor')
        console.log('   3. Run the database schema scripts from implementation_plan.md')
        console.log('   4. Run this test again\n')
    } else if (!storageExists) {
        console.log('📝 Next steps:')
        console.log('   1. Go to your Supabase project dashboard')
        console.log('   2. Navigate to Storage')
        console.log('   3. Create a new bucket named "product-images"')
        console.log('   4. Make it public\n')
    } else {
        console.log('🎉 Everything is configured correctly!')
        console.log('   You can now run: node scripts/seed-products.js\n')
    }
}

runTests()
