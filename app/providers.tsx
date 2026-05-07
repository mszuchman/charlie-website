"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init("phc_rGHG2xhMBy8eJosr4vExuPSGzCQjwjnh4aJkbTGBxZeC", {
      api_host: "https://us.i.posthog.com",
      ui_host: "https://us.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: false,
        maskInputOptions: {},
      },
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
