import axios from "axios"

const BASE_URL = 'http://127.0.0.1:8000/api/'
const REFRESH_URL = `${BASE_URL}token/refresh/`
const LOG_OUT_URL = `${BASE_URL}logout/`
const NOTES_URL = `${BASE_URL}notes/`




export const refresh_token = async () => {
    try {
        const response = await axios.post(REFRESH_URL, {}, { withCredentials: true });
        return response.data?.refreshed;  
    } catch (err) {
        console.log("Error refreshing token:", err.message);
        return null;  
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

export const addNoteAPI = async(data, notes, setNotes) =>{
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


export const deleteNote = async(slug) => {
    try{
        await axios.delete(`${NOTES_URL}${slug}`, {withCredentials:true })
    }catch(err) {
        console.log(err.message);
        call_refresh(err, () => axios.get(`${NOTES_URL}${slug}`, { withCredentials: true }));
    }
}

export const fetchNote = async(slug, setTitle, setBody, setCategory) =>{
    try{
        const response = await axios.get(`${NOTES_URL}${slug}`, {withCredentials:true})
        const note = response.data
        setTitle(note.title)
        setBody(note.body)
        setCategory(note.category)
    }catch (err) {
        console.log(err.message);
        call_refresh(err, () => axios.get(`${NOTES_URL}${slug}`, { withCredentials: true }));
    }
}

export const updateNoteAPI = async (slug, data) => {
    try{
        console.log(slug)
        await axios.put(`${NOTES_URL}${slug}`,data, {withCredentials:true })
    }catch(err){
        console.log(err.message);
        call_refresh(err, () => axios.get(`${NOTES_URL}${slug}`, { withCredentials: true }));
    }
}


export const searchAPI = async(searchText, setNotes) =>{
    try{
        const response = await axios.get(`${BASE_URL}search-notes/?search=${searchText}`, {withCredentials:true})
        setNotes(response.data)
    }catch(err){
        console.log(err.message);
        call_refresh(err, () => axios.get(`${BASE_URL}search-notes/?search=${searchText}`, {withCredentials:true}));
    }
} 