"use client";

import type { AppStore } from "@/lib/store";
import { useRef } from "react";
import { makeStore } from "@/lib/store";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    const { store } = makeStore();
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
