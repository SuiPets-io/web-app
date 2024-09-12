"use client";

import { Button, Text } from "@/components/ui";
import { useDisconnectWallet } from "@/hooks";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: any }) {
  const router = useRouter();
  const { onDisconnect } = useDisconnectWallet();
  
  if (error.response?.data?.status === 11) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-[100vh] w-full">
        <Text variant="d2" className="text-center">
          {error.response?.data?.data}
        </Text>
        <Button onClick={() => router.push("/")}>Go Home</Button>
      </div>
    );
  }

  if (error.response?.status === 400 && error.response?.data?.status === 5) {
    window.location.reload();
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[100vh] w-full">
      <Text variant="d2" className="text-center">
        Oops... Something went wrong {`:((`}
      </Text>
      <Button onClick={() => window.location.reload()}>
        Refresh this page
      </Button>
      <Button variant="secondary" onClick={onDisconnect}>
        Disconnect
      </Button>
    </div>
  );
}
