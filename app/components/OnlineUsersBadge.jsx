"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

let supabase;

function getSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
        console.warn("Supabase env vars missing — live user count disabled.");
        return null;
    }
    return createClient(url, key);
}

export default function OnlineUsersBadge() {
    const [count, setCount] = useState(null);

    useEffect(() => {
        if (!supabase) supabase = getSupabaseClient();
        if (!supabase) return;

        const sessionId =
            typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : Math.random().toString(36).slice(2);

        const channel = supabase.channel("online-users", {
            config: { presence: { key: sessionId } },
        });

        channel
            .on("presence", { event: "sync" }, () => {
                const state = channel.presenceState();
                setCount(Object.keys(state).length);
            })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    await channel.track({ online_at: new Date().toISOString() });
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="ig-live">
            <span className="ig-live-dot" aria-hidden="true" />
            {count === null ? "…" : count.toLocaleString()} online now
        </div>
    );
}