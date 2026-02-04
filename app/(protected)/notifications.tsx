import { NotificationCard } from "@/components/common/notification-card";
import { RNLayout } from "@/components/layout/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constant/colors";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

const notificationsData = [
    {
        id: "1",
        title: "Conversation Reminders",
        message:
            "Gentle reminders when you haven't visited a conversation in a while.",
        date: new Date(2026, 0, 29, 9, 0),
    },
    {
        id: "2",
        title: "Premium Subscription Activated",
        message:
            "Your premium subscription has been successfully activated. Enjoy unlimited conversations!",
        date: new Date(2026, 0, 29, 8, 30),
    },
    {
        id: "3",
        title: "Check Your Messages",
        message: "You have 3 unread messages from your AI companions.",
        date: new Date(2026, 0, 28, 22, 15),
    },
    {
        id: "4",
        title: "New Feature Available",
        message:
            "Try our new voice recording feature to have more natural conversations.",
        date: new Date(2026, 0, 28, 18, 45),
    },
    {
        id: "5",
        title: "Daily Reminder",
        message: "Don't forget to chat with Emma today. She's waiting for you!",
        date: new Date(2026, 0, 28, 10, 0),
    },
    {
        id: "6",
        title: "Payment Successful",
        message:
            "Your monthly subscription payment of $9.99 has been processed successfully.",
        date: new Date(2026, 0, 27, 14, 20),
    },
    {
        id: "7",
        title: "Profile Updated",
        message: "Your personality profile has been updated successfully.",
        date: new Date(2026, 0, 27, 11, 30),
    },
    {
        id: "8",
        title: "Weekly Summary Ready",
        message: "Your weekly conversation summary is now available to view.",
        date: new Date(2026, 0, 26, 9, 0),
    },
    {
        id: "9",
        title: "System Maintenance",
        message: "Scheduled maintenance will occur tonight from 2 AM to 4 AM EST.",
        date: new Date(2026, 0, 25, 16, 0),
    },
    {
        id: "10",
        title: "Voice Training Complete",
        message: "Your AI companion has finished training on your voice samples.",
        date: new Date(2026, 0, 25, 12, 45),
    },
    {
        id: "11",
        title: "Subscription Renewal Soon",
        message:
            "Your subscription will renew in 5 days. Update payment method if needed.",
        date: new Date(2026, 0, 24, 10, 0),
    },
    {
        id: "12",
        title: "Privacy Policy Update",
        message: "We've updated our privacy policy. Please review the changes.",
        date: new Date(2026, 0, 23, 15, 30),
    },
    {
        id: "13",
        title: "Missed Conversation",
        message: "You haven't talked to Alex in 3 days. Send a message!",
        date: new Date(2026, 0, 22, 8, 0),
    },
    {
        id: "14",
        title: "New Theme Available",
        message: "Check out our new 'Ocean Breeze' theme in settings.",
        date: new Date(2026, 0, 21, 13, 20),
    },
    {
        id: "15",
        title: "Backup Your Data",
        message:
            "It's been 30 days since your last backup. Consider backing up your conversations.",
        date: new Date(2026, 0, 20, 9, 30),
    },
];

function HeaderSection({ title }: { title: string }) {
    return (
        <View style={sts.sectionHeader}>
            <RNText variant="body">{title}</RNText>
            <View
                style={[
                    sts.sectionLine,
                    {
                        backgroundColor: COLORS.textPrimary + "88",
                    },
                ]}
            />
        </View>
    );
}

export default function NotificationScreen() {
    return (
        <RNLayout includeHeaderHeight>
            <Stack.Screen
                options={{
                    title: "Notifications",
                }}
            />
            <View style={sts.section}>
                <HeaderSection title="Today" />
                {notificationsData.slice(0, 2).map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        title={notification.title}
                        message={notification.message}
                        date={notification.date}
                    />
                ))}
            </View>

            <View style={sts.section}>
                <HeaderSection title="Yesterday" />
                {notificationsData.slice(2, 7).map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        title={notification.title}
                        message={notification.message}
                        date={notification.date}
                    />
                ))}
            </View>
        </RNLayout>
    );
}

const sts = StyleSheet.create({
    section: {
        width: "100%",
    },

    sectionHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    sectionLine: {
        flex: 1,
        flexDirection: "row",
        height: 1,
        marginLeft: 8,
        borderRadius: 3,
    },
});
