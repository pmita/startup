'use client'

//REACT
import { createContext, useReducer, type FC, useEffect } from 'react';
// TYPES
import { type AuthReducerInitialState, AuthActionTypes, type AuthReducerActionsType, type AuthReducerState } from '@/types/AuthContextTypes';
// UTILS
import { firebaseAuth, firestore } from '@/utils/firebase';
// TYPES
import { fromMillis } from '@/utils/firebase';

export const AuthContext = createContext<AuthReducerState | undefined | null>(null);

const initialState: AuthReducerInitialState = {
  user: null,
  authStateHasChanged: false,
  userProgress: null,
  expires: null,
  isPro: false,
  proStatus: null,
}

const reducer = (state: AuthReducerInitialState, action: AuthReducerActionsType): AuthReducerInitialState => {
  switch(action.type){
    case AuthActionTypes.SIGN_IN_SUCCESS:
    case AuthActionTypes.SIGN_UP_SUCCESS:
    case AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS:
      return { ...state, user:action.payload }
    case AuthActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, user: null, isPro: false, proStatus: null, expires: null}
    case AuthActionTypes.FETCH_USER_PROGRESS:
      return { ...state, userProgress: action.payload }
    case AuthActionTypes.FETCH_USER_STATUS:
      return { ...state, proStatus: action.payload?.proStatus || null, isPro: action.payload?.isPro || false, expires: action.payload?.expires || null }
    default: 
      return { ...state }
  }
}

export const AuthContextProvider: FC<{children: React.ReactNode}> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(fromMillis(state.expires));
  console.log(new Date().getTime());

  useEffect(() => {
    let unsubscribeProgress: () => void;
    let unsubscribeStatus: () => void;
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      if(user) {
        dispatch({ type: AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS, payload: user })

        unsubscribeProgress = firestore.collection('progression').doc(user.uid)
          .onSnapshot((snapshot) => {
            dispatch({ type: AuthActionTypes.FETCH_USER_PROGRESS, payload: snapshot.data() })
          })

        unsubscribeStatus = firestore.collection('users').doc(user.uid)
          .onSnapshot((snapshot) => {
            const docs = {
              ...snapshot.data(),
              expires: snapshot.data()?.expires ? snapshot.data()?.expires.toMillis() : null,
            }
            dispatch({ type: AuthActionTypes.FETCH_USER_STATUS, payload: docs })
          })
      } else {
        unsubscribeProgress && unsubscribeProgress();
        unsubscribeStatus && unsubscribeStatus();
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