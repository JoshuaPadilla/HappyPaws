import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface Pet {
  petID: number;
  petName: string;
  petBreed: string;
  petAge: number;
  petGender: string;
  petSpecie: string;
}

interface State {
  petList: Pet[];
  isLoading: boolean;
}

type Action = { type: "loading" } | { type: "petLoaded"; payload: Pet[] };

const BASE_URL = "http://192.168.101.14:3000";

interface PetsContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const initialState: State = {
  petList: [],
  isLoading: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "petLoaded":
      return { ...state, isLoading: false, petList: action.payload };
    default:
      throw new Error("action is undefined");
  }
}

const PetsContext = createContext<PetsContextType>({
  state: initialState,
  dispatch: () => {},
});

function PetsProvider({ children }: { children?: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { petList, isLoading } = state;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        dispatch({ type: "loading" });
        const data = await fetch(`${BASE_URL}/api/happy-paws/pets`);
        const res = await data.json();

        // Map the data to match the Pet interface
        const mappedPets: Pet[] = res.data.pets.map((pet: any) => ({
          petID: pet.id,
          petName: pet.name,
          petBreed: pet.breed,
          petAge: pet.age,
          petGender: pet.gender,
          petSpecie: pet.specie,
        }));

        dispatch({ type: "petLoaded", payload: mappedPets });
      } catch (err) {
        console.log(err);
      }
    };

    fetchPets();
  }, []);

  const value: PetsContextType = {
    state,
    dispatch,
  };

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
}

function usePets() {
  const context = useContext(PetsContext);
  if (context === undefined)
    throw new Error("Pets Context is used outside Provider");

  return context;
}

export { PetsProvider, usePets };
