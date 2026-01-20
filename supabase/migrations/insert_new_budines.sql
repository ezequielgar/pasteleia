-- Insert New Budines: Limón and Chocolate con Glasé

INSERT INTO products (name, description, price, stock, active, category, image_url)
VALUES 
(
  'Budín de Limón',
  'Budín húmedo con un toque cítrico de limón. Ideal para acompañar el mate o el café.',
  5500,
  10,
  true,
  'budines',
  '/images/budin limon.png'
),
(
  'Budín de Chocolate con Glasé',
  'Exquisito budín de chocolate bañado con un suave glasé. La combinación perfecta.',
  5500,
  10,
  true,
  'budines',
  '/images/budin chocolate.png'
);
