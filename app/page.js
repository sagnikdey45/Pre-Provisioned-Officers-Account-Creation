"use client";

import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-black flex justify-center items-center h-screen flex-col gap-4">
      <h1 className="text-3xl font-bold text-green-800 dark:text-teal-300">
        Home Page
      </h1>
      <Button variant="outline" onClick={() => router.push("/system-admin")}>
        Go to System Admin Page
      </Button>
      <ModeToggle />
    </div>
  );
};

export default page;
