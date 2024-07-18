export const getfirstLetters = (fullName) => {
    const splitNames = fullName.trim().split(' ');

    if (splitNames.length >= 2) {
        const firstLetter = splitNames[0][0].toUpperCase();

        const lastLetter = splitNames[1][0].toUpperCase();

        return `${firstLetter} ${lastLetter}`
    }

};

getfirstLetters('john', 'smith');