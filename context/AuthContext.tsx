'use client'

//REACT
import { createContext, useReducer, type FC, useEffect } from 'react';
// TYPES
import { type AuthReducerInitialState, AuthActionTypes, type AuthReducerActionsType, type AuthReducerState } from '@/types/AuthContextTypes';
// UTILS
import { firebaseAuth, firestore } from '@/utils/firebase';

export const AuthContext = createContext<AuthReducerState | undefined | null>(null);

const initialState: AuthReducerInitialState = {
  user: null,
  authStateHasChanged: false,
  userProgress: null,
}

const reducer = (state: AuthReducerInitialState, action: AuthReducerActionsType): AuthReducerInitialState => {
  switch(action.type){
    case AuthActionTypes.SIGN_IN_SUCCESS:
    case AuthActionTypes.SIGN_UP_SUCCESS:
    case AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS:
      return { ...state, user:action.payload }
    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, user: null }
    case AuthActionTypes.FETCH_USER_PROGRESS:
      return { ...state, userProgress: action.payload }
    default: 
      return { ...state }
  }
}

export const AuthContextProvider: FC<{children: React.ReactNode}> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      if(user) {
        dispatch({ type: AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS, payload: user })

        firestore.collection('progression').doc(user.uid)
          .onSnapshot((snapshot) => {
            dispatch({ type: AuthActionTypes.FETCH_USER_PROGRESS, payload: snapshot.data() })
          })
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