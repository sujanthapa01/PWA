
import { supabase } from "@/lib/supabase";

async function searchUser(username) {
    if (!username) return []
    try {
        const { data: userData, error } = await supabase.from("users").select("*").ilike("username", `%${username}%`).single()
        if (error) {
            console.log("error to search user", error);
            return [];
        }
        return userData;
    } catch (e) {
        console.log(e)
    }
}

export default searchUser