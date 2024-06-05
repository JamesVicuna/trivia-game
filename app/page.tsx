"use client";
import { useEffect } from "react";
import { api } from "./services/api";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {


  const handleNewGame = () => {

  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-pink-300">
        <Link href="/game">
        <button
          className="h-10 w-16 rounded-xl border-2 border-green-400 bg-white"
          onClick={handleNewGame}
        >
          Play
        </button>
        
        </Link>
      </div>
    </>
  );
}
