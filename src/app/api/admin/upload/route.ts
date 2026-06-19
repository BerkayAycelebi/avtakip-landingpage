import { isAuthenticated } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Rastgele bir dosya adı oluştur
    const extension = path.extname(file.name);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `img-${uniqueSuffix}${extension}`;
    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, filename);

    // public/uploads klasörüne kaydet
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return Response.json({ url: fileUrl }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Yükleme başarısız" }, { status: 500 });
  }
}
