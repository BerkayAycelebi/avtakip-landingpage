import { getHomepageData } from "@/lib/data";
import { HomeClient } from "./home-client";

export default async function Home() {
  const data = await getHomepageData();
  
  return <HomeClient data={data} />;
}
