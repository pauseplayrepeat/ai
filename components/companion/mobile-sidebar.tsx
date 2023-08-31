import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/companion/sidebar";
import { Menu } from "lucide-react";
import Link from "next/navigation";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useProModal } from "@/hooks/use-pro-modal";

const font = Poppins({
    weight: "600",
    subsets: ["latin"],
})

export const MobileSidebar = ({
    isPro
  }: {
    isPro: boolean | undefined
  }) => {
    return (
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 inline-flex">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
          <Sidebar isPro={isPro} />
        </SheetContent>
      </Sheet>
    );
  };