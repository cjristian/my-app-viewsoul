export const capitalizeFirstLetter = (str: string | null) => {
    if (!str) return "No disponible";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};