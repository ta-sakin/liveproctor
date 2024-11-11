import { Container, Flex, Text } from "@radix-ui/themes";
import { ProctorLogin } from "@/components/proctor-login";
import { StudentLogin } from "@/components/student-login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <Container size="1">
        <Flex direction="column" align="center" gap="5">
          <Text size="2" className="text-center text-gray-500">
            Exam Session Authentication
          </Text>
          <Flex direction="column" gap="4" className="w-full max-w-[400px]">
            <StudentLogin />
            <ProctorLogin />
          </Flex>
        </Flex>
      </Container>
    </main>
  );
}