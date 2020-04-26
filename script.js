const app = new PIXI.Application({ transparent: true });

const Hex = Honeycomb.extendHex({ size: 30, orientation: 'flat' });
const Grid = Honeycomb.defineGrid(Hex);
app.view.width = 560;
document.body.appendChild(app.view);

let id = 0;
let possibleClues;
let globalPlayerAmount = 0;
let globalCombined = [];
let globalOrder;
let globalStructures = [];
let roundNum = 1;
let possibleSolution;

function drawMap(map, order, structures = []) {
    console.time();

    // clear stage
    for (let i = app.stage.children.length - 1; i >= 0; i--) {
        app.stage.removeChild(app.stage.children[i]);
    }

    map.forEach(hex => {
        const container = new PIXI.Container();

        app.stage.addChild(container);
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFFFFFF);
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

        graphics.interactive = true;
        // graphics.click = grayHex;
        // graphics.click = function(e) {
        //     console.log(this);
        //     const graphics2 = new PIXI.Graphics();
        //     graphics2.lineStyle(2, 0x555555);
        //     graphics.beginFill(0x555555);
        //
        //     graphics.moveTo(firstCorner.x, firstCorner.y);
        //
        //     otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));
        //
        //     graphics.lineTo(firstCorner.x, firstCorner.y);
        //
        //     graphics.endFill();
        //     app.stage.addChild(graphics2);
        // };

        Object.assign(graphics, {hex});

        // app.stage.addChild(graphics);
        container.addChild(graphics);

        let ident = new PIXI.Text(
            `${hex.type[0].toUpperCase()}`,
            {
                fontFamily : 'Arial',
                fontSize: 11,
                fill : (color === 0x0000EE || color === 0xAA00AA) ? 0xffffff : 0x000000,
                align : 'center',
                strokeThickness: 1
            }
        );
        ident.position.x = firstCorner.x - 35;
        ident.position.y = firstCorner.y - 23;
        app.stage.addChild(ident);

        let text = new PIXI.Text(
            `${hex.x}, ${hex.y}`,
            {
                fontFamily : 'Arial',
                fontSize: 11,
                fill : (color === 0x0000EE || color === 0xAA00AA) ? 0xffffff : 0x000000,
                align : 'center',
                strokeThickness: 1
            }
        );
        text.position.x = firstCorner.x - 40;
        text.position.y = firstCorner.y + 10;
        app.stage.addChild(text);
    });

    // animal borders
    map.forEach(hex => {
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0xFFFFFF);
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
        Object.assign(graphics, {hex});
        app.stage.addChild(graphics);
    });

    // structures
    if (structures.length !== 0) {
        structures.forEach(structureColor => {
            handleStructures(structureColor.shack, structureColor.stone, structureColor.color, structureColor.rgb)
        });
    }

    console.timeEnd();
}

const fullMap = Grid.rectangle({width: 12, height: 9});
const orderField = document.querySelector('textarea');

function combine(arr1, arr2) {
    return [...arr1, ...arr2];
}

function placeTilesFull() {
    console.time();

    // clear stage
    for (let i = app.stage.children.length - 1; i >= 0; i--) {
        app.stage.removeChild(app.stage.children[i]);
    }

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
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile1f[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile1f[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile1f[2]);
                } else {
                    tileOrder.push(tile1f[0]);
                    tileOrder.push(tile1f[1]);
                    tileOrder.push(tile1f[2]);
                }
                break;
            case "2f":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile2f[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile2f[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile2f[2]);
                } else {
                    tileOrder.push(tile2f[0]);
                    tileOrder.push(tile2f[1]);
                    tileOrder.push(tile2f[2]);
                }
                break;
            case "3f":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile3f[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile3f[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile3f[2]);
                } else {
                    tileOrder.push(tile3f[0]);
                    tileOrder.push(tile3f[1]);
                    tileOrder.push(tile3f[2]);
                }
                break;
            case "4f":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile4f[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile4f[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile4f[2]);
                } else {
                    tileOrder.push(tile4f[0]);
                    tileOrder.push(tile4f[1]);
                    tileOrder.push(tile4f[2]);
                }
                break;
            case "5f":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile5f[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile5f[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile5f[2]);
                } else {
                    tileOrder.push(tile5f[0]);
                    tileOrder.push(tile5f[1]);
                    tileOrder.push(tile5f[2]);
                }
                break;
            case "6f":
                if(count) {
                    tileOrder[row] = combine(tileOrder[row], tile6f[0]);
                    tileOrder[row+1] = combine(tileOrder[row + 1], tile6f[1]);
                    tileOrder[row+2] = combine(tileOrder[row + 2], tile6f[2]);
                } else {
                    tileOrder.push(tile6f[0]);
                    tileOrder.push(tile6f[1]);
                    tileOrder.push(tile6f[2]);
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
    globalOrder = tileOrder;
    drawMap(fullMap, globalOrder, globalStructures);

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

function handleShack(hex, color, rgb) {
    hex.structure = {
        type: 'shack',
        color
    };
    drawShack(hex, color, rgb);
}

function handleStone(hex, color, rgb) {
    hex.structure = {
        type: 'stone',
        color
    };
    drawStone(hex, color, rgb);
}

function handleStructures(shack, stone, color, rgb) {
    handleShack(shack, color, rgb);
    handleStone(stone, color, rgb);
}



function apply() {
    console.time();
    const bshack = blueshack.value.split(',');
    const bstone = bluestone.value.split(',');
    const gshack = greenshack.value.split(',');
    const gstone = greenstone.value.split(',');
    const wshack = whiteshack.value.split(',');
    const wstone = whitestone.value.split(',');
    const blshack = blackshack.value.split(',');
    const blstone = blackstone.value.split(',');

    globalStructures = [];

    globalStructures.push({
        shack: fullMap.get([parseInt(bshack[0]), parseInt(bshack[1])]),
        stone:fullMap.get([parseInt(bstone[0]), parseInt(bstone[1])]),
        color: 'blue',
        rgb: 0x0000ff
    });
    globalStructures.push({
        shack: fullMap.get([parseInt(gshack[0]), parseInt(gshack[1])]),
        stone: fullMap.get([parseInt(gstone[0]), parseInt(gstone[1])]),
        color: 'green',
        rgb: 0x00ff00
    });
    globalStructures.push({
        shack: fullMap.get([parseInt(wshack[0]), parseInt(wshack[1])]),
        stone: fullMap.get([parseInt(wstone[0]), parseInt(wstone[1])]),
        color: 'white',
        rgb: 0xffffff
    });
    // handleStructures(fullMap.get([parseInt(bshack[0]), parseInt(bshack[1])]), fullMap.get([parseInt(bstone[0]), parseInt(bstone[1])]),'blue', 0x0000ff);
    // handleStructures(fullMap.get([parseInt(gshack[0]), parseInt(gshack[1])]), fullMap.get([parseInt(gstone[0]), parseInt(gstone[1])]),'green', 0x00ff00);
    // handleStructures(fullMap.get([parseInt(wshack[0]), parseInt(wshack[1])]), fullMap.get([parseInt(wstone[0]), parseInt(wstone[1])]),'white', 0xffffff);

    if (blshack.length !== 1 && blstone.length !== 1) {
        globalStructures.push({
            shack: fullMap.get([parseInt(blshack[0]), parseInt(blshack[1])]),
            stone: fullMap.get([parseInt(blstone[0]), parseInt(blstone[1])]),
            color: 'black',
            rgb: 0x000000
        });
        handleStructures(fullMap.get([parseInt(blshack[0]), parseInt(blshack[1])]), fullMap.get([parseInt(blstone[0]), parseInt(blstone[1])]),'black', 0x000000);
    }

    drawMap(fullMap, globalOrder, globalStructures);

    console.timeEnd();
}

function solve(arr, clues) {
    if (arr === -1) return -1;
    else if (arr.length === 1) return arr;

    const copy = clues.map(arr => arr);
    const clue = copy.splice(0,1);
    let round = [];

    try {
        round = arr.filter(value => clue[0].includes(value));
    } catch(e) {
        return -1;
    }

    if (round.length === 0) return -1;

    return solve(round, copy);
}

function findSolutions() {
    roundNum = 1;
    const poss = document.querySelector('#possibilities');
    // const initial = document.querySelector('#initial');
    // const initialInversed = document.querySelector('#initialInverse');
    // if (initialInversed.checked) {
    //     initial.value = `not${initial.value}`;
    // }
    // const radios = document.querySelector('input[type=radio]');
    // if (radios !== null ){
    //     radios.removeEventListener('change', _handleChange);
    // }
    poss.innerHTML = '';
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
    // console.log('initial clue:', initial.value);
    // findSolution(amount.value, initial.value, advanced.checked);
    findSolution(amount.value, advanced.checked);
    console.timeEnd();
}

// function findSolution(playerAmount, initialClue, advanced = false) {
function findSolution(playerAmount, advanced = false) {
    globalPlayerAmount = playerAmount;
    const inForestDesert = inTerrain('forest', 'desert');
    const inForestWater = inTerrain('forest', 'water');
    const inForestSwamp = inTerrain('forest', 'swamp');
    const inForestMountain = inTerrain('forest', 'mountain');
    const inDesertWater = inTerrain('desert', 'water');
    const inDesertSwamp = inTerrain('desert', 'swamp');
    const inDesertMountain = inTerrain('desert', 'mountain');
    const inWaterSwamp = inTerrain('water', 'swamp');
    const inWaterMountain = inTerrain('water', 'mountain');
    const inSwampMountain = inTerrain('swamp', 'mountain');
    const withinOneFromForest = withinOneFromTerrain('forest');
    const withinOneFromDesert = withinOneFromTerrain('desert');
    const withinOneFromSwamp = withinOneFromTerrain('swamp');
    const withinOneFromMountain = withinOneFromTerrain('mountain');
    const withinOneFromWater = withinOneFromTerrain('water');
    const withinOneFromAnimals = withinOneFromAnimal();
    const withinTwoFromStone = withinTwoFromStructureType('stone');
    const withinTwoFromShack = withinTwoFromStructureType('shack');
    const withinTwoFromBear = withinTwoFromAnimal('bear');
    const withinTwoFromCougar = withinTwoFromAnimal('cougar');
    const withinThreeFromWhite = withinThreeFromStructureColor('white');
    const withinThreeFromBlue = withinThreeFromStructureColor('blue');
    const withinThreeFromGreen = withinThreeFromStructureColor('green');

    const comb = [
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
    const combined = [
        inForestDesert.hexes,
        inForestWater.hexes,
        inForestSwamp.hexes,
        inForestMountain.hexes,
        inDesertWater.hexes,
        inDesertSwamp.hexes,
        inDesertMountain.hexes,
        inWaterSwamp.hexes,
        inWaterMountain.hexes,
        inSwampMountain.hexes,
        withinOneFromForest.hexes,
        withinOneFromDesert.hexes,
        withinOneFromSwamp.hexes,
        withinOneFromMountain.hexes,
        withinOneFromWater.hexes,
        withinOneFromAnimals.hexes,
        withinTwoFromStone.hexes,
        withinTwoFromShack.hexes,
        withinTwoFromBear.hexes,
        withinTwoFromCougar.hexes,
        withinThreeFromWhite.hexes,
        withinThreeFromBlue.hexes,
        withinThreeFromGreen.hexes
    ];
    if (advanced) {
        const notInForestDesert = inTerrain('forest', 'desert', true);
        const notInForestWater = inTerrain('forest', 'water', true);
        const notInForestSwamp = inTerrain('forest', 'swamp', true);
        const notInForestMountain = inTerrain('forest', 'mountain', true);
        const notInDesertWater = inTerrain('desert', 'water', true);
        const notInDesertSwamp = inTerrain('desert', 'swamp', true);
        const notInDesertMountain = inTerrain('desert', 'mountain', true);
        const notInWaterSwamp = inTerrain('water', 'swamp', true);
        const notInWaterMountain = inTerrain('water', 'mountain', true);
        const notInSwampMountain = inTerrain('swamp', 'mountain', true);
        const notWithinOneFromForest = withinOneFromTerrain('forest', true);
        const notWithinOneFromDesert = withinOneFromTerrain('desert', true);
        const notWithinOneFromSwamp = withinOneFromTerrain('swamp', true);
        const notWithinOneFromMountain = withinOneFromTerrain('mountain', true);
        const notWithinOneFromWater = withinOneFromTerrain('water', true);
        const notWithinOneFromAnimals = withinOneFromAnimal(true);
        const notWithinTwoFromStone = withinTwoFromStructureType('stone', true);
        const notWithinTwoFromShack = withinTwoFromStructureType('shack', true);
        const notWithinTwoFromBear = withinTwoFromAnimal('bear', true);
        const notWithinTwoFromCougar = withinTwoFromAnimal('cougar', true);
        const notWithinThreeFromWhite = withinThreeFromStructureColor('white', true);
        const notWithinThreeFromBlue = withinThreeFromStructureColor('blue', true);
        const notWithinThreeFromGreen = withinThreeFromStructureColor('green', true);
        const withinThreeFromBlack = withinThreeFromStructureColor('black', false);
        const notWithinThreeFromBlack = withinThreeFromStructureColor('black', true);

        combined.push(notInForestDesert.hexes);
        combined.push(notInForestWater.hexes);
        combined.push(notInForestSwamp.hexes);
        combined.push(notInForestMountain.hexes);
        combined.push(notInDesertWater.hexes);
        combined.push(notInDesertSwamp.hexes);
        combined.push(notInDesertMountain.hexes);
        combined.push(notInWaterSwamp.hexes);
        combined.push(notInWaterMountain.hexes);
        combined.push(notInSwampMountain.hexes);
        combined.push(notWithinOneFromForest.hexes);
        combined.push(notWithinOneFromDesert.hexes);
        combined.push(notWithinOneFromSwamp.hexes);
        combined.push(notWithinOneFromWater.hexes);
        combined.push(notWithinOneFromMountain.hexes);
        combined.push(notWithinOneFromAnimals.hexes);
        combined.push(notWithinTwoFromStone.hexes);
        combined.push(notWithinTwoFromShack.hexes);
        combined.push(notWithinTwoFromBear.hexes);
        combined.push(notWithinTwoFromCougar.hexes);
        combined.push(withinThreeFromBlack.hexes);
        combined.push(notWithinThreeFromBlack.hexes);
        combined.push(notWithinThreeFromBlue.hexes);
        combined.push(notWithinThreeFromGreen.hexes);
        combined.push(notWithinThreeFromWhite.hexes);
        comb.push(notInForestDesert);
        comb.push(notInForestWater);
        comb.push(notInForestSwamp);
        comb.push(notInForestMountain);
        comb.push(notInDesertWater);
        comb.push(notInDesertSwamp);
        comb.push(notInDesertMountain);
        comb.push(notInWaterSwamp);
        comb.push(notInWaterMountain);
        comb.push(notInSwampMountain);
        comb.push(notWithinOneFromForest);
        comb.push(notWithinOneFromDesert);
        comb.push(notWithinOneFromSwamp);
        comb.push(notWithinOneFromWater);
        comb.push(notWithinOneFromMountain);
        comb.push(notWithinOneFromAnimals);
        comb.push(notWithinTwoFromStone);
        comb.push(notWithinTwoFromShack);
        comb.push(notWithinTwoFromBear);
        comb.push(notWithinTwoFromCougar);
        comb.push(withinThreeFromBlack);
        comb.push(notWithinThreeFromBlack);
        comb.push(notWithinThreeFromBlue);
        comb.push(notWithinThreeFromGreen);
        comb.push(notWithinThreeFromWhite);
    }

    possibleClues = comb;
    globalCombined = combined;

    const seek = seekSolution(globalCombined);

    console.log(unique(seek[0]));
    console.log(unique(seek[0]).length);
}

function seekSolution(combined, firstClue = {id:0}, secondClue = {id:0}, thirdClue = {id:0}, fourthClue = {id:0}, fifthClue = {id:0}) {
    console.log('clue1', firstClue);
    console.log('clue2', secondClue);
    console.log('clue3', thirdClue);
    console.log('clue4', fourthClue);
    console.log('clue5', fifthClue);
    const solutionsArray = [];
    const hexesArray = [];
    let cmb = Combinatorics.bigCombination(globalCombined, globalPlayerAmount);
    let a;
    while(a = cmb.next()) {
        let test1 = false;
        let test2 = false;
        let test3 = false;
        let test4 = false;
        let test5 = false;

        // Check for known clues
        a.forEach(b => {
            if (!test1 && firstClue.id !== 0) {
                test1 = _.isEqual(b, firstClue.hexes);
            }
            if (!test2 && secondClue.id !== 0) {
                test2 = _.isEqual(b, secondClue.hexes);
            }
            if (!test3 && thirdClue.id !== 0) {
                test3 = _.isEqual(b, thirdClue.hexes);
            }
            if (!test4 && fourthClue.id !== 0) {
                test4 = _.isEqual(b, fourthClue.hexes);
            }
            if (!test5 && fifthClue.id !== 0) {
                test5 = _.isEqual(b, fifthClue.hexes);
            }
        });

        if ((!test1 && firstClue.id !== 0)
            || (!test2 && secondClue.id !== 0)
            || (!test3 && thirdClue.id !== 0)
            || (!test4 && fourthClue.id !== 0)
            || (!test5 && fifthClue.id !== 0)
        ) {
            continue;
        }

        const solution = solve(fullMap, a);

        if (solution.length === 1) {
            solutionsArray.push(solution[0]);
            hexesArray.push({
                hex: solution[0],
                hexes: a
            });
        }
    }
    const cc = [];
    possibleSolution = unique(solutionsArray);
    hexesArray.forEach(arr => {
        possibleClues.forEach(arr2 => {
            arr.hexes.forEach(ar => {
                if (_.isEqual(ar, arr2.hexes)) {
                    cc.push(arr2);
                }
            });
        });
    });
    createList(unique(cc), roundNum, firstClue, secondClue, thirdClue, fourthClue, fifthClue);
    possibleCombinations(hexesArray);
    roundNum++;
    return [unique(solutionsArray), hexesArray];
}

function possibleCombinations(combinations) {
    const clueCombinations = [];
    combinations.forEach(cmb => {
        const obj = {
            hex: cmb.hex,
            clues: []
        };
        cmb.hexes.forEach(c => {
            possibleClues.forEach(pc => {
                if (c === pc.hexes) obj.clues.push(pc.name);
            });
        });
        clueCombinations.push(obj);
    });
    createCombinationsList(clueCombinations);
}

function whiteHex(e) {
    fullMap.forEach(he2 => {
        if (this.hex.id === he2.id) {
            const point = he2.toPoint();
            point.y += 5;
            const corners = he2.corners().map(corner => corner.add(point));
            const [firstCorner, ...otherCorners] = corners;
            const graphics = new PIXI.Graphics();

            // graphics.beginFill(0x00ff00, 0.31);
            graphics.beginFill(0xffffff, 0.31);

            graphics.moveTo(firstCorner.x, firstCorner.y);

            otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));

            graphics.lineTo(firstCorner.x, firstCorner.y);

            graphics.endFill();
            app.stage.addChild(graphics);
        }
    });
}

function grayHex(e) {
    fullMap.forEach(he2 => {
        let boo = false;
        this.hex.hexes.forEach(he => {
            if (he.id === he2.id) {
                boo = true;
            }
        });
        if (!boo) {
            const point = he2.toPoint();
            point.y += 5;
            const corners = he2.corners().map(corner => corner.add(point));
            const [firstCorner, ...otherCorners] = corners;
            const graphics = new PIXI.Graphics();

            // graphics.beginFill(0x000000, 0.35);
            graphics.beginFill(0xff0000, 0.35);

            graphics.moveTo(firstCorner.x, firstCorner.y);

            otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));

            graphics.lineTo(firstCorner.x, firstCorner.y);

            graphics.endFill();
            app.stage.addChild(graphics);
        }
    });
}

function handleChange(clue, clue1, clue2, clue3, clue4, clue5) {
    if (clue1.id === 0) {
        clue1 = clue;
    } else if (clue2.id === 0) {
        clue2 = clue;
    } else if (clue3.id === 0) {
        clue3 = clue;
    } else if (clue4.id === 0) {
        clue4 = clue;
    } else if (clue5.id === 0) {
        clue5 = clue;
    }

    seekSolution(globalCombined, clue1, clue2, clue3, clue4, clue5)
}
