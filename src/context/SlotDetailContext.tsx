import { createContext, ReactNode, useState } from "react";

interface SlotDetailContextType {
  id: string | null;
  setId: (id: string | null) => void;
  name: string;
  setName: (name: string) => void;
}

export const SlotDetailContext = createContext<SlotDetailContextType | undefined>(
  undefined
);

export const SlotDetailProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  return (
    <SlotDetailContext.Provider value={{ id, setId, name, setName }}>
      {children}
    </SlotDetailContext.Provider>
  );
};
