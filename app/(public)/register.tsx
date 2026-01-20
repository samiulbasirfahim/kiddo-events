import { RNLayout } from "@/components/layout/layout";
import { Link } from "expo-router";

export default function LoginScreen() {
    return (
        <RNLayout>
            <Link href={"/login"}>Login</Link>
        </RNLayout>
    );
}
