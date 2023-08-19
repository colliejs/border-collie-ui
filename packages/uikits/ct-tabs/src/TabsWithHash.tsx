import { useEventListener, useExclusive, useMount } from "@c3/react";
import React from "react";
import { useCallback } from "react";
import { TabItemType, BaseTabs, TabProps } from "./BaseTabs";

export type Id = { id: string | number };
type TabsWithHashProps<T extends TabItemType> = TabProps<T> & {
  updateData: (data: T[]) => void;
};
export const TabsWithHash = <T extends TabItemType>(
  props: TabsWithHashProps<T>
) => {
  const { data, updateData } = props;
  const on = useExclusive(data, "active", updateData);

  const switchToHash = useCallback(() => {
    const hash = window.location.hash;
    if (hash) {
      on(hash.slice(1));
    }
  }, [on]);

  useEventListener(window, "hashchange", switchToHash);
  useMount(switchToHash);

  return <BaseTabs {...props} />;
};
