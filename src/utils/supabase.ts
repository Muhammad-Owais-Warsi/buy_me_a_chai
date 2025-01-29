import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_ANON_KEY);

const profile_table = import.meta.env.VITE_PROFILE_TABLE;
const transactions_table = import.meta.env.VITE_TRANSACTIONS_TABLE;


class API {

    async isUser(address: string) {

        const { data, error } = await supabase
            .from(profile_table)
            .select()
            .eq('address', address);


        if (error) {
            return { success: null, error: error.message };
        }

        return { success: data, error: null };
    }

    async create(address: string, name?: string, bio?: string, social?: string) {

        const { error } = await supabase
        .from(profile_table)
        .insert({
            address: address,
            name:name,
            bio:bio,
            social:social

        });

        return error ? { success:null, error:error.message } : { success:"Updated successfully", error:null }


    };

    async update(address: string, name?: string, bio?: string, social?: string) {

        if ((await this.isUser(address)).success) {
            console.log("hello")
            const { data, error } = await supabase
                .from(profile_table)
                .update({name,bio,social})
                .eq('address', address);
            console.log(data)

            if (error) {
                return { success: null, error: error.message };
            }
        } else {

            const { error } = await supabase
                .from(profile_table)
                .insert({
                    address: address,
                    name: name,
                    bio: bio,
                    social: social
                });

            if (error) {
                return { success: null, error: error.message };
            }
        }

        return { success: "Updated successfully", error: null };


    }

    async transaction(sender: string, receiver: string, amount: string, message: string, isPrivate: boolean) {
        const  { error } = await supabase
        .from(transactions_table)
        .insert({
            sender: sender,
            receiver: receiver,
            transaction: {
                amount: amount, 
                message: message,
                isPrivate: isPrivate
            }
        });

        if(error) {
            return { success: null, errror: error.message };
        }
        return { success: 'Transaction successfull', error: null };
    }

    async getTransactions(address: string) {

        const { data, error } = await supabase
        .from(transactions_table)
        .select()
        .eq('receiver', address);
      

        if(error) {
            return { success: null, error: error.message}
        }

        return { success: data, error: null }
    }


}

const api = new API();

export default api;