import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      filename: (name, ext, part) => `${Date.now()}_${part.originalFilename}`,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ error: "Error parsing form" });
      }

      console.log("Parsed fields:", fields);
      console.log("Parsed files:", files);

      const name = fields.name?.[0]?.trim();
      const description = fields.description?.[0]?.trim();
      const price = fields.price?.[0]?.trim();
      const category = fields.category?.[0]?.trim();
      const size = fields.size?.[0]?.trim();
      const color = fields.color?.[0]?.trim();
      const imageUrl = files.image ? files.image[0].newFilename : null;

      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !size ||
        !color ||
        !imageUrl
      ) {
        console.error("Missing required fields", {
          name,
          description,
          price,
          category,
          size,
          color,
          imageUrl,
        });
        return res.status(400).json({ error: "Missing required fields" });
      }

      try {
        // Create the product without user relation
        const product = await prisma.product.create({
          data: {
            name,
            description,
            price: parseFloat(price),
            category,
            size,
            color,
            imageUrl: `/uploads/${imageUrl}`,
          },
        });

        console.log("Product created:", product);

        // Handle quantities separately
        const quantities = JSON.parse(fields.quantity?.[0] || "{}");
        for (const [key, value] of Object.entries(quantities)) {
          const [size, color] = key.split("-");
          await prisma.quantity.create({
            data: {
              size: size.trim(),
              color: color.trim(),
              quantity: parseInt(value, 10),
              productId: product.id,
            },
          });
        }

        res.status(201).json(product);
      } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
