import { useState } from "react";
import { Button, TextField, Text, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export function StudentLogin() {
  const router = useRouter();
  const [examId, setExamId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

  const onJoin = async () => {
    setLoading(true);
    const res = await fetch("/api/create_stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_name: examId,
        metadata: {
          creator_identity: studentId,
          enable_chat: false,
          allow_participation: false,
          role: "student"
        },
      }),
    });
    
    const { auth_token, connection_details: { token } } = await res.json();
    router.push(`/exam?at=${auth_token}&rt=${token}`);
  };

  return (
    <Flex direction="column" gap="2">
      <TextField.Input
        placeholder="Exam ID"
        value={examId}
        onChange={(e) => setExamId(e.target.value)}
      />
      <TextField.Input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <Button 
        disabled={!examId || !studentId || loading}
        onClick={onJoin}
      >
        {loading ? "Connecting..." : "Start Exam"}
      </Button>
    </Flex>
  );
}