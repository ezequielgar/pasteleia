/**
 * Seed script to populate initial product data
 * Run with: node scripts/seed-products.js
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

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const sampleProducts = [
    {
        name: 'Tarta Marmolada',
        description: 'Deliciosa tarta con efecto marmolado de chocolate y vainilla. Perfecta para cualquier ocasión.',
        price: 8500,
        stock: 5,
        active: true,
        category: 'tartas',
        image_url: '/images/products/tarta-marmolada.jpg',
    },
    {
        name: 'Budín de Limón',
        description: 'Budín húmedo con un toque cítrico de limón. Ideal para acompañar el mate o el café.',
        price: 5500,
        stock: 10,
        active: true,
        category: 'budines',
        image_url: '/images/products/budin-limon.jpg',
    },
    {
        name: 'Tarta de Chocolate',
        description: 'Tarta de chocolate intenso con cobertura de ganache. Un clásico irresistible.',
        price: 9000,
        stock: 3,
        active: true,
        category: 'tartas',
        image_url: '/images/products/tarta-chocolate.jpg',
    },
    {
        name: 'Cookies de Chips de Chocolate',
        description: 'Galletas crujientes por fuera y suaves por dentro, repletas de chips de chocolate.',
        price: 3500,
        stock: 20,
        active: true,
        category: 'cookies',
        image_url: '/images/products/cookies-chocolate.jpg',
    },
    {
        name: 'Budín Inglés',
        description: 'Budín tradicional con frutas secas y un toque de ron. Perfecto para compartir.',
        price: 6500,
        stock: 8,
        active: true,
        category: 'budines',
        image_url: '/images/products/budin-ingles.jpg',
    },
    {
        name: 'Tarta de Frutilla',
        description: 'Tarta con crema pastelera y frutillas frescas. Dulzura y frescura en cada bocado.',
        price: 9500,
        stock: 4,
        active: true,
        category: 'tartas',
        image_url: '/images/products/tarta-frutilla.jpg',
    },
    {
        name: 'Cookies de Avena y Pasas',
        description: 'Galletas saludables de avena con pasas de uva. Energía natural para tu día.',
        price: 3000,
        stock: 15,
        active: true,
        category: 'cookies',
        image_url: '/images/products/cookies-avena.jpg',
    },
    {
        name: 'Budín de Banana',
        description: 'Budín húmedo de banana con nueces. Un clásico que nunca falla.',
        price: 5000,
        stock: 12,
        active: true,
        category: 'budines',
        image_url: '/images/products/budin-banana.jpg',
    },
    {
        name: 'Budín de Avena',
        description: 'Delicioso y saludable budín de avena. Ideal para un desayuno nutritivo.',
        price: 5500,
        stock: 10,
        active: true,
        category: 'budines',
        image_url: '/images/budin de avena.jpeg',
    },
    {
        name: 'Budín de Chips de Chocolate',
        description: 'Budín esponjoso repleto de chips de chocolate. El favorito de los dulceros.',
        price: 5500,
        stock: 10,
        active: true,
        category: 'budines',
        image_url: '/images/budin chips choco.jpeg',
    },
]

async function seedProducts() {
    console.log('🌱 Starting product seeding...\n')

    try {
        // Check if products already exist
        const { data: existingProducts, error: checkError } = await supabase
            .from('products')
            .select('id')
            .limit(1)

        if (checkError) {
            throw new Error(`Error checking existing products: ${checkError.message}`)
        }

        if (existingProducts && existingProducts.length > 0) {
            console.log('⚠️  Products already exist in the database.')
            console.log('   Do you want to continue and add more products? (This will not delete existing ones)')
            console.log('   Press Ctrl+C to cancel or wait 5 seconds to continue...\n')

            await new Promise(resolve => setTimeout(resolve, 5000))
        }

        // Insert products
        console.log(`📦 Inserting ${sampleProducts.length} products...\n`)

        for (const product of sampleProducts) {
            const { data, error } = await supabase
                .from('products')
                .insert([product])
                .select()
                .single()

            if (error) {
                console.error(`❌ Error inserting ${product.name}:`, error.message)
            } else {
                console.log(`✅ ${product.name} - $${product.price} (Stock: ${product.stock})`)
            }
        }

        console.log('\n🎉 Seeding completed successfully!')
        console.log('\n📊 Summary:')

        const { count, error: countError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })

        if (!countError) {
            console.log(`   Total products in database: ${count}`)
        }

    } catch (error) {
        console.error('\n❌ Seeding failed:', error.message)
        process.exit(1)
    }
}

// Run the seed function
seedProducts()
