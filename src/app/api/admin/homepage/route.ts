import { isAuthenticated } from "@/lib/auth";
import { getHomepageData, saveHomepageData } from "@/lib/data";

export async function GET() {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }
  const data = await getHomepageData();
  return Response.json(data);
}

export async function PUT(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return Response.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const current = await getHomepageData();

    const updated = {
      stats: { ...current.stats, ...body.stats },
      hero: { ...current.hero, ...body.hero },
      features: body.features
        ? { ...current.features, ...body.features }
        : current.features,
      screens: body.screens
        ? { ...current.screens, ...body.screens }
        : current.screens,
      cta: body.cta ? { ...current.cta, ...body.cta } : current.cta,
    };

    await saveHomepageData(updated);
    return Response.json(updated);
  } catch {
    return Response.json({ error: "Geçersiz istek" }, { status: 400 });
  }
}
