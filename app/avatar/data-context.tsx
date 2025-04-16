import { createContext, useContext, useEffect, useState } from "react";
import { AvatarInstruction, AvatarParent } from "../shared/models/avatar.models";
import { getAllData } from "../shared/services/avatar.service";

interface IDataContext {
    selectedParent: AvatarParent;
    selectedInstructions: AvatarInstruction[];
    fetchRandomAvoidId: () => void;
}

const DataContext = createContext<IDataContext>({
    selectedParent: {} as AvatarParent,
    selectedInstructions: [],
    fetchRandomAvoidId: () => {}
});

//Custom hook
export const useData = () => useContext(DataContext);

type AppProviderProps = {
    children: React.ReactNode;
};

function DataProvider({ children }: AppProviderProps) {
    const [selectedParent, setSelectedParent] = useState<AvatarParent>({} as AvatarParent);
    const [selectedInstructions, setSelectedInstructions] = useState<AvatarInstruction[]>([]);

    const [allParents, setAllParents] = useState<AvatarParent[]>([]);
    const [allInstructions, setAllInstructions] = useState<AvatarInstruction[]>([]);

    const fetchRandomAvoidId = (avoidId?: number) => {
        if (allParents?.length > 0) {
            let allowed = allParents;
            if (!!avoidId) {
                allowed = allParents.filter(item => item.Id !== avoidId && item.IsActive === true);
            }
            const randomIndex = Math.floor(Math.random() * allowed.length);
            setSelectedParent({...selectedParent, ...allowed[randomIndex]});
        }
    };

    useEffect(() => {
        getAllData().then((response: [AvatarParent[], AvatarInstruction[]]) => {
            if (response?.length > 1) {
                setAllParents([...allParents, ...response[0]]);
                setAllInstructions([...allInstructions, ...response[1]]);
            }
        });
    }, []);


    useEffect(() => {
        if (!!selectedParent?.Id) {
            const avInstruction = allInstructions.filter(data => data.AvatarId === selectedParent.Id);
            setSelectedInstructions([...selectedInstructions, ...avInstruction]);
        }
    }, [selectedParent]);

    useEffect(() => {
        fetchRandomAvoidId();
    }, [allParents, allInstructions]);

    return (
        <DataContext.Provider value={{
            selectedParent,
            selectedInstructions,
            fetchRandomAvoidId
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;