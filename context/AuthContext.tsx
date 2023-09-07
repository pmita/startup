'use client'
import { createContext, useReducer, type FC } from 'react';
import { type AuthReducerInitialState, AuthActionTypes, type AuthReducerActionsType, type AuthReducerState } from '@/types/AuthContextTypes';

export const AuthContext = createContext<AuthReducerState | undefined | null>(null);

const initialState: AuthReducerInitialState = {
  user: null,
  isLoading: false,
  error: null,
  authStateHasChanged: false,
}

const reducer = (state: AuthReducerInitialState, action: AuthReducerActionsType): AuthReducerInitialState => {
  switch(action.type){
    case AuthActionTypes.SIGN_IN_PENDING:
    case AuthActionTypes.SIGN_UP_PENDING:
      return { ...state, isLoading: true, error: null, user: null }
    case AuthActionTypes.SING_IN_FAILED:
    case AuthActionTypes.SIGN_UP_FAILED:
      return { ...state, isLoading: false, error: action.payload, user: null }
    case AuthActionTypes.SIGN_IN_SUCCESS:
    case AuthActionTypes.SIGN_UP_SUCCESS:
      return { ...state, user:action.payload, error: null }
    case AuthActionTypes.SING_IN_RESET:
    case AuthActionTypes.SIGN_UP_RESET:
      return { ...state, isLoading: false, error: null }
    default: 
      return { ...state }
  }
}

export const AuthContextProvider: FC<{children: React.ReactNode}> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};