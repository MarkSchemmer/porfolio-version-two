import { createSlice } from "@reduxjs/toolkit";
import { Deck } from "../../GameApps/SolitaireApp/Deck";

const initialState = {
  deck: new Deck(),
};

export const solSlice = createSlice({
  name: "sol",
  initialState,
  reducers: {
    UpdateDeck: (state, action: { type: string; payload: Deck }) => {
      const deck = new Deck();
      deck.deck = action.payload.deck;
      deck.tableauSets = action.payload.tableauSets;
      deck.ascendingPiles = action.payload.ascendingPiles;
      deck.drawWastePile = action.payload.drawWastePile;
      deck.privateCachePile = action.payload.privateCachePile;

      state.deck = deck;
    },
  },
});

export const { UpdateDeck } = solSlice.actions;

export const getDeck = (state: any) => state.solState.deck;

export default solSlice.reducer;
