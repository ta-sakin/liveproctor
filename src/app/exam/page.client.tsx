"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { Box } from "@radix-ui/themes";
import { useEffect } from "react";

export default function ExamPageImpl({
  authToken,
  roomToken,
  serverUrl,
}: {
  authToken: string;
  roomToken: string;
  serverUrl: string;
}) {
  useEffect(() => {
    // Request screen share immediately
    const startSharing = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        await navigator.mediaDevices.getDisplayMedia({ video: true });
      } catch (e) {
        console.error("Failed to get media devices:", e);
      }
    };
    startSharing();
  }, []);

  return (
    <LiveKitRoom serverUrl={serverUrl} token={roomToken} connect={true}>
      <Box className="min-h-screen bg-white">
        <Box className="p-4 text-center text-sm text-gray-500">
          Exam in progress - Please focus on your test
        </Box>
      </Box>
    </LiveKitRoom>
  );
}