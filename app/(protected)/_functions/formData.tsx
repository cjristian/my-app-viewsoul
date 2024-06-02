import { format, differenceInSeconds, differenceInMinutes, differenceInHours } from 'date-fns';

export const formatDate = (dateString: string | null) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
};
export const postFormatDate = (date: Date) => {
    const now = new Date();
    const secondsDifference = differenceInSeconds(now, date);
    const minutesDifference = differenceInMinutes(now, date);
    const hoursDifference = differenceInHours(now, date);
    const oneDayInMillis = 24 * 60 * 60 * 1000;

    if (now.getTime() - date.getTime() < oneDayInMillis) {
        if (secondsDifference < 60) {
            return `${secondsDifference}s`;
        } else if (minutesDifference < 60) {
            return `${minutesDifference}min`;
        } else {
            return `${hoursDifference}h`;
        }
    } else if (now.getFullYear() === date.getFullYear()) {
        return format(date, 'MMM dd');
    } else {
        return format(date, 'MMM dd, yyyy');
    }
};