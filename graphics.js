// const tile1 = [
//     [
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'forest', animal: -1 }
//     ],
//     [
//         { type: 'swamp', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'forest', animal: -1 }
//     ],
//     [
//         { type: 'swamp', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'desert', animal: 0 },
//         { type: 'desert', animal: 0 },
//         { type: 'forest', animal: 0 }
//     ]
// ];
//
// const tile2 = [
//     [
//         { type: 'swamp', animal: 1 },
//         { type: 'forest', animal: 1 },
//         { type: 'forest', animal: 1 },
//         { type: 'forest', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'forest', animal: -1 }
//     ],
//     [
//         { type: 'swamp', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'desert', animal: -1 }
//     ],
//     [
//         { type: 'swamp', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'desert', animal: -1 }
//     ]
// ];
//
// const tile3 = [
//     [
//         { type: 'swamp', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'water', animal: -1 }
//     ],
//     [
//         { type: 'swamp', animal: 1 },
//         { type: 'swamp', animal: 1 },
//         { type: 'forest', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 }
//     ],
//     [
//         { type: 'mountain', animal: 1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 }
//     ]
// ];
//
// const tile4 = [
//     [
//         { type: 'desert', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 }
//     ],
//     [
//         { type: 'desert', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: 1 }
//     ],
//     [
//         { type: 'desert', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'forest', animal: 1 }
//     ]
// ];
//
// const tile5 = [
//     [
//         { type: 'swamp', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: -1 }
//     ],
//     [
//         { type: 'swamp', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'mountain', animal: -1 },
//         { type: 'mountain', animal: 0 }
//     ],
//     [
//         { type: 'desert', animal: -1 },
//         { type: 'desert', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: 0 },
//         { type: 'water', animal: 0 }
//     ]
// ];
//
// const tile6 = [
//     [
//         { type: 'desert', animal: 0 },
//         { type: 'desert', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'forest', animal: -1 }
//     ],
//     [
//         { type: 'mountain', animal: 0 },
//         { type: 'mountain', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'swamp', animal: -1 },
//         { type: 'forest', animal: -1 },
//         { type: 'forest', animal: -1 }
//     ],
//     [
//         { type: 'mountain', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'water', animal: -1 },
//         { type: 'forest', animal: -1 }
//     ]
// ];
//
// const app = new PIXI.Application({ transparent: true, antialias: true });
// const graphics = new PIXI.Graphics();
//
// // const Hex = Honeycomb.extendHex({ size: 30, orientation: 'flat' });
// // const Grid = Honeycomb.defineGrid(Hex);
// app.view.width = 560;
// document.body.appendChild(app.view);
// graphics.lineStyle(2, 0xFFFFFF);
//
// function drawMap(map, order) {
//     console.time();
//
//     map.forEach(hex => {
//         const point = hex.toPoint();
//         point.y += 5;
//
//         const corners = hex.corners().map(corner => corner.add(point));
//         hex.id = id;
//         id++;
//
//         const [firstCorner, ...otherCorners] = corners;
//         let color = null;
//
//         const rowHex = order[hex.y][hex.x];
//         switch (rowHex.type) {
//             case 'forest':
//                 hex.type = 'forest';
//                 color = 0x00AA00;
//                 break;
//             case 'water':
//                 hex.type = 'water';
//                 color = 0x0000EE;
//                 break;
//             case 'swamp':
//                 hex.type = 'swamp';
//                 color = 0xAA00AA;
//                 break;
//             case 'desert':
//                 hex.type = 'desert';
//                 color = 0xAAAA00;
//                 break;
//             case 'mountain':
//                 hex.type = 'mountain';
//                 color = 0x999999;
//                 break;
//             default:
//                 color = 0x0000FF;
//         }
//
//         graphics.beginFill(color);
//
//         graphics.moveTo(firstCorner.x, firstCorner.y);
//
//         otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));
//
//         graphics.lineTo(firstCorner.x, firstCorner.y);
//
//         graphics.endFill();
//
//         graphics.lineStyle(2, 0xFFFFFF);
//
//         let text = new PIXI.Text(`{${hex.x}, ${hex.y}}`, {fontFamily : 'Arial', fontSize: 12, fill : 0x000000, align : 'center', strokeThickness: 1});
//         text.position.x = firstCorner.x - 40;
//         text.position.y = firstCorner.y - 10;
//
//         app.stage.addChild(text);
//     });
//
//     // animal borders
//     map.forEach(hex => {
//         const point = hex.toPoint();
//         point.y += 5;
//
//         const corners = hex.corners().map(corner => corner.add(point));
//
//         const [firstCorner, ...otherCorners] = corners;
//         let color = null;
//
//         const rowHex = order[hex.y][hex.x];
//         if (rowHex.animal !== -1) {
//             switch (rowHex.animal) {
//                 case 0:
//                     hex.animal = 'bear';
//                     graphics.lineStyle(2, 0x000000);
//                     break;
//                 case 1:
//                     hex.animal = 'cougar';
//                     graphics.lineStyle(2, 0xFF0000);
//                     break;
//                 default:
//                     break;
//             }
//
//             graphics.moveTo(firstCorner.x, firstCorner.y);
//
//             otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));
//
//             graphics.lineTo(firstCorner.x, firstCorner.y);
//
//             graphics.lineStyle(2, 0xFFFFFF);
//         }
//     });
//     app.stage.addChild(graphics);
//     app.stage.children.reverse();
//
//     console.timeEnd();
// }

function drawShack(hex, color, rgb) {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(2, (rgb === 0x000000) ? 0xffffff : 0x000000);
    const point = hex.toPoint();
    const corners = hex.corners().map(corner => corner.add(point));
    const [firstCorner, ...otherCorners] = corners;

    graphics.beginFill(rgb);

    const origin = -20;

    graphics.moveTo(firstCorner.x + origin, firstCorner.y + 15);

    graphics.lineTo(firstCorner.x + origin - 20, firstCorner.y + 15);
    graphics.lineTo(firstCorner.x + origin - 10, firstCorner.y - 5);

    graphics.lineTo(firstCorner.x + origin, firstCorner.y + 15);

    graphics.endFill();
    hex.structure = {
        type: 'shack',
        color
    };

    Object.assign(graphics, {hex});

    app.stage.addChild(graphics);
}

function drawStone(hex, color, rgb) {
    const graphics = new PIXI.Graphics();

    graphics.lineStyle(2, (rgb === 0x000000) ? 0xffffff : 0x000000);
    const point = hex.toPoint();
    const corners = hex.corners().map(corner => corner.add(point));
    const [firstCorner, ...otherCorners] = corners;

    graphics.beginFill(rgb);

    graphics.drawCircle(firstCorner.x - 30, firstCorner.y + 5, 10);

    graphics.endFill();

    hex.structure = {
        type: 'stone',
        color
    };

    Object.assign(graphics, {hex});

    app.stage.addChild(graphics);
}
