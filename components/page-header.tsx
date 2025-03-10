"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { LogOut,CreditCard, Repeat2, LayoutDashboard, User, Ghost,Plus } from "lucide-react"; // Icons for buttons
import { useRouter } from "next/navigation";
import Image from "next/image";
import {createClient} from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!);

function PageHeader() {
  const { data: session } = useSession(); // ✅ Fetch session
  const [open, setOpen] = useState(false); // ✅ Track popover state
  const [credits, setCredits] = useState<number | null>(null); 

  const router = useRouter();

  useEffect(()=> {
    async function fetchCredits() {
      if (!session?.user?.email) return;

      const {data, error} = await supabase.from("users").select("credits").eq("email", session.user.email).single();

      if (error){
        console.error("Error fetching credits:", error.message);
        return;
      } else {
        setCredits(data?.credits || 0);
      }
      }

      fetchCredits();
  }, [session?.user?.email]);

  const handleDash = () => {
    router.push("/dashboard");
  };

  const handleBill = () => {
    router.push("/credits");
  };

  

  // ✅ Extract username from email and navigate to profile page
  const handleProfile = () => {
    if (session?.user?.email) {
      const username = session.user.email.split("@")[0];
      router.push(`/${username}`);
    }
  };

  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-black/20 backdrop-blur-md">
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b">
        <div className="flex h-14 items-center justify-between">
        <div className="flex items-center space-x-2">
            {/* Gradient Ghost Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" /> {/* Purple-500 */}
                  <stop offset="50%" stopColor="#EC4899" /> {/* Pink-500 */}
                  <stop offset="100%" stopColor="#EF4444" /> {/* Red-500 */}
                </linearGradient>
              </defs>
              <Ghost width="24" height="24" stroke="url(#gradient)" fill="none" strokeWidth="2" />
            </svg>

            <span className="font-bold text-lg">GHOST NAILS</span>
          </div>
          {session?.user ? (
            <div className="flex items-center gap-4">
              {/* ✅ Show username */}
              <button
      onClick={() => router.push("/credits")}
      className="flex items-center space-x-2 bg-[#181818] text-white px-3 py-1.5 rounded-lg transition hover:bg-[#202020]"
    >
      <span className="text-lg">💸</span>
      <span className="font-medium">{credits !== null ? credits: ".."}</span>
      <Plus className="w-5 h-5" />
    </button>


              {/* ✅ Popover for avatar */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                    <div className="relative p-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg">
                    <img
                      src={session.user.image || "/vercel.svg"}
                      alt="User Avatar"
                      className="w-full h-full object-cover border-2 border-black rounded-full"
                    /></div>
                  </button>
                </PopoverTrigger>

                {/* ✅ Popover Content */}
                <PopoverContent className="w-48 shadow-lg p-2 bg-black text-white rounded-lg border">
                  {/* ✅ Profile Button */}
                  <div className="text-gray-300 text-sm ml-2 mb-2">{session.user.name}</div>
  
  {/* ✅ Separator */}
  <Separator className="mb-2 ml-2 mr-2 bg-gray-300" />
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-gray-300"
                    onClick={handleProfile}
                  >
                    Profile <User className="w-5 h-5 text-gray-300" />
                  </Button>

                  {/* ✅ Dashboard Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-gray-300 mt-1"
                    onClick={handleDash}
                  >
                    Dashboard <LayoutDashboard className="w-5 h-5 text-gray-300" />
                  </Button>

                  {/* ✅ Billing Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-gray-300 mt-1"
                    onClick={handleBill}
                  >
                    Buy Credits <CreditCard className="w-5 h-5 text-gray-300" />
                  </Button>

                  {/* ✅ Switch Account Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-gray-300 mt-1"
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/api/auth/signin" });
                    }}
                  >
                    Switch Account <Repeat2 className="w-5 h-5 text-gray-300" />
                  </Button>

                  {/* ✅ Logout Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between mt-1 text-red-500 hover:text-red-500"
                    onClick={() => signOut()}
                  >
                    Logout <LogOut className="w-5 h-5 text-red-500" />
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => signIn("google")}>Get Started</Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default PageHeader;