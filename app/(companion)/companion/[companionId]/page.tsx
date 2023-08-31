import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";
import { checkSubscription } from "@/lib/subscriptions";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
};

const CompanionIdPage = async ({
  params
}: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const validSubscription = await checkSubscription();

  if (!validSubscription) {
    return redirect("/companion/settings");
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    }
  });

  const categories = await prismadb.category.findMany();

  return ( 
    <CompanionForm initialData={companion} categories={categories} />
  );
}
 
export default CompanionIdPage;