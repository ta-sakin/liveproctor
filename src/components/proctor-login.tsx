import { useState } from "react";
import { Button, TextField, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export function ProctorLogin() {
  const router = useRouter();
  const [examId, setExamId] = useState("");
  const [proctorId, setProctorId] = useState("");
  const [loading, setLoading] = useState(false);

  const onJoin = async () => {
    setLoading(true);
    const res = await fetch("/api/join_stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_name: examId,
        identity: `proctor_${proctorId}`,
      }),
    });
    
    const { auth_token, connection_details: { token } } = await res.json();
    router.push(`/proctor?at=${auth_token}&rt=${token}`);
  };

  return (
    <Flex direction="column" gap="2">
      <TextField.Input
        placeholder="Exam ID"
        value={examId}
        onChange={(e) => setExamId(e.target.value)}
      />
      <TextField.Input
        placeholder="Proctor ID"
        value={proctorId}
        onChange={(e) => setProctorId(e.target.value)}
      />
      <Button 
        variant="outline"
        disabled={!examId || !proctorId || loading}
        onClick={onJoin}
      >
        {loading ? "Connecting..." : "Monitor Exam"}
      </Button>
    </Flex>
  );
}