"use client";

import React, { useState } from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserProfileCard() {
  const { data: session } = useSession();
  const [hover, setHover] = useState(false);

  if (!session || !session.user) {
    return <p>Loading...</p>; // Or a placeholder UI
  }

  const username = session.user.email?.split("@")[0] || "Unknown";
  const userImage = session.user.image ?? undefined; // Ensures it's a string or undefined

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-center max-w-sm mx-auto p-6 relative h-[30rem] rounded-2xl">
        <EvervaultCard text="hover" image={userImage} />

        <h2 className="dark:text-white text-black mt-4 text-xl font-bold">
          {session.user.name}
        </h2>
        <p className="text-sm border font-semibold dark:border-white/[0.2] border-black/[0.2] rounded-full mt-2 text-blue-500 px-2 py-0.5">
          {username}
        </p>
      </div>
    </div>
  );
          }