import axios from "axios"

const BASE_URL = 'http://127.0.0.1:8000/api/'
const SIGN_UP_URL = `${BASE_URL}register/`
const LOG_IN_URL = `${BASE_URL}token/`
const REFRESH_URL = `${BASE_URL}token/refresh/`
const LOG_OUT_URL = `${BASE_URL}logout/`
const NOTES_URL = `${BASE_URL}notes/`
const AUTH_URL = `${BASE_URL}authenticated/`


export const signUp = async(signUpCredentials, navigate, setError) =>{
    try{
        await axios.post(SIGN_UP_URL, signUpCredentials)
        navigate('/login')
    }catch(err){
        console.log(err)
        setError('Signup failed. Please try again.'); 
    }

}

export const login = async (loginCredentials) => {
    try {
        await axios.post(LOG_IN_URL, loginCredentials, { withCredentials: true });
        return true; 
    } catch (err) {
        console.error(err);
        throw new Error('Invalid credentials'); 
    }
};

export const refresh_token = async () => {
    try {
        const response = await axios.post(REFRESH_URL, {}, { withCredentials: true });
        return response.data?.refreshed;  
    } catch (err) {
        console.log("Error refreshing token:", err.message);
        return null;  
    }
}

// export const call_refresh = (error, func) =>{
//     if (error.response && error.response.status === 401){
//         const tokenRefreshed = refresh_token()

//         if (tokenRefreshed) {
//             const retryResponse = func()
//             return retryResponse.data
//         }
//     }
// }
export const call_refresh = async (error, func) => {
    if (error.response && error.response.status === 401) {
        const tokenRefreshed = await refresh_token(); // Wait for the refresh token to complete

        if (tokenRefreshed) {
            try {
                const retryResponse = await func(); // Retry the original request
                return retryResponse.data; // Return the retried response data
            } catch (retryErr) {
                console.error("Retry failed:", retryErr.message);
                return null; // Handle retry failure gracefully
            }
        }
    }
    return null; // Return null if not a 401 error or refresh fails
};

// export const fetchNotes = async (setNotes) => {
//     try {
//         const response = await axios.get(NOTES_URL, { withCredentials: true });
//         console.log(response.data);
//         setNotes(response.data);
//     } catch (err) {
//         console.log(err.message);
//         call_refresh(err, () => axios.get(NOTES_URL, { withCredentials: true }));
//     }
// };
export const fetchNotes = async (setNotes) => {
    try {
        const response = await axios.get(NOTES_URL, { withCredentials: true });
        console.log(response.data);
        setNotes(response.data);
    } catch (err) {
        console.error("Fetch notes error:", err.message);
        call_refresh(err, async () => {
            try {
                const retryResponse = await axios.get(NOTES_URL, { withCredentials: true });
                setNotes(retryResponse.data);
            } catch (retryErr) {
                console.error("Retry failed:", retryErr.message);
                setNotes([]); // Clear notes on repeated failure
            }
        });
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

export const is_authenticated = async () =>{
    try{
        await axios.post(AUTH_URL, {}, {withCredentials:true})
        return true
    }catch{
        return false
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