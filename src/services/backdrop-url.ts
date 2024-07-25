import noImage from '../assets/no-image-placeholder-6f3882e0.webp';

const getImage = (extension?: string) => {
    if (typeof(extension) == 'undefined') return noImage;

    const baseUrl = `https://image.tmdb.org/t/p/original`;
    return `${baseUrl}${extension}`;
}

export default getImage;