import { createContext, useReducer } from "react";

export const AppContext = createContext({
    page: "/",
    isAuth: false,
    userToken: "",
});

const appReducer = (state, action) => {
    switch (action.type) {
        case "SET_PAGE":
            return {
                ...state,
                page: action.payload,
            };
        case "SET_USER":
            return {
                ...state,
                isAuth: true,
                userToken: action.payload,
            };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, {
        user: null,
    });
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
