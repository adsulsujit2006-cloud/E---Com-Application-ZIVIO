import axios from "axios"

const api = "http://localhost:5000/products"

export const fetchProducts = async () => {
    try {
        const response = await axios.get(api)
        console.log("responce",response)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}
