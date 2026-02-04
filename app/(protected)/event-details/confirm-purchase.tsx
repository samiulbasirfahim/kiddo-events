import { RNLayout } from "@/components/layout/layout";
import CELEBRATE from "@/assets/svgs/celebrate.svg";
import { RNText } from "@/components/ui/text";
import { RNButton } from "@/components/ui/button";
import { router } from "expo-router";

export default function ConfirmPurchaseScreen() {
    return (
        <RNLayout centeredVertically centered includeHeaderHeight>
            <CELEBRATE width={100} height={100} />
            <RNText variant="muted">
                Your ticket for Sunset Yoga & Chill is confirmed.
            </RNText>
            <RNButton
                onPress={() => {
                    router.canGoBack() && router.back();
                }}
                fullWidth
            >
                Back to Events
            </RNButton>
            <RNButton
                onPress={() => {
                    router.dismissTo("/(protected)");
                }}
                variant="outline"
                fullWidth
            >
                Discover More Events
            </RNButton>
        </RNLayout>
    );
}
