import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const passwordHash = await bcrypt.hash("12345", 10);

  // 1. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: "differentiate.function@gmail.com" },
    update: {},
    create: {
      email: "differentiate.function@gmail.com",
      password: passwordHash,
      name: "Av Takip Admin",
    },
  });

  console.log("Admin user created/verified.");

  // 2. Create Default Category
  const defaultCategory = await prisma.category.upsert({
    where: { slug: "genel" },
    update: {},
    create: {
      name: "Genel",
      slug: "genel",
    },
  });

  console.log("Default category created.");

  // 3. Seed Posts
  const blogFilePath = path.join(process.cwd(), "src", "lib", "blog-data.json");
  if (fs.existsSync(blogFilePath)) {
    const fileContents = fs.readFileSync(blogFilePath, "utf8");
    const posts = JSON.parse(fileContents);

    for (const post of posts) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          date: post.date,
          readTime: post.readTime,
          categoryId: defaultCategory.id,
        },
        create: {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          date: post.date,
          readTime: post.readTime,
          categoryId: defaultCategory.id,
        },
      });
    }
    console.log("Blog posts seeded.");
  }

  // 4. Seed Homepage Data
  const dataFilePath = path.join(process.cwd(), "src", "lib", "data.json");
  if (fs.existsSync(dataFilePath)) {
    const fileContents = fs.readFileSync(dataFilePath, "utf8");
    const homepageData = JSON.parse(fileContents);

    // We can store the entire object in a single setting, or flatten it.
    // For simplicity, we store the entire JSON object under the key "homepage"
    await prisma.setting.upsert({
      where: { key: "homepage" },
      update: { value: JSON.stringify(homepageData) },
      create: {
        key: "homepage",
        value: JSON.stringify(homepageData),
      },
    });
    console.log("Homepage data seeded.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
