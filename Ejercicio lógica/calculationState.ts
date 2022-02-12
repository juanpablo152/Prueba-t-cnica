import { SerieCovidDead } from "./model/SerieCovidDead";
import { StateAndDead } from "./model/StateAndDeads";

export const calculationDeadsbyState = (arrayCovidDead:SerieCovidDead[], arrayProvinceState:string[]): StateAndDead[] => {
    let deadsByState: StateAndDead[] = []; 
    for (const nameState of arrayProvinceState) {
        let sumDeads: number = 0;
        let countCities: number = 0;
        let population: number = 0;
        for (const state of arrayCovidDead) {
            if (nameState === state.Province_State) {
                sumDeads += parseInt(state.date_42721);
                countCities += 1;
                population += parseInt(state.Population);
            }
        }
        let stateToAdd: StateAndDead = {
            name: nameState,
            deads: sumDeads,
            population: population,
            percentDeath: population === 0 ? 0 : (sumDeads/population) * 1000
        }
        deadsByState.push(stateToAdd);   
    }
    return deadsByState;
};


export const minAndMaxaccumulated = (arrayStateAndDead: StateAndDead[]): StateAndDead[] => {
    let maxDeadState: StateAndDead = {name: '', deads: 0, population: 0 , percentDeath: 0};
    let minDeadState: StateAndDead = {name: '', deads: 0, population: 0 , percentDeath: 0};
    let min = arrayStateAndDead[0].deads;
    let max = 0;
    for (const state of arrayStateAndDead) {
        if (state.deads > max) {
            max = state.deads;
            maxDeadState = state;
        } if (state.deads < min) {
            min = state.deads;
            minDeadState = state;
        }
    }
    return [maxDeadState,minDeadState];
}