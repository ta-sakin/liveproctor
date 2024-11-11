"use client";

import { LiveKitRoom, useTracks } from "@livekit/components-react";
import { Box, Grid } from "@radix-ui/themes";
import { Track } from "livekit-client";
import { VideoTrack } from "@livekit/components-react";

function StudentStreams() {
  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare]);

  return (
    <Grid columns="2" gap="2" className="w-full p-4">
      {tracks.map((track) => (
        <Box key={track.sid} className="relative aspect-video bg-gray-100">
          <VideoTrack trackRef={track} />
          <Box className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
            {track.source === Track.Source.ScreenShare ? "Screen" : "Camera"}
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

export default function ProctorPageImpl({
  authToken,
  roomToken,
  serverUrl,
}: {
  authToken: string;
  roomToken: string;
  serverUrl: string;
}) {
  return (
    <LiveKitRoom serverUrl={serverUrl} token={roomToken} connect={true}>
      <Box className="min-h-screen bg-gray-100">
        <Box className="p-4 bg-white shadow-sm">
          <h1 className="text-lg font-semibold">Exam Monitoring</h1>
        </Box>
        <StudentStreams />
      </Box>
    </LiveKitRoom>
  );
}