import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id, categories } = req.query;

  if (req.method === 'GET') {
    if (id) {
      // Fetch a single product by ID, including quantities
      try {
        const product = await prisma.product.findUnique({
          where: { id: Number(id) },
          include: {
            quantities: true, // Assuming the relation is named "quantities"
          },
        });
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: 'Failed to fetch product' });
      }
    } else if (categories) {
      // Fetch products by categories
      try {
        const categoryArray = categories.split(',');
        const products = await prisma.product.findMany({
          where: {
            OR: categoryArray.map(category => ({ category })),
          },
          include: {
            user: true,
            quantities: true, // Assuming the relation is named "quantities"
          },
        });
        res.status(200).json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
    } else {
      // Fetch all products
      try {
        const products = await prisma.product.findMany({
          include: {
            user: true,
            quantity: true, // Assuming the relation is named "quantities"
          },
        });
        res.status(200).json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
