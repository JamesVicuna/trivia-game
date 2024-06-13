import { AppBar, Button } from '@mui/material'
import React from 'react'
import Link from 'next/link'


export const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        backgroundColor: "#2c3746",
        boxShadow: "none",
        padding: "1rem",
      }}
    >
      <Link href="/">
        <Button>Play</Button>
      </Link>
      <Link href="/record">
        <Button>Record</Button>
      </Link>
    </AppBar>
  )
}
