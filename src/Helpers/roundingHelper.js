Number.prototype.roundTo = function (num) {
    var remainder = this % num;
    if (remainder <= (num / 2)) {
        return this - remainder;
    } else {
        return this + num - remainder - 24;
    }
}

