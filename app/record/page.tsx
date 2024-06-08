"use client";

import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";

import { deleteGame } from "../redux/features/record/recordSlice";

export default function Record() {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.record);
  console.log(history);
  return (
    <>
      <Grid container className="flex justify-center">
        {history.length === 0 ? (
          <Typography>No history - Play some games to show!</Typography>
        ) : (
          <>
            <div>
              {history?.map((game, i) => {
                return (
                  <Grid item key={i}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardContent sx={{ padding: "20px" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          Game {i + 1}
                        </Typography>
                        <Box
                          sx={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Score: {game.score}%
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Time: {game.time}s
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "space-between" }}>
                        <Link href={`/record/${game.id}`} passHref>
                          <Button size="small">Details</Button>
                        </Link>
                        <Button
                          size="small"
                          onClick={() => dispatch(deleteGame(game.id))}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </div>
          </>
        )}
      </Grid>
    </>
  );
}
