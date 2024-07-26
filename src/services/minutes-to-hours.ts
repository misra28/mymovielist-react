const minutesToHours = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;

    const hours = Math.floor(minutes / 60);
    const plural = hours === 1 ? '' : 's';
    const remainder = minutes % 60;
    const plural2 = remainder === 1 ? '' : 's';
    return `${hours} hour${plural}, ${remainder} minute${plural2}`;
}

export default minutesToHours;