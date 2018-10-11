const roundToNearest= (nearest, num) => {
    var resto = nearest % num;
    if (resto <= (num / 2)) {
        return nearest - resto;
    } else {
        return nearest + num - resto;
    }
}

export default roundToNearest