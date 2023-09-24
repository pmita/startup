'use client'
import { createContext, useReducer, type FC, useEffect, useState } from 'react';
import { type AuthReducerInitialState, AuthActionTypes, type AuthReducerActionsType, type AuthReducerState } from '@/types/AuthContextTypes';
import { auth } from '@/utils/firebase';

export const AuthContext = createContext<AuthReducerState | undefined | null>(null);

const initialState: AuthReducerInitialState = {
  user: null,
  authStateHasChanged: false,
}

const reducer = (state: AuthReducerInitialState, action: AuthReducerActionsType): AuthReducerInitialState => {
  switch(action.type){
    case AuthActionTypes.SIGN_IN_PENDING:
    case AuthActionTypes.AUTH_HAS_CHANGED_PENDING:
      return { ...state, user: null }
    case AuthActionTypes.SING_IN_FAILED:
    case AuthActionTypes.AUTH_HAS_CHANGED_FAILED:
      return { ...state, user: null }
    case AuthActionTypes.SIGN_IN_SUCCESS:
    case AuthActionTypes.SIGN_UP_SUCCESS:
    case AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS:
      return { ...state, user:action.payload }
    case AuthActionTypes.SING_IN_RESET:
    case AuthActionTypes.AUTH_HAS_CHANGED_RESET:
      return { ...state }
    default: 
      return { ...state }
  }
}

export const AuthContextProvider: FC<{children: React.ReactNode}> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        dispatch({ type: AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS, payload: user })
      } else {
        dispatch({ type: AuthActionTypes.AUTH_HAS_CHANGED_FAILED, payload: 'Something went wrong' })
      }
    })

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};