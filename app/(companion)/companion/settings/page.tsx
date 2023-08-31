import { checkSubscription } from "@/lib/subscriptions";
import prismadb from "@/lib/prismadb";
import { SubscriptionButton } from "@/components/companion/subscription-button";

export const SettingsPage = async () => {

    const isPro = await checkSubscription();

    return ( 
        <div className="h-full p-4 space-y-2">
            <h3 className="text-lg font-medium">Settings</h3>
            <div className="text-muted-foreground text-sm">
                {isPro ? "You are currently on the Pro plan" : "You are currently on the Free plan"}
            </div>
            <SubscriptionButton isPro={isPro} />
        </div>
    );
}

export default SettingsPage;