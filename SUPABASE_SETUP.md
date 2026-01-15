# Supabase Setup Guide

This guide will help you configure Supabase for the Pasteleia web application.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js installed

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: pasteleia (or your preferred name)
   - **Database Password**: Choose a strong password (save it securely)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for setup to complete

## Step 2: Get Your Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Step 3: Configure Environment Variables

1. Open `.env.local` in the project root
2. Update with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_WHATSAPP_NUMBER=5493816485599
```

## Step 4: Create Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the following SQL scripts one by one:

### Create Tables

```sql
-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  category TEXT DEFAULT 'tartas',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  product_name TEXT NOT NULL
);
```

### Enable Row Level Security

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products: Public can read active products
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  USING (active = true);

-- Products: Authenticated users can do everything
CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

-- Orders: Authenticated users can manage
CREATE POLICY "Authenticated users can manage orders"
  ON orders FOR ALL
  USING (auth.role() = 'authenticated');

-- Order Items: Authenticated users can manage
CREATE POLICY "Authenticated users can manage order items"
  ON order_items FOR ALL
  USING (auth.role() = 'authenticated');
```

## Step 5: Create Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Configure the bucket:
   - **Name**: `product-images`
   - **Public bucket**: ✅ Yes
   - Click "Create bucket"
4. Click on the bucket and go to **Policies**
5. Add a policy for public read access:
   - Click "New Policy"
   - Select "For full customization"
   - **Policy name**: Public read access
   - **Allowed operation**: SELECT
   - **Target roles**: public
   - Click "Review" then "Save policy"

## Step 6: Create Admin User

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Fill in:
   - **Email**: your-admin-email@example.com
   - **Password**: Choose a strong password
   - **Auto Confirm User**: ✅ Yes
4. Click "Create user"
5. Save these credentials - you'll use them to log into the admin panel

## Step 7: Test Connection

Run the connection test script:

```bash
npm run db:test
```

This will verify:
- ✅ Environment variables are set
- ✅ Database connection works
- ✅ Tables exist
- ✅ Storage bucket is configured

## Step 8: Seed Sample Data

Once the connection test passes, populate the database with sample products:

```bash
npm run db:seed
```

This will add 8 sample products (tartas, budines, cookies) to your database.

## Verification

1. Go to Supabase Dashboard → **Table Editor**
2. Select the `products` table
3. You should see the seeded products

## Next Steps

- Start the development server: `npm run dev`
- Visit http://localhost:3000 to see the products
- Visit http://localhost:3000/admin/login to access the admin panel
- Use the admin credentials you created in Step 6

## Troubleshooting

### "Products table does not exist"
- Make sure you ran all SQL scripts in Step 4
- Check the SQL Editor for any errors

### "Storage bucket not found"
- Verify you created the `product-images` bucket in Step 5
- Check the bucket name is exactly `product-images`

### "Authentication failed"
- Verify your admin user was created in Step 6
- Check that "Auto Confirm User" was enabled
- Try resetting the password in the Supabase Dashboard

### "Environment variables not set"
- Make sure `.env.local` exists in the project root
- Verify the values are correct (no quotes needed)
- Restart the development server after changing env vars

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
