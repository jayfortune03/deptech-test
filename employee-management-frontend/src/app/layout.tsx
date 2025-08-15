"use client";

import React from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
