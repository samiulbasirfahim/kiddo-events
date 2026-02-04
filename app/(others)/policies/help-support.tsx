import { GradientBackground } from "@/components/common/gradient";
import { RNHelpButton } from "@/components/common/help-button";
import { RNLayout } from "@/components/layout/layout";
import FAQAccordion from "@/components/ui/accordian";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { Stack } from "expo-router";
import {
    CircleQuestionMark,
    MailPlus,
    MessageCircle,
    Phone,
} from "lucide-react-native";
import { Linking, StyleSheet, View } from "react-native";

const FAQS = [
    {
        id: "1",
        title: "How to book an event?",
        content:
            "Open the app, select your event, and follow checkout steps.Open the app, select your event, and follow checkout steps.Open the app, select your event, and follow checkout steps.Open the app, select your event, and follow checkout steps.Open the app, select your event, and follow checkout steps.Open the app, select your event, and follow checkout steps.Open the app, select your event, and follow checkout steps.Open the app, select your event, and follow checkout steps.Open the app, select your event, and follow checkout steps.",
    },
    {
        id: "2",
        title: "Can I cancel a ticket?",
        content: "Yes, you can cancel a ticket within 20 minutes.",
    },
    {
        id: "3",
        title: "How to create a private group?",
        content: "Go to Groups → Create Group → Select Private.",
    },
];

export default function HelpSupportScreen() {
    const handleLinkOpen = async (type: "email" | "phone") => {
        const email = "support@gmail.com";
        const phone = "+8801712345678";

        try {
            await Linking.openURL(
                type === "email" ? `mailto:${email}` : `tel:${phone}`,
            );
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    return (
        <RNLayout includeHeaderHeight>
            <Stack.Screen options={{ title: "Help & Support" }} />

            <GradientBackground>
                <CircleQuestionMark size={38} color={COLORS.border} opacity={0.9} />
                <RNText style={sts.gradientTitle}>How can we help?</RNText>
                <RNText style={sts.gradientSec}>
                    Our support team is available 24/7 to assist you.
                </RNText>
            </GradientBackground>

            <RNText variant="subLabel">Contact Us</RNText>
            <View style={sts.btnContainer}>
                <RNHelpButton
                    title="Chats"
                    onPress={() => { }}
                    icon={MessageCircle}
                    color="#4F46E5"
                />

                <RNHelpButton
                    title="Email"
                    onPress={() => handleLinkOpen("email")}
                    icon={MailPlus}
                    color="#159D72"
                />

                <RNHelpButton
                    title="Call"
                    onPress={() => handleLinkOpen("phone")}
                    icon={Phone}
                    color="#DB2878"
                />
            </View>

            <RNText variant="subLabel">Popular FAQs</RNText>
            <FAQAccordion data={FAQS} />
        </RNLayout>
    );
}

const sts = StyleSheet.create({
    btnContainer: {
        gap: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    gradientTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: COLORS.background,
        marginTop: 12,
    },
    gradientSec: {
        color: COLORS.backgroundSecondary,
        marginTop: 4,
    },
});
