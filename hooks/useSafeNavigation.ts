import { useTransition, useCallback } from "react";
import { router, Href } from "expo-router";

export function useSafeNavigation() {
    const [isPending, startTransition] = useTransition();

    const safePush = useCallback(
        (to: Href) => {
            if (isPending) return;

            startTransition(() => {
                router.push(to);
            });
        },
        [isPending],
    );

    return {
        safePush,
        isPending,
    };
}
