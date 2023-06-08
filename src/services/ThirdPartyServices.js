import axios from "axios";

export const division_autocomplete = async (text) => {
    try {
        console.log(text);
        let data = JSON.stringify({
            "components": "country:VN",
            "input": [
                {
                    "text": text,
                }
            ],
            "use_case": "fe.user.pdp",
            "sessiontoken": "9c1b9d06-e15d-47f8-8e88-3b8adf5a5040",
            "return_max_division_only": true
        });

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'https://cors-anywhere.herokuapp.com/https://shopee.vn/api/v4/geo/division_autocomplete',
            headers: {
                // "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                'Access-Control-Allow-Origin': '*'
            },
            data: data
        };

        const res = await axios.request(config)
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}