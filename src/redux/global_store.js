
import {createStore} from "redux"; 
import rootReducer from "./combinedReducer";

const globalStore = createStore(rootReducer);

export default globalStore;