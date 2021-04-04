import  { Data, Cat, Rankings } from './data';
import Category from './categories'; 
import Ranking from './rankings'; 
import Leaf from './leafs'; 

const initialState = {
    categories : Cat,
    rankings: Rankings,
    Leafs: Data
};


const reducerCategories = (state = initialState, action) => {
    switch(action.type) {
        case "CHANGECAT":
            return {
                ...state,
                categories: state.categories.map(Cat => Cat.id === action.textid ? 
                    { ...Cat, category: action.text} : 
                    Cat
                )
            };
        
        case "CHANGERANK":
            return {
                ...state,
                rankings: state.rankings.map(Rankings => Rankings.id === action.textid ? 
                    { ...Rankings, rankings: action.text} : 
                    Rankings 
                )
            };

        case "CHANGEITEM":
            return {
                ...state,
                Leafs: state.Leafs.map(Data => Data.id === action.textid ? 
                    { ...Data, name: action.text, points: action.points} : 
                    Data
                )
            };

        case "DELETECAT":
            const existingIndexCat = state.categories.findIndex(Cat => Cat.id === action.textid);
            if (existingIndexCat >= 0) {
                const updatedCat = [...state.categories];
                updatedCat.splice(action.textid, 1);
                return { ...state, categories:updatedCat};
            } else {
                return state; 
            }
            
        case "DELETERANK":
            const existingIndexRank = state.rankings.findIndex(Rankings => Rankings.id === action.textid);
            if (existingIndexRank >= 0) {
                const updatedRank = [...state.rankings];
                updatedRank.splice(action.textid, 1);
                return { ...state, rankings:updatedRank};
            } else {
                return state; 
            }

        case "DELETEITEM":
            const existingIndexItem = state.Leafs.findIndex(Data => Data.id === action.textid);
            if (existingIndexItem >= 0) {
                const updatedItem = [...state.Leafs];
                updatedItem.splice(action.textid, 1);
                return { ...state, Leafs:updatedItem};
            } else {
                return state; 
            }

        case "ADDCAT":
            const existingTextCat = state.categories.filter(Cat => Cat.category === action.text);
            if (existingTextCat.length > 0) {
                return state; 
            } else {
                const newid = state.categories.length;
                return { ...state, categories: state.categories.concat(new Category(newid, action.text))};     
            }

        case "ADDRANK":
            const existingTextRank = state.rankings.filter(Rankings => Rankings.rankings === action.text && Rankings.category === action.cat);
            if (existingTextRank.length > 0) {
                return state; 
            } else {
                const newid = state.rankings.length;
                return { ...state, rankings: state.rankings.concat(new Ranking(newid, action.cat, action.text))};     
            }

        case "ADDITEM":
            const existingTextItem = state.Leafs.filter(Data => Data.name === action.text && Data.category === action.cat && Data.rankings === action.ranking);
            if (existingTextItem.length > 0) {
                return state; 
            } else {
                const newid = state.Leafs.length;
                return { ...state, Leafs: state.Leafs.concat(new Leaf(newid, action.cat, action.ranking, action.text, action.points))};     
            }

        default: 
            return state;
    }
      
}


export default reducerCategories;