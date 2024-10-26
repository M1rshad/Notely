import axios from "axios"

const BASE_URL = 'http://127.0.0.1:8000/'
const REFRESH_URL = `${BASE_URL}api/token/refresh/`
const LOG_OUT_URL = `${BASE_URL}api/logout/`
const NOTES_URL = `${BASE_URL}api/notes/`
// const NOTE_DETAIL_URL = `${BASE_URL}api/notes/${slug}`




export const refresh_token = async () => {
    try {
        const response = await axios.post(REFRESH_URL, {}, { withCredentials: true });
        return response.data?.refreshed;  // Use optional chaining to handle undefined response.data
    } catch (err) {
        console.log("Error refreshing token:", err.message);
        return null;  // Return null if refresh fails
    }
}

export const call_refresh = (error, func) =>{
    if (error.response && error.response.status === 401){
        const tokenRefreshed = refresh_token()

        if (tokenRefreshed) {
            const retryResponse = func()
            return retryResponse.data
        }
    }
}

export const fetchNotes = async (setNotes) => {
    try {
        const response = await axios.get(NOTES_URL, { withCredentials: true });
        console.log(response.data);
        setNotes(response.data);
    } catch (err) {
        console.log(err.message);
        call_refresh(err, () => axios.get(NOTES_URL, { withCredentials: true }));
    }
};

export const logOut = async(navigate) =>{
    try{
        await axios.post(LOG_OUT_URL, {}, {withCredentials:true} )
        navigate('/login')
    }catch (err) {
        console.log(err.message);
        call_refresh(err, () => axios.get(NOTES_URL,{}, { withCredentials: true }), navigate);
    }
}

export const addNewNote = async(data, notes, setNotes) =>{
    try{
        const response = await axios.post(NOTES_URL, data, {withCredentials:true})
        setNotes([...notes, response.data])
    }catch (err) {
        console.log(err.message);
        call_refresh(err, () => axios.post(NOTES_URL, data,  { withCredentials: true }));
    }
}


export const noteDetail = async(slug, setNote) =>{
    try{
        const response = await axios.get(`${NOTES_URL}${slug}`, {withCredentials:true})
        console.log(response.data)
        setNote(response.data)
    }catch (err) {
        console.log(err.message);
        call_refresh(err, () => axios.get(`${NOTES_URL}${slug}`, { withCredentials: true }));
    }
}