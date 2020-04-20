const tile1 = [
    [
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: 0 },
        { type: 'desert', animal: 0 },
        { type: 'forest', animal: 0 }
    ]
];

const tile2 = [
    [
        { type: 'swamp', animal: 1 },
        { type: 'forest', animal: 1 },
        { type: 'forest', animal: 1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'desert', animal: -1 }
    ]
];

const tile3 = [
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'water', animal: -1 }
    ],
    [
        { type: 'swamp', animal: 1 },
        { type: 'swamp', animal: 1 },
        { type: 'forest', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 }
    ],
    [
        { type: 'mountain', animal: 1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 }
    ]
];

const tile4 = [
    [
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 }
    ],
    [
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: 1 }
    ],
    [
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: 1 }
    ]
];

const tile5 = [
    [
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: -1 }
    ],
    [
        { type: 'swamp', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'mountain', animal: -1 },
        { type: 'mountain', animal: 0 }
    ],
    [
        { type: 'desert', animal: -1 },
        { type: 'desert', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: 0 },
        { type: 'water', animal: 0 }
    ]
];

const tile6 = [
    [
        { type: 'desert', animal: 0 },
        { type: 'desert', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'mountain', animal: 0 },
        { type: 'mountain', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'swamp', animal: -1 },
        { type: 'forest', animal: -1 },
        { type: 'forest', animal: -1 }
    ],
    [
        { type: 'mountain', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'water', animal: -1 },
        { type: 'forest', animal: -1 }
    ]
];

const app = new PIXI.Application({ transparent: true, antialias: true });
const graphics = new PIXI.Graphics();

const Hex = Honeycomb.extendHex({ size: 30, orientation: 'flat' });
const Grid = Honeycomb.defineGrid(Hex);

document.body.appendChild(app.view);
graphics.lineStyle(2, 0xFFFFFF);
let id = 0;

function drawMap(map, order) {
    console.time();

    map.forEach(hex => {
        const point = hex.toPoint();
        point.y += 5;

        const corners = hex.corners().map(corner => corner.add(point));
        hex.id = id;
        id++;

        const [firstCorner, ...otherCorners] = corners;
        let color = null;

        const rowHex = order[hex.y][hex.x];
        switch (rowHex.type) {
            case 'forest':
                hex.type = 'forest';
                color = 0x00AA00;
                break;
            case 'water':
                hex.type = 'water';
                color = 0x0000EE;
                break;
            case 'swamp':
                hex.type = 'swamp';
                color = 0xAA00AA;
                break;
            case 'desert':
                hex.type = 'desert';
                color = 0xAAAA00;
                break;
            case 'mountain':
                hex.type = 'mountain';
                color = 0x999999;
                break;
            default:
                color = 0x0000FF;
        }

        graphics.beginFill(color);

        graphics.moveTo(firstCorner.x, firstCorner.y);

        otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));

        graphics.lineTo(firstCorner.x, firstCorner.y);

        graphics.endFill();

        graphics.lineStyle(2, 0xFFFFFF);

        let text = new PIXI.Text(`{${hex.x}, ${hex.y}}`, {fontFamily : 'Arial', fontSize: 12, fill : 0x000000, align : 'center', strokeThickness: 1});
        text.position.x = firstCorner.x - 40;
        text.position.y = firstCorner.y - 10;

        app.stage.addChild(text);
    });

    // animal borders
    map.forEach(hex => {
        const point = hex.toPoint();
        point.y += 5;

        const corners = hex.corners().map(corner => corner.add(point));

        const [firstCorner, ...otherCorners] = corners;
        let color = null;

        const rowHex = order[hex.y][hex.x];
        if (rowHex.animal !== -1) {
            switch (rowHex.animal) {
                case 0:
                    hex.animal = 'bear';
                    graphics.lineStyle(2, 0x000000);
                    break;
                case 1:
                    hex.animal = 'cougar';
                    graphics.lineStyle(2, 0xFF0000);
                    break;
                default:
                    break;
            }

            graphics.moveTo(firstCorner.x, firstCorner.y);

            otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));

            graphics.lineTo(firstCorner.x, firstCorner.y);

            graphics.lineStyle(2, 0xFFFFFF);
        }
    });
    app.stage.addChild(graphics);
    app.stage.children.reverse();

    console.timeEnd();
}

const fullMap = Grid.rectangle({width: 12, height: 9});

const orderField = document.querySelector('textarea');

function combine(arr1, arr2) {
    return [...arr1, ...arr2];
}

function placeTilesFull() {
    console.time();
    graphics.clear();
    const rawValue = orderField.value;
    const parsed = rawValue.split(',');
    if (parsed.length !== 6) return;
    let tileOrder = [];
    let rev = [];
    let count = false;
    let row = 0;
    parsed.forEach(num => {
        switch (num) {
            case "1":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile1[0]);
                    tileOrder[row+1] = combine(tileOrder[row+1], tile1[1]);
                    tileOrder[row+2] = combine(tileOrder[row+2], tile1[2]);
                } else {
                    tileOrder.push(tile1[0]);
                    tileOrder.push(tile1[1]);
                    tileOrder.push(tile1[2]);
                }
                break;
            case "2":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile2[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile2[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile2[2]);
                } else {
                    tileOrder.push(tile2[0]);
                    tileOrder.push(tile2[1]);
                    tileOrder.push(tile2[2]);
                }
                break;
            case "3":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile3[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile3[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile3[2]);
                } else {
                    tileOrder.push(tile3[0]);
                    tileOrder.push(tile3[1]);
                    tileOrder.push(tile3[2]);
                }
                break;
            case "4":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile4[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile4[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile4[2]);
                } else {
                    tileOrder.push(tile4[0]);
                    tileOrder.push(tile4[1]);
                    tileOrder.push(tile4[2]);
                }
                break;
            case "5":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile5[0]);
                    tileOrder[row + 1] = combine(tileOrder[row + 1], tile5[1]);
                    tileOrder[row + 2] = combine(tileOrder[row + 2], tile5[2]);
                } else {
                    tileOrder.push(tile5[0]);
                    tileOrder.push(tile5[1]);
                    tileOrder.push(tile5[2]);
                }
                break;
            case "6":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile6[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile6[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile6[2]);
                } else {
                    tileOrder.push(tile6[0]);
                    tileOrder.push(tile6[1]);
                    tileOrder.push(tile6[2]);
                }
                break;
            case "1f":
                rev = tile1.map(row => row);
                rev[0].reverse();
                rev[1].reverse();
                rev[2].reverse();
                rev.reverse();
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], rev[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], rev[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], rev[2]);
                } else {
                    tileOrder.push(rev[0]);
                    tileOrder.push(rev[1]);
                    tileOrder.push(rev[2]);
                }
                break;
            case "2f":
                rev = tile2.map(row => row);
                rev[0].reverse();
                rev[1].reverse();
                rev[2].reverse();
                rev.reverse();
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], rev[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], rev[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], rev[2]);
                } else {
                    tileOrder.push(rev[0]);
                    tileOrder.push(rev[1]);
                    tileOrder.push(rev[2]);
                }
                break;
            case "3f":
                rev = tile3.map(row => row);
                rev[0].reverse();
                rev[1].reverse();
                rev[2].reverse();
                rev.reverse();
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], rev[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], rev[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], rev[2]);
                } else {
                    tileOrder.push(rev[0]);
                    tileOrder.push(rev[1]);
                    tileOrder.push(rev[2]);
                }
                break;
            case "4f":
                rev = tile4.map(row => row);
                rev[0].reverse();
                rev[1].reverse();
                rev[2].reverse();
                rev.reverse();
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], rev[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], rev[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], rev[2]);
                } else {
                    tileOrder.push(rev[0]);
                    tileOrder.push(rev[1]);
                    tileOrder.push(rev[2]);
                }
                break;
            case "5f":
                rev = tile5.map(row => row);
                rev[0].reverse();
                rev[1].reverse();
                rev[2].reverse();
                rev.reverse();
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], rev[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], rev[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], rev[2]);
                } else {
                    tileOrder.push(rev[0]);
                    tileOrder.push(rev[1]);
                    tileOrder.push(rev[2]);
                }
                break;
            case "6f":
                rev = tile6.map(row => row);
                rev[0].reverse();
                rev[1].reverse();
                rev[2].reverse();
                rev.reverse();
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], rev[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], rev[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], rev[2]);
                } else {
                    tileOrder.push(rev[0]);
                    tileOrder.push(rev[1]);
                    tileOrder.push(rev[2]);
                }
                break;
            default:
                break;
        }

        if (count) {
            count = false;
            row += 3;
        } else {
            count = true;
        }
    });
    drawMap(fullMap, tileOrder);

    console.timeEnd();
}

const hexInput = document.querySelector('#find-hex');

function findHex() {
    const parsed = hexInput.value.split(',');
    console.log(
        fullMap.get([
            parseInt(parsed[0]),
            parseInt(parsed[1])
        ])
    );
}

const blueshack = document.querySelector('#blueshack');
const bluestone = document.querySelector('#bluestone');
const greenshack = document.querySelector('#greenshack');
const greenstone = document.querySelector('#greenstone');
const whiteshack = document.querySelector('#whiteshack');
const whitestone = document.querySelector('#whitestone');
const blackshack = document.querySelector('#blackshack');
const blackstone = document.querySelector('#blackstone');

function drawShack(hex, color, rgb) {
    const point = hex.toPoint();
    const corners = hex.corners().map(corner => corner.add(point));
    const [firstCorner, ...otherCorners] = corners;
    graphics.lineStyle(2, 0xFFFFFF);

    graphics.beginFill(rgb);

    const origin = -20;
    // move the "pencil" to the first corner
    graphics.moveTo(firstCorner.x + origin, firstCorner.y + 15);
    // draw lines to the other corners
    graphics.lineTo(firstCorner.x + origin - 20, firstCorner.y + 15);
    graphics.lineTo(firstCorner.x + origin - 10, firstCorner.y - 5);
    // finish at the first corner
    graphics.lineTo(firstCorner.x + origin, firstCorner.y + 15);

    graphics.endFill();
    // hex.structure = `${color} shack`;
    hex.structure = {
        type: 'shack',
        color
    };

    // app.stage.addChild(graphics);
    // app.stage.children.reverse();
}

function drawStone(hex, color, rgb) {
    const point = hex.toPoint();
    const corners = hex.corners().map(corner => corner.add(point));
    const [firstCorner, ...otherCorners] = corners;
    graphics.lineStyle(2, '#ffffff');

    graphics.beginFill(rgb);

    graphics.drawCircle(firstCorner.x - 30, firstCorner.y + 5, 10);

    graphics.endFill();
    // hex.structure = `${color} stone`;
    hex.structure = {
        type: 'stone',
        color
    };

    // app.stage.addChild(graphics);
    // app.stage.children.reverse();
}

function apply() {
    console.time();
    const bshack = blueshack.value.split(',');
    drawShack(fullMap.get([parseInt(bshack[0]), parseInt(bshack[1])]), 'blue',0x0000ff);
    const bstone = bluestone.value.split(',');
    drawStone(fullMap.get([parseInt(bstone[0]), parseInt(bstone[1])]), 'blue', 0x0000ff);

    const gshack = greenshack.value.split(',');
    drawShack(fullMap.get([parseInt(gshack[0]), parseInt(gshack[1])]), 'green',0x00ff00);
    const gstone = greenstone.value.split(',');
    drawStone(fullMap.get([parseInt(gstone[0]), parseInt(gstone[1])]), 'green',0x00ff00);

    const wshack = whiteshack.value.split(',');
    drawShack(fullMap.get([parseInt(wshack[0]), parseInt(wshack[1])]), 'white',0xffffff);
    const wstone = whitestone.value.split(',');
    drawStone(fullMap.get([parseInt(wstone[0]), parseInt(wstone[1])]), 'white',0xffffff);

    const blshack = blackshack.value.split(',');
    const blstone = blackstone.value.split(',');
    if (blshack.length !== 1 && blstone.length !== 1) {

        drawShack(fullMap.get([parseInt(blshack[0]), parseInt(blshack[1])]), 'black', 0x000000);
        drawStone(fullMap.get([parseInt(blstone[0]), parseInt(blstone[1])]), 'black', 0x000000);
    }

    console.timeEnd();
}

function solve(arr, clues) {
    if (arr === -1) {
        return -1;
    } else if (arr.length === 1) {
        return arr;
    }

    const clue = clues.splice(0,1);
    let round = [];

    try {
        round = arr.filter(value => clue[0].includes(value));
    } catch(e) {
        return -1;
    }
    if (round.length === 0) {
        return -1;
    }
    return solve(round, clues);
}

function findSolutions() {
    // Test case
    // Map layout:
    // 6, 2f
    // 5, 4,
    // 3, 1

    // Blue Shack: {9,1}
    // Blue Stone: {9,8}
    // Green Shack: {2,4}
    // Green Stone: {2,6}
    // White Shack: {4,6}
    // White Stone: {3,4}

    // Test clues
    // p1: The habitat is within two spaces of bear territory
    // p2: The habitat is on mountain or swamp
    // p3: The habitat is within one space of water
    // p4: The habitat is within one space of forest

    // correct habitat: {4,3}

    console.time();
    const amount = document.getElementById('playerAmount');
    const advanced = document.getElementById('advanced');
    console.log('map layout:', orderField.value);
    console.log('player amount:', amount.value);
    console.log('advanced game:', advanced.checked);
    findSolution(amount.value, advanced.checked);
    console.timeEnd();
}

function findSolution(playerAmount, inverse = false) {
    const inForestDesert = inTerrain('forest', 'desert', inverse);
    const inForestWater = inTerrain('forest', 'water', inverse);
    const inForestSwamp = inTerrain('forest', 'swamp', inverse);
    const inForestMountain = inTerrain('forest', 'mountain', inverse);
    const inDesertWater = inTerrain('desert', 'water', inverse);
    const inDesertSwamp = inTerrain('desert', 'swamp', inverse);
    const inDesertMountain = inTerrain('desert', 'mountain', inverse);
    const inWaterSwamp = inTerrain('water', 'swamp', inverse);
    const inWaterMountain = inTerrain('water', 'mountain', inverse);
    const inSwampMountain = inTerrain('swamp', 'mountain', inverse);
    const withinOneFromForest = withinOneFromTerrain('forest', inverse);
    const withinOneFromDesert = withinOneFromTerrain('desert', inverse);
    const withinOneFromSwamp = withinOneFromTerrain('swamp', inverse);
    const withinOneFromMountain = withinOneFromTerrain('mountain', inverse);
    const withinOneFromWater = withinOneFromTerrain('water', inverse);
    const withinOneFromAnimals = withinOneFromAnimal(inverse);
    const withinTwoFromStone = withinTwoFromStructureType('stone', inverse);
    const withinTwoFromShack = withinTwoFromStructureType('shack', inverse);
    const withinTwoFromBear = withinTwoFromAnimal('bear', inverse);
    const withinTwoFromCougar = withinTwoFromAnimal('cougar', inverse);
    const withinThreeFromWhite = withinThreeFromStructureColor('white', inverse);
    const withinThreeFromBlue = withinThreeFromStructureColor('blue', inverse);
    const withinThreeFromGreen = withinThreeFromStructureColor('green', inverse);

    const combined = [
        inForestDesert,
        inForestWater,
        inForestSwamp,
        inForestMountain,
        inDesertWater,
        inDesertSwamp,
        inDesertMountain,
        inWaterSwamp,
        inWaterMountain,
        inSwampMountain,
        withinOneFromForest,
        withinOneFromDesert,
        withinOneFromSwamp,
        withinOneFromMountain,
        withinOneFromWater,
        withinOneFromAnimals,
        withinTwoFromStone,
        withinTwoFromShack,
        withinTwoFromBear,
        withinTwoFromCougar,
        withinThreeFromWhite,
        withinThreeFromBlue,
        withinThreeFromGreen
    ];
    if (inverse) {
        const withinThreeFromBlack = withinThreeFromStructureColor('black', inverse);
        combined.push(withinThreeFromBlack);
    }

    const cmb = Combinatorics.combination(combined, playerAmount);
    let count = 0;
    let a;
    while(a = cmb.next()) {
        let test1 = false;
        let test2 = false;
        let test3 = false;
        let test4 = false;

        // a.forEach(b => {
        //     if (!test1) {
        //         test1 = _.isEqual(b, inSwampMountain);
        //     }
            // if (!test2) {
            //     test2 = _.isEqual(b, withinOneFromWater);
            // }
            // if (!test3) {
            //     test3 = _.isEqual(b, withinOneFromForest);
            // }
            // if (!test4) {
            //     test4 = _.isEqual(b, withinTwoFromBear);
            // }
        // });
        // if (!test1
            // || !test2
            // || !test3
            // || !test4
        // )
        //     continue;

        const solution = solve(fullMap, a);

        if (solution.length === 1) {
            console.log(solution[0]);
            count++;
            // break;
        }
    }
    console.log(count);
}

const unique = array => [...new Set(array.map(item => item))];

function inTerrain(terrain1, terrain2, inverse = false) {
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

    return validHexes;
}

function withinOneFromTerrain(terrain, inverse = false) {
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.type === terrain) {
            fullMap.forEach(hex2 => {
                if (inverse) {
                    if (hex1.distance(hex2) > 1) {
                        validHexes.push(hex2);
                    }
                } else {
                    if (hex1.distance(hex2) <= 1) {
                        validHexes.push(hex1);
                        validHexes.push(hex2);
                    }
                }
            });
        }
    });
    const uu = unique(validHexes);
    return unique(uu);
}

function withinOneFromAnimal(inverse = false) {
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.hasOwnProperty('animal')) {
            fullMap.forEach(hex2 => {
                if (inverse) {
                    if (hex1.distance(hex2) > 1) {
                        validHexes.push(hex2);
                    }
                } else {
                    if (hex1.distance(hex2) <= 1) {
                        validHexes.push(hex1);
                        validHexes.push(hex2);
                    }
                }
            });
        }
    });
    const uu = unique(validHexes);
    return unique(uu);
}

function withinTwoFromAnimal(type, inverse = false) {
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.hasOwnProperty('animal')) {
            if (hex1.animal === type) {
                fullMap.forEach(hex2 => {
                    if (inverse) {
                        if (hex1.distance(hex2) > 2) {
                            validHexes.push(hex2);
                        }
                    } else {
                        if (hex1.distance(hex2) <= 2) {
                            validHexes.push(hex1);
                            validHexes.push(hex2);
                        }
                    }
                });
            }
        }
    });
    const uu = unique(validHexes);
    return unique(uu);
}

function withinTwoFromStructureType(type, inverse = false) {
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.hasOwnProperty('structure')) {
            if (hex1.structure.type === type) {
                fullMap.forEach(hex2 => {
                    if (inverse) {
                        if (hex1.distance(hex2) > 2) {
                            validHexes.push(hex2);
                        }
                    } else {
                        if (hex1.distance(hex2) <= 2) {
                            validHexes.push(hex1);
                            validHexes.push(hex2);
                        }
                    }
                });
            }
        }
    });
    const uu = unique(validHexes);
    return unique(uu);
}

function withinThreeFromStructureColor(color, inverse = false) {
    const validHexes = [];
    fullMap.forEach(hex1 => {
        if (hex1.hasOwnProperty('structure')) {
            if (hex1.structure.color === color) {
                fullMap.forEach(hex2 => {
                    if (inverse) {
                        if (hex1.distance(hex2) > 3) {
                            validHexes.push(hex2);
                        }
                    } else {
                        if (hex1.distance(hex2) <= 3) {
                            validHexes.push(hex1);
                            validHexes.push(hex2);
                        }
                    }
                });
            }
        }
    });
    const uu = unique(validHexes);
    return unique(uu);
}
