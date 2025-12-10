export const cloudinary = (url, width = 400) => {
  if (!url) return null;

  // insert Cloudinary transform "/w_${width},q_auto,f_auto"
  const parts = url.split("/upload/");
  if (parts.length < 2) return url; // Not a Cloudinary URL

  return `${parts[0]}/upload/f_auto,q_auto,w_${width}/${parts[1]}`;
};
