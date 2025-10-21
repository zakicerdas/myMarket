export const defaultTheme = {mode : "light"};

export function ThemeReducer(state, action){
    switch (action.type) {
        case "toggleButton":
            return {mode: state.mode === "light" ? "dark" : "light"};
        case "setTheme":
            return {mode: action.payload}
        default:
           return state;
    }
}