function createCombinationsList(clueCombinations) {
    console.time('createCombinationsList');
    const clues = document.getElementById('possibleClueCombinations');
    clues.innerHTML = '';

    const count = document.createElement('h3');
    count.innerHTML = `Possible clue combinations count: ${clueCombinations.length}`;
    clues.appendChild(count);
    clueCombinations.forEach(l => {
        const list = document.createElement('ul');
        l.clues.forEach(c => {
            const item = document.createElement('li');
            item.innerText = c;
            list.appendChild(item);
        });
        const item = document.createElement('li');
        item.innerText = `Answer: {${l.hex.x},${l.hex.y}}`;
        list.appendChild(item);
        clues.appendChild(list);
    });
    console.timeEnd('createCombinationsList');
}

function createList(clues, round, clue1 = {id:0}, clue2 = {id:0}, clue3 = {id:0}, clue4 = {id:0}, clue5 = {id:0}) {
    console.time('createList');
    const poss = document.querySelector('#possibilities');
    poss.innerHTML = '';
    const selectedClues = document.createElement('p');
    let stuff = '<h2>Clues</h2>';

    if (clue1.id !== 0) {
        stuff = `${stuff}<br>${clue1.name}`;
    }
    if (clue2.id !== 0) {
        stuff = `${stuff}<br>${clue2.name}`;
    }
    if (clue3.id !== 0) {
        stuff = `${stuff}<br>${clue3.name}`;
    }
    if (clue4.id !== 0) {
        stuff = `${stuff}<br>${clue4.name}`;
    }
    if (clue5.id !== 0) {
        stuff = `${stuff}<br>${clue5.name}`;
    }

    selectedClues.innerHTML = stuff;
    poss.prepend(selectedClues);

    const title = document.createElement("h3");
    // title.innerText = (round > globalPlayerAmount) ? 'Answer' : `Clue: ${round}`;
    title.innerText = (possibleSolution.length === 1) ? 'Answer' : `Clue: ${round}`;
    poss.appendChild(title);
    const ptag = document.createElement('p');
    let txt = '';

    drawMap(fullMap, globalOrder, globalStructures);

    possibleSolution.forEach(t => {
        txt += `{${t.x},${t.y}} - `;
        const hh = fullMap.get([t.x, t.y]);
        if (clue1.id !== 0) {
            const gg = whiteHex.bind({hex:hh});
            gg();
        }
        if (clue2.id !== 0) {
            const gg = whiteHex.bind({hex:hh});
            gg();
        }
        if (clue3.id !== 0) {
            const gg = whiteHex.bind({hex:hh});
            gg();
        }
        if (clue4.id !== 0) {
            const gg = whiteHex.bind({hex:hh});
            gg();
        }
        if (clue5.id !== 0) {
            const gg = whiteHex.bind({hex:hh});
            gg();
        }
    });
    ptag.innerText = txt.slice(0, -3);
    clues.sort((a, b) => {
        const keyA = a.id;
        const keyB = b.id;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    for (let i = 0; i < clues.length; i++) {
        // advanced rules, remove opposite clues
        if (clues[i].opposite === clue1.id
            || clues[i].opposite === clue2.id
            || clues[i].opposite === clue3.id
            || clues[i].opposite === clue4.id
            || clues[i].opposite === clue5.id
        ) {
            // console.log(clues[i]);
            continue;
        }
        if (clues[i].id !== clue1.id
            && clues[i].id !== clue2.id
            && clues[i].id !== clue3.id
            && clues[i].id !== clue4.id
            && clues[i].id !== clue5.id ) {
            const lab = document.createElement("label");
            lab.setAttribute("for", `${clues[i].id}-${round}`);
            lab.innerText = clues[i].name;
            const inp = document.createElement("input");
            inp.setAttribute('type', 'radio');
            inp.setAttribute('name', `round-${round}`);
            inp.setAttribute('value', clues[i].id);
            inp.setAttribute('id', `${clues[i].id}-${round}`);
            // inp.addEventListener('change', handleChange);
            inp.addEventListener('change', function _handleChange() {
                if (clue1.id === 0) {
                    clue1 = clues[i];
                } else if (clue2.id === 0) {
                    clue2 = clues[i];
                } else if (clue3.id === 0) {
                    clue3 = clues[i];
                } else if (clue4.id === 0) {
                    clue4 = clues[i];
                } else if (clue5.id === 0) {
                    clue5 = clues[i];
                }
                seekSolution(globalCombined, clue1, clue2, clue3, clue4, clue5);
            });
            const br = document.createElement('br');
            poss.appendChild(lab);
            poss.appendChild(inp);
            poss.appendChild(br);
        }
    }
    if (clue1.id !== 0) {
        const gg = grayHex.bind({hex:clue1});
        gg();
    }
    if (clue2.id !== 0) {
        const gg = grayHex.bind({hex:clue2});
        gg();
    }
    if (clue3.id !== 0) {
        const gg = grayHex.bind({hex:clue3});
        gg();
    }
    if (clue4.id !== 0) {
        const gg = grayHex.bind({hex:clue4});
        gg();
    }
    if (clue5.id !== 0) {
        const gg = grayHex.bind({hex:clue5});
        gg();
    }
    poss.appendChild(ptag);
    console.timeEnd('createList');
}
