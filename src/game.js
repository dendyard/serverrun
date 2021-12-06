document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const width = 13
    const heght = 13
    var squares = []
    var acttile = [0, 0];

    var cl1 = '';
    var cl2 = '';

    var valcard;

    var tiles = [
[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
];

var tiles2 = [
[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
];
    var cardsset = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 0, 
6, 6, 7, 7, 8, 8, 9, 9, 1, 1, 0, 
2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 0, 
7, 7, 8, 8, 9, 9, 1, 1, 2, 2, 0, 
3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 0, 
8, 8, 9, 9, 1, 1, 2, 2, 3, 3, 0, 
4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 0, 
9, 9, 1, 1, 2, 2, 3, 3, 4, 4, 0, 
5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 0, 
1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 0, 
6, 6, 7, 7, 8, 8, 9, 9, 1, 1, 0
];

    const colortile = [
    '#eee',
    '#e0e065',
    '#657ae0',
    'black'
]


    const cards = [
    '',
    'assets/t1.png',
    'assets/t2.png',
    'assets/t3.png',
    'assets/t4.png',
    'assets/t5.png',
    'assets/t6.png',
    'assets/t7.png',
    'assets/t8.png',
    'assets/t9.png',
        
]

    function Shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };


    Shuffle(cardsset);


    function createBoard() {

        let tcount = 0;
        world = tiles;
        cardfaceshuffle = 0;

        for (var i = 0; i < width; i++) {
            //Col
            for (var j = 0; j < heght; j++) {
                //Row
                const square = document.createElement('div')

                if (j != 0 && j != 12 && i != 0 && i != 12) {
                    square.style.backgroundImage = 'url(' + cards[cardsset[cardfaceshuffle]] + ')'
                    tiles[j][i] = cardsset[cardfaceshuffle];

                    cardfaceshuffle++

                } else {
                    tiles[j][i] = 10;
                }

                square.setAttribute('id', 'tiles_' + j + '_' + i)
                square.setAttribute('y', j)
                square.setAttribute('x', i)

                grid.appendChild(square)
                squares.push(square)

            }
            tcount++

            if (tcount > 9) {
                tcount = 0
            }
        }

        console.log(tiles);
    }


    createBoard();
    TweenLite.to(container, 0, {
        height: '772px',
        ease: Back.easeOut
    });

    mulai.addEventListener('click', function () {
        lockscreen.style.display = 'none';
        kar.style.display = 'block';
        kenalan.style.display = 'block';
        gametimer.style.display = 'block';
        setInterval(setTime, 1000);

        bgsfx.play();
        TweenLite.to(mulai, 0.5, {
            scale: 0,
            ease: Sine.easeOut
        });
        TweenLite.to(container, 0.5, {
            height: '1195px',
            ease: Back.easeOut
        });
        TweenLite.to(boardgrid, 1, {
            opacity: 1,
            ease: Sine.easeOut,
            delay: 1.5
        });
    })
    squares.forEach(square => square.addEventListener('click', tileclick));


    function tileclick(e) {

        let yvalue = parseInt(e.target.getAttribute('y'));
        let xvalue = parseInt(e.target.getAttribute('x'));

        let tvalue = tiles[parseInt(yvalue)][parseInt(xvalue)];


        if (tvalue != 0 && tvalue != 10) {

            e.target.style.zIndex = 100;

            if (cl1 == '') {
                cl1 = e.target.id;
                pathStart = [yvalue, xvalue];

                TweenLite.to(e.target, 0.3, {
                    scale: 2,
                    ease: Back.easeOut
                });
                valcard = tvalue;

                acttile[0] = e.target;
                acttile[0].style.pointerEvents = 'none';
                pilih.currentTime = 0;
                pilih.play();
            } else {
                if (cl2 == '') {
                    console.log('valcard : ' + valcard);
                    console.log('tvalue : ' + tvalue);
                    acttile[1] = e.target;
                    acttile[1].style.pointerEvents = 'none';
                    //only do check if the card are same
                    if (valcard == tvalue) {

                        cl2 = e.target.id;

                        pathEnd = [parseInt(yvalue), parseInt(xvalue)];
                        currentPath = findPath(world, pathStart, pathEnd);

                        TweenLite.to(e.target, 0.3, {
                            scale: 2,
                            ease: Back.easeOut
                        });

                        if (redraw() > 0) {
                            //Hide Match tiles
                            acttile[0].style.opacity = '0';
                            acttile[1].style.opacity = '0';
                            tiles[parseInt(acttile[0].getAttribute('y'))][parseInt(acttile[0].getAttribute('x'))] = 0;
                            tiles[parseInt(acttile[1].getAttribute('y'))][parseInt(acttile[1].getAttribute('x'))] = 0;
                            jadi.currentTime = 0;
                            jadi.play();
                            
                            if (!checkIfWeWin()) {
                                alert('Yeah kamu menang!');
                            }
                        } else {
                            // restore value
                            world[pathEnd[0]][pathEnd[1]] = tempEnd;
                            pilih.currentTime = 0;
                            pilih.play();
                        }

                        cl1 = '';
                        cl2 = '';
                        valcard = '';
                        TweenLite.to(acttile[0], 0.3, {
                            scale: 1,
                            ease: Back.easeOut,
                            delay: 0.5
                        });
                        TweenLite.to(acttile[1], 0.3, {
                            scale: 1,
                            ease: Back.easeOut,
                            delay: 0.5
                        });
                        acttile[0].style.zIndex = 1;
                        acttile[1].style.zIndex = 1;
                    } else {
                        TweenLite.to(acttile[0], 0.3, {
                            scale: 1,
                            ease: Back.easeOut
                        });
                        cl1 = '';
                        cl2 = '';

                        valcard = '';
                        acttile[0].style.zIndex = 1;
                        acttile[1].style.zIndex = 1;

                    }
                }
                acttile[0].style.pointerEvents = 'auto';
                acttile[1].style.pointerEvents = 'auto';
            }
        }
    }
    

    function checkIfWeWin() {
        let notwin = false;
        for (var i = 0; i < width; i++) {
            if (!notwin) {
                for (var j = 0; j < heght; j++) {
                    console.log('check array : ' + tiles[j][i]);
                    if (tiles[j][i] != 0 && tiles[j][i] != 10) {
                        notwin = true;
                        break;
                    }
                }
            }else{
                notwin = true;
                break;
            }
        }
        return notwin;
        
    }
    
    //console.log('ora win : ' + checkIfWeWin())
    //checkIsThereAway();
    function checkIsThereAway(c) {
        var cc = c.split(',');

        let ptx = parseInt(cc[0]);
        let pty = parseInt(cc[1]);
        var canmove = 0;
        console.log('X nya : --> ' + (ptx))
        console.log('Y nya : --> ' + (pty))


        //Is Open Tile
        if (tiles[ptx - 1][pty] != 0) {
            canmove++;
        }
        if (tiles[ptx + 1][pty] != 0) {
            canmove++;
        }

        if (tiles[ptx][pty - 1] != 0) {
            canmove++;
        }
        if (tiles[ptx][pty + 1] != 0) {
            canmove++;
        }

        if (canmove < 4) {
            console.log('Bisa gerak')
        } else {
            console.log('Tidak bisa gerak')
        }

        console.log(canmove);

    }




});
