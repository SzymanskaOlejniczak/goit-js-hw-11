import axios from "axios";
const BASE_URL_API = "https://pixabay.com/api/";

export class searchQuery {
    static key = '30573200-e6482719e2878fad01ed65176';
    static orientation = 'horizontal';
    static query = '';
    static page = 1;
    static min_width = 320;
    static image_type = "photo";
    static per_page = 40;
    static async searchPictures(query = '') {
    if(query.trim()) searchQuery.query = query;

    const config = {
        params: {
            key: searchQuery.key,
            orientation: searchQuery.orientation,
            q: searchQuery.query,
            page: searchQuery.page,
            min_width: searchQuery.min_width,
            image_type: searchQuery.image_type,
            per_page: searchQuery.per_page
        }
    }

    const response = await axios.get(`${BASE_URL_API}`, config);
    return response.data;
    }
}