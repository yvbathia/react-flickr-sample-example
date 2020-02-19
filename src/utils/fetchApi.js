import { numOfItemPerPage } from "../constants";

// For fetch image with tags
export const fetchImageFromTagByPage = async (tag, page) => {
  const res = await fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e0c6094f63d6b2261b626b9f753d5db7&tags=${encodeURI(
      tag
    )}&per_page=${numOfItemPerPage}&page=${page}&format=json&nojsoncallback=1`
  );
  const data = await res.json();
  if (data.stat === "ok" && data.photos.total > 0) {
    const photoData = data.photos.photo.map(item => {
      return `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
    });
    return { photos: photoData, total: data.photos.total };
  }
  return {};
};
