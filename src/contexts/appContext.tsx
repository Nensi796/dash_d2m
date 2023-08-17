import { IUser } from '@types';
import { ReactNode, useReducer, createContext, Dispatch, Reducer, FC, useMemo } from 'react';

export enum eActionType {
  RESET = 'RESET',
  CURRENT_USER = 'CURRENT_USER',
}

export type TAppContextData = IUser | null;

interface IAppContextState {
  currentUser: IUser;
}

interface IAppContextAction {
  type: eActionType;
  data: TAppContextData;
}

const initialState: IAppContextState = {
  currentUser: {} as IUser,
};

const reducer = (state: IAppContextState, action: IAppContextAction) => {
  const { type, data } = action;

  switch (type) {
    case eActionType.CURRENT_USER:
      return { ...state, currentUser: data as IUser };
    case eActionType.RESET:
      return initialState;
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: IAppContextState;
  dispatch: Dispatch<IAppContextAction>;
}>({
  state: initialState,
  dispatch: () => {
    //
  },
});

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<IAppContextState, IAppContextAction>>(
    reducer,
    initialState,
  );
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };

export default AppContext;
