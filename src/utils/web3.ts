import { createThirdwebClient } from "thirdweb";


const client = createThirdwebClient({
    clientId: import.meta.env.VITE_CLIENT_ID
})

export default client;