import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_ANON_KEY);

const profile_table = import.meta.env.VITE_PROFILE_TABLE;
const transactions_table = import.meta.env.VITE_TRANSACTIONS_TABLE;
const card_table = import.meta.env.VITE_CARD_TABLE;
const bucket = import.meta.env.VITE_BUCKET;




class API {


    async checkStorage(address: string) {
   
        const { data, error } = await supabase
            .from(profile_table)
            .select()
            .eq('address', address);
    
        if (error) {
            return { success: null, error: error.message };      
        }
    
        console.log(data);
    
        if (data && data.length > 0) {
            console.log("heelo");
            const user = data[0]; 
    
            if (user?.profile) {
                const { data } = await supabase
                    .storage
                    .from(bucket)
                    .getPublicUrl(address);
    
                return { success: data.publicUrl, error: null };
            }
        }
    
        return { success: null, error: "No profile found" };
    }
    

    async isUser(address: string) {

        const { data, error } = await supabase
            .from(profile_table)
            .select()
            .eq('address', address);

        const response = await this.checkStorage(address);
        console.log(data);
        console.log(response);

        if (error) {
            return { success: null, error: error?.message };
        }


        return { success: data, profile: response?.success, error: null };
    }

    // async create(address: string, name?: string, bio?: string, social?: string) {

    //     const { error } = await supabase
    //     .from(profile_table)
    //     .insert({
    //         address: address,
    //         name:name,
    //         bio:bio,
    //         social:social

    //     });

    //     return error ? { success:null, error:error.message } : { success:"Updated successfully", error:null }


    // };

    async update(address: string, name?: string, bio?: string, social?: string, profile?: File) {

        const userResponse = await this.isUser(address);
        if (userResponse.success && userResponse.success.length > 0) {

            const { error } = await supabase
                .from(profile_table)
                .update({ name, bio, social })
                .eq('address', address);


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
                    social: social,
                    profile: false
                });

            if (error) {
                return { success: null, error: error.message };
            }


        }

        if (profile) {

            const { error } = await supabase
                .storage
                .from(bucket)
                .upload(address, profile, {
                    upsert: true
                })

            if (error) {
                return { success: null, error: error.message };
            }

            const profileUpdate = await supabase
                .from(profile_table)
                .update({
                    name: name,
                    bio: bio,
                    social: social,
                    profile: true
                })
                .eq('address', address);

            if (profileUpdate.error) {
                return { success: null, error: profileUpdate.error.message };
            }



        }

        return { success: "Updated successfully", error: null };


    }

    async getCard(address: string) {

        const { data, error } = await supabase
            .from(card_table)
            .select()
            .eq("address", address);

        if (error) {
            return { success: null, error: error.message };
        }

        return { success: data, error: null };

    }

    async updateCard(address: string, title?: string, description?: string, buttonText?: string) {

        const cardResponse = await this.getCard(address);
        if (cardResponse.success && cardResponse.success.length > 0) {
            const { error } = await supabase
                .from(card_table)
                .update({ title, description, buttonText })
                .eq('address', address)

            if (error) {
                return { success: null, error: error.message }
            }
        } else {

            const { error } = await supabase
                .from(card_table)
                .insert({
                    address: address,
                    title: title,
                    description: description,
                    buttonText: buttonText
                });

            if (error) {
                return { success: null, error: error.message }
            }
        }

        return { success: "Updated Successfuly", error: null }
    }

    async transaction(sender: string, receiver: string, amount: string, message: string, isPrivate: boolean) {
        const { error } = await supabase
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

        if (error) {
            return { success: null, errror: error.message };
        }
        return { success: 'Transaction successfull', error: null };
    }

    async getTransactions(address: string) {

        const { data, error } = await supabase
            .from(transactions_table)
            .select()
            .eq('receiver', address);


        if (error) {
            return { success: null, error: error.message }
        }

        return { success: data, error: null }
    }


}

const api = new API();

export default api;