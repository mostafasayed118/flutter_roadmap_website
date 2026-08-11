import { auth } from "@clerk/nextjs/server";
import { ProjectShowcase } from "@/components/features/showcase/ProjectShowcase";

export default async function ShowcasePage() {
  await auth.protect();

  return <ProjectShowcase />;
}
