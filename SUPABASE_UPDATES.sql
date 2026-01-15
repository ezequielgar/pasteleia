-- Create Expenses Table
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category TEXT DEFAULT 'general',
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Expenses
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Expenses: Authenticated users (admins) can do everything
CREATE POLICY "Authenticated users can manage expenses"
  ON expenses FOR ALL
  USING (auth.role() = 'authenticated');

-- Create Recipes Table
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  ingredients TEXT NOT NULL, -- Storing as multiline text for simplicity
  instructions TEXT NOT NULL, -- Storing as multiline text for simplicity
  yield TEXT, -- e.g., "1 cake" or "12 cookies"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Recipes
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Recipes: Authenticated users (admins) can do everything
CREATE POLICY "Authenticated users can manage recipes"
  ON recipes FOR ALL
  USING (auth.role() = 'authenticated');
