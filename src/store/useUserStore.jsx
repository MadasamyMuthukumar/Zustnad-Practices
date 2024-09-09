/**
 * need not to write seperate reducers, actions, async actions
 * it is all inside the single object
 */
import { produce } from "immer";
export const useUserStore = create((set,get)=>({
    data:[],
    isLoading:false,
    error:null,
    //using trycatch hadling pending fulfiled and rejected like redux
    getUsers: async ()=>{
        try{
            set(
                produce(
                    (state)=>{
                        state.isLoading =  true
                    }
                )
            )
            const response =await getUsers() // some function that returns async data
            set(produce((state)=>{
                state.isLoading=false,
                state.data = response.data
            }))

        }catch(err){
            set(produce((state)=>{
                state.error=err,
                state.isLoading=false
            }))
            console.log(err);
            
        }
    },

    createUsers: async (newData)=>{
        try{
            set(
                produce(
                    (state)=>{
                        state.isLoading =  true
                    }
                )
            )
            const response =await createUsers() // some function that returns async data
            // set(produce((state)=>{
            //     state.isLoading=false,
            //     state.data = state.data.push(newData)
            // }))
            const updatedData = [...get().data,response.data] //getting old data and spreading, adding new object to it
            set({isLoading:false , data:updatedData})

        }catch(err){
            set(produce((state)=>{
                state.error=err,
                state.isLoading=false
            }))
            console.log(err);
            
        }
    }
}))