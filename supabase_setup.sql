-- ============================================
-- Pasteleia Database Setup Script
-- ============================================
-- This script creates all necessary tables, policies, and sample data
-- Execute this in your Supabase SQL Editor

-- ============================================
-- 1. CREATE TABLES
-- ============================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
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
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  product_name TEXT NOT NULL
);

-- ============================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. CREATE RLS POLICIES
-- ============================================

-- Products: Public can view active products
DROP POLICY IF EXISTS "Public can view active products" ON products;
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  USING (active = true);

-- Products: Authenticated users can do everything
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

-- Orders: Authenticated users can manage
DROP POLICY IF EXISTS "Authenticated users can manage orders" ON orders;
CREATE POLICY "Authenticated users can manage orders"
  ON orders FOR ALL
  USING (auth.role() = 'authenticated');

-- Order Items: Authenticated users can manage
DROP POLICY IF EXISTS "Authenticated users can manage order items" ON order_items;
CREATE POLICY "Authenticated users can manage order items"
  ON order_items FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================
-- 4. INSERT SAMPLE PRODUCTS
-- ============================================

INSERT INTO products (name, description, price, stock, active, category, image_url) VALUES
  ('Tarta de Chocolate', 'Deliciosa tarta de chocolate con ganache y decoración artesanal', 2500.00, 5, true, 'tartas', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'),
  ('Tarta de Frutilla', 'Tarta fresca con crema y frutillas de estación', 2200.00, 8, true, 'tartas', 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500'),
  ('Tarta de Limón', 'Tarta de limón con merengue italiano, equilibrio perfecto entre dulce y ácido', 2300.00, 6, true, 'tartas', 'https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=500'),
  ('Budín de Chocolate', 'Budín húmedo de chocolate con chips de chocolate', 1500.00, 10, true, 'budines', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500'),
  ('Budín de Vainilla', 'Budín clásico de vainilla, perfecto para el desayuno o merienda', 1300.00, 12, true, 'budines', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500'),
  ('Cookies de Chips', 'Pack de 6 cookies con chips de chocolate', 800.00, 20, true, 'cookies', 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500'),
  ('Cookies de Avena', 'Pack de 6 cookies de avena con pasas', 750.00, 15, true, 'cookies', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500'),
  ('Alfajores de Maicena', 'Pack de 6 alfajores artesanales de maicena con dulce de leche', 1200.00, 18, true, 'alfajores', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500');

-- ============================================
-- 5. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- ============================================
-- SCRIPT COMPLETED SUCCESSFULLY
-- ============================================
-- You should now have:
-- ✅ 3 tables created (products, orders, order_items)
-- ✅ Row Level Security enabled
-- ✅ Policies configured
-- ✅ 8 sample products inserted
-- ✅ Performance indexes created
