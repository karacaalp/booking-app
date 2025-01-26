import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface ModalContextType {
  isOpen: boolean;
  onOpen: (callback?: () => void) => void;
  onClose: (callback?: () => void) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<(() => void) | undefined>(undefined);

  const onOpen = useCallback((cb?: () => void) => {
    setCallback(() => cb);
    setIsOpen(true);
  }, []);

  const onClose = useCallback((cb?: () => void) => {
    setCallback(() => cb);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (callback) {
      callback();
      setCallback(undefined);
    }
  }, [isOpen, callback]);

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};
