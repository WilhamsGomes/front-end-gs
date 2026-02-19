import React, { createContext, useState } from "react";
import type { AssetRow } from "../types/asset";

type Mode = "create" | "edit";

interface AssetsContextValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  categoryFilter: string[];
  setCategoryFilter: React.Dispatch<React.SetStateAction<string[]>>;

  statusFilter: string[];
  setStatusFilter: React.Dispatch<React.SetStateAction<string[]>>;

  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;

  editing: AssetRow | null;
  setEditing: React.Dispatch<React.SetStateAction<AssetRow | null>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AssetsContext = createContext({} as AssetsContextValue);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("create");
  const [editing, setEditing] = useState<AssetRow | null>(null);

  return (
    <AssetsContext.Provider
      value={{
        search,
        setSearch,
        categoryFilter,
        setCategoryFilter,
        statusFilter,
        setStatusFilter,
        modalOpen,
        setModalOpen,
        mode,
        setMode,
        editing,
        setEditing,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
}
