import axios from 'axios';

const personalKey = "50629766-ca4e4f15305d377d5e3228fef";
const url = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  const params = {
    key: personalKey,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
      safesearch: true,
      page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(url, { params })
    return response.data; 
  } catch(error) {
    throw new Error('Sorry, there are no images matching your search query. Please try again!');
  }
};