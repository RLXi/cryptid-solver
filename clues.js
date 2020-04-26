const unique = array => [...new Set(array.map(item => item))];

function inTerrain(terrain1, terrain2, inverse = false) {
    const name = inverse ? `Not in ${terrain1} or ${terrain2}` : `In ${terrain1} or ${terrain2}`;
    const id = inverse ? `notin${terrain1}${terrain2}` : `in${terrain1}${terrain2}`;
    const opposite = !inverse ? `notin${terrain1}${terrain2}` : `in${terrain1}${terrain2}`;
    const validHexes = [];
    fullMap.forEach(hex => {
        if (inverse) {
            if (hex.type !== terrain1 && hex.type !== terrain2) {
                validHexes.push(hex);
            }
        } else {
            if (hex.type === terrain1 || hex.type === terrain2) {
                validHexes.push(hex);
            }
        }
    });

    return {
        name,
        id,
        opposite,
        hexes: validHexes
    };
}

function withinOneFromTerrain(terrain, inverse = false) {
    const name = inverse ? `Not within one space from ${terrain}` : `Within one space from ${terrain}`;
    const id = inverse ? `notonefrom${terrain}` : `onefrom${terrain}`;
    const opposite = !inverse ? `notonefrom${terrain}` : `onefrom${terrain}`;
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.type === terrain) {
            fullMap.forEach(hex2 => {
                if (hex1.distance(hex2) <= 1) {
                    validHexes.push(hex1);
                    validHexes.push(hex2);
                }
            });
        }
    });
    const uniqueValid = unique(validHexes);
    if (inverse) {
        return checkInverse(name, id, opposite, uniqueValid);
    }
    return {
        name,
        id,
        opposite,
        hexes: uniqueValid
    };
}

function withinOneFromAnimal(inverse = false) {
    const name = inverse ? `Not within one space from animal territories` : `Within one space from animal territories`;
    const id = inverse ? `notonefromanimal` : `onefromanimal`;
    const opposite = !inverse ? `notonefromanimal` : `onefromanimal`;
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.hasOwnProperty('animal')) {
            fullMap.forEach(hex2 => {
                if (hex1.distance(hex2) <= 1) {
                    validHexes.push(hex1);
                    validHexes.push(hex2);
                }
            });
        }
    });
    const uniqueValid = unique(validHexes);
    if (inverse) {
        return checkInverse(name, id, opposite, uniqueValid);
    }
    return {
        name,
        id,
        opposite,
        hexes: uniqueValid
    };
}

function withinTwoFromAnimal(type, inverse = false) {
    const name = inverse ? `Not within two spaces from ${type} territory` : `Within two spaces from ${type} territory`;
    const id = inverse ? `nottwofrom${type}` : `twofrom${type}`;
    const opposite = !inverse ? `nottwofrom${type}` : `twofrom${type}`;
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.hasOwnProperty('animal')) {
            if (hex1.animal === type) {
                fullMap.forEach(hex2 => {
                    if (hex1.distance(hex2) <= 2) {
                        validHexes.push(hex1);
                        validHexes.push(hex2);
                    }
                });
            }
        }
    });
    const uniqueValid = unique(validHexes);
    if (inverse) {
        return checkInverse(name, id, opposite, uniqueValid);
    }
    return {
        name,
        id,
        opposite,
        hexes: uniqueValid
    };
}

function withinTwoFromStructureType(type, inverse = false) {
    const name = inverse ? `Not within two spaces from ${type}` : `Within two spaces from ${type}`;
    const id = inverse ? `nottwofrom${type}` : `twofrom${type}`;
    const opposite = !inverse ? `nottwofrom${type}` : `twofrom${type}`;
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.hasOwnProperty('structure')) {
            if (hex1.structure.type === type) {
                fullMap.forEach(hex2 => {
                    if (hex1.distance(hex2) <= 2) {
                        validHexes.push(hex1);
                        validHexes.push(hex2);
                    }
                });
            }
        }
    });
    const uniqueValid = unique(validHexes);
    if (inverse) {
        return checkInverse(name, id, opposite, uniqueValid);
    }
    return {
        name,
        id,
        opposite,
        hexes: uniqueValid
    };
}

function withinThreeFromStructureColor(color, inverse = false) {
    const name = inverse ? `Not within three spaces from ${color} structures` : `Within three spaces from ${color} structures`;
    const id = inverse ? `notthreefrom${color}` : `threefrom${color}`;
    const opposite = !inverse ? `notthreefrom${color}` : `threefrom${color}`;
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.hasOwnProperty('structure')) {
            if (hex1.structure.color === color) {
                fullMap.forEach(hex2 => {
                    if (hex1.distance(hex2) <= 3) {
                        validHexes.push(hex1);
                        validHexes.push(hex2);
                    }
                });
            }
        }
    });
    const uniqueValid = unique(validHexes);
    if (inverse) {
        return checkInverse(name, id, opposite, uniqueValid);
    }
    return {
        name,
        id,
        opposite,
        hexes: uniqueValid
    };
}

function checkInverse(name, id, opposite, valid) {
    const inverseArray = [];
    fullMap.forEach(hex => {
        let found = false;
        for (let i = 0; i < valid.length; i++) {
            if (hex.id === valid[i].id) {
                found = true;
                break;
            }
        }
        if (!found) inverseArray.push(hex);
    });
    return {
        name,
        id,
        opposite,
        hexes: inverseArray
    };
}
