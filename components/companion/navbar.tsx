"use client";

import { Menu, Sheet, Sparkles } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import { MobileSidebar } from "./mobile-sidebar";
import { useProModal } from "@/hooks/use-pro-modal";

const font = Poppins({
    weight: "600",
    subsets: ["latin"],
})

interface NavBarProps {
    isPro: boolean | undefined;
}

export const Navbar = ({
    isPro
}: NavBarProps) => {

    const proModal = useProModal();

    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <MobileSidebar isPro={isPro}/>
                <Link href="/dashboard">
                    <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary", font.className)}>
                        companion
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                {!isPro && (
                <Button size="sm" variant="premium" onClick={proModal.onOpen}>
                    Upgrade
                    <Sparkles className="h-4 w-4 fill-white text-white ml-2"/>
                </Button>
                )}
                <ModeToggle />
                <UserButton/>
            </div>
        </div>
    );
}