-- Update RLS policies to allow public order creation
-- This allows customers to create orders without authentication

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can manage orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can manage order items" ON order_items;

-- Orders: Public can insert (create new orders)
CREATE POLICY "Public can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Orders: Public can read their own orders (optional, for future order tracking)
CREATE POLICY "Public can view orders"
  ON orders FOR SELECT
  USING (true);

-- Orders: Authenticated users can update and delete
CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete orders"
  ON orders FOR DELETE
  USING (auth.role() = 'authenticated');

-- Order Items: Public can insert (create order items)
CREATE POLICY "Public can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- Order Items: Public can read order items
CREATE POLICY "Public can view order items"
  ON order_items FOR SELECT
  USING (true);

-- Order Items: Authenticated users can update and delete
CREATE POLICY "Authenticated users can update order items"
  ON order_items FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete order items"
  ON order_items FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create RPC function to decrement stock (if not exists)
CREATE OR REPLACE FUNCTION decrement_stock(
  product_id UUID,
  quantity_to_decrement INTEGER
)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET stock = stock - quantity_to_decrement
  WHERE id = product_id AND stock >= quantity_to_decrement;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock for product %', product_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION decrement_stock TO public;
