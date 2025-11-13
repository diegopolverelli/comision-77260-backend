import { pets } from "../data/pets.js";

export class PetsDAO{
    static get(){
        return pets
    }

    static save(mascota){
        let id=1
        if(pets.length>0){
            id=Math.max(...pets.map(d=>d.id))+1
        }
        
        let newPet={
            id, 
            ...mascota
        }

        pets.push(newPet)

        return newPet
    }
}