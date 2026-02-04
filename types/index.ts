export type PolicySection = {
    title: string;
    subtitle: string;
};

export type PolicyData = {
    title: string;
    date: string;
    data: PolicySection[];
};

export const PRIVACY_POLICY_DATA: PolicyData = {
    title: "Privacy Policy",
    date: "June 10, 2024",
    data: [
        {
            title: "1. Information We Collect",
            subtitle:
                "At KiddoEvents, we value your privacy. We collect basic account information such as name, email, and location to provide event recommendations.",
        },
        {
            title: "2. How We Use Information",
            subtitle:
                "Your data is used solely to enhance your experience. We do not sell your personal information to third parties.",
        },
        {
            title: "3. Child Safety",
            subtitle:
                "Children's profiles are strictly private and only visible to authorized members of your Trusted Circle or event organizers.",
        },
        {
            title: "4. Data Security",
            subtitle:
                "We use industry-standard encryption to protect your data. Payment information is handled through secure providers like Stripe.",
        },
    ],
};

export const TERMS_CONDITION_DATA: PolicyData = {
    title: "Terms and Conditions",
    date: "June 10, 2024",
    data: [
        {
            title: "1. Acceptance of Terms",
            subtitle:
                "By using KiddoEvents, you agree to comply with these terms. The platform is designed for parents and legal guardians.",
        },
        {
            title: "2. User Conduct",
            subtitle:
                "Users are expected to maintain a respectful and safe environment. Any form of harassment or inappropriate content will lead to account termination.",
        },
        {
            title: "3. Ticket Purchases",
            subtitle:
                "All ticket sales are subject to the organizer's refund policy. KiddoEvents serves as a facilitator for event discovery and booking.",
        },
        {
            title: "4. Limitation of Liability",
            subtitle:
                "KiddoEvents is not responsible for incidents occurring during physical events. Users attend events at their own discretion.",
        },
    ],
};
