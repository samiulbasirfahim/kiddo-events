import { RNLayout } from "@/components/layout/layout";
import { RNButton } from "@/components/ui/button";
import { RNInput } from "@/components/ui/input";
import { Link } from "expo-router";
import { Clock, Eye } from "lucide-react-native";

export default function ProtectedScreen() {
    return (
        <RNLayout includeHeaderHeight>
            <Link asChild href={"/(protected)/event-details"} push>
                <RNButton fullWidth variant="accent">
                    Event Details Page
                </RNButton>
            </Link>

            <Link asChild href={"/(protected)/chats"} push>
                <RNButton fullWidth variant="accent">
                    Chat Screen
                </RNButton>
            </Link>

            <Link asChild href={"/(protected)/modal"} push>
                <RNButton fullWidth variant="accent">
                    MODAL
                </RNButton>
            </Link>

            <Link asChild href={"/(protected)/notifications"} push>
                <RNButton variant="accent" fullWidth>
                    NOTIFICATIONS
                </RNButton>
            </Link>
            <RNInput leftIcon={Clock} secureTextEntry label="Password" />
        </RNLayout>
    );
}
