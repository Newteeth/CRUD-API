import { IUsers } from "../endpoints/user.js"
// id error
export const errorID400 = () => { 
    return {
        code: 400, 
        message: `ID invalid` 
    }
}

export const errorID404 = () => {
    return {
        code: 404, 
        message: `ID cannot correct`
    }
}

// body error
export const errorBody400 = () => { 
    return {
        code: 400, 
        message: `Body has no necessary fields` 
    }
}

///others error
export const error500 = () => {
    return {
        code: 500, 
        message: `YOU LUKY, SERVER ERROR`
    }
}

export const code200 = (DB: Array<IUsers>) => {
    return {
        code: 200,
        message: `User delete. Size DB: ${DB.length}` 
    }
}