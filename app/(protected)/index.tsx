import { RNLayout } from "@/components/layout/layout";
import { RNButton } from "@/components/ui/button";
import { Link } from "expo-router";

export default function ProtectedScreen() {
    return (
        <RNLayout>
            <Link asChild href={"/(protected)/event-details"} push>
                <RNButton variant="accent">Event Details Page</RNButton>
            </Link>

            <Link asChild href={"/(protected)/chats"} push>
                <RNButton variant="accent">Chat Push</RNButton>
            </Link>
        </RNLayout>
    );
}
