import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface IInteractContext {
    interacted: boolean;
    setInteracted: Dispatch<SetStateAction<boolean>>;
}

const InteractContext = createContext<IInteractContext>({
    interacted: false,
    setInteracted: () => {}
});

//Custom hook
export const useInteract = () => useContext(InteractContext);

type AppProviderProps = {
    children: React.ReactNode;
};

function Interaction({ children }: AppProviderProps) {
    const [interacted, setInteracted] = useState(false);

    return (
        <InteractContext.Provider value={{ interacted, setInteracted }}>
            {children}
        </InteractContext.Provider>
    );
}

export default Interaction;