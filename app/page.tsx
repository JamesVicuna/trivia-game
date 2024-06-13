"use client";
import { useEffect, useCallback } from "react";
import { api } from "./services/api";
import { Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchQuestions } from "./redux/features/game/gameSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Options } from "./components/Options";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { status, inProgress } = useAppSelector((state) => state.game);

  const handleNewGame = useCallback(() => {
    dispatch(fetchQuestions()).then(() => router.push("/game"));
  }, [router]);

  if (status === "failed") {
    return <div>Oops there's an error, go back</div>;
  }

  if (status === ("loading" || "idle")) {
    return <CircularProgress />;
  }

  return (
    <>
      <div>
        <div className="flex flex-row gap-4">
          <button className="app-button" onClick={handleNewGame}>
            Play
          </button>
          <Options />
        </div>
        <br />
        <br />
        {inProgress && (
          <Link href="/game">
            <button className="app-button">Continue game...</button>
          </Link>
        )}
      </div>
    </>
  );
}
