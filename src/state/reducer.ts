import Student from "../components/student/student.component";
import { IStudent } from "../types";


interface IState{
    students : IStudent[]
    totalAbsents : number
}

type Action = {type: 'INIT_STUDENT',payload :IStudent[]}
|{type: 'ADD_STUDENT',payload : IStudent}
|{type : 'REMOVE_FIRST',payload : null}
|{type: 'ABSENT_CHANGE',payload :{id :string,change :number}}
|{type: 'TOTAL_ABSENT',payload :number}


const reducer = (state : IState , action : Action): IState =>{
    switch (action.type) {
        case 'INIT_STUDENT': {
            if (state.students.length === 0) {
              return { ...state, students: action.payload }
            }
            return state;
          }
        case 'ADD_STUDENT':{
            const newStudent = action.payload;
            newStudent.id = Date.now().toString();
            return {...state,students : [...state.students ,newStudent ]}
            
        }    
        case 'REMOVE_FIRST':{
                const newList : IStudent[] = [...state.students];
                newList.shift();
                return {...state ,students : newList};
        }
        case 'ABSENT_CHANGE':{            
            return{...state,students:state.students.map(std => std.id === action.payload.id ? { ...std, absents: std.absents + action.payload.change } : std)}
        }
        case 'TOTAL_ABSENT':{
            const totalAbs = state.students.reduce((prev, cur) => { return prev + cur.absents }, 0);
            return {...state,totalAbsents:totalAbs}
        }
        default:
            return state;
    
    }
 
}

export default reducer