document.addEventListener('DOMContentLoaded', () => {

    var ReqAnim;
    var boardcol = 20;
    var boardrow = 20;
    var squares = [];
    var direction = 'LEFT';
    var before_direct = ''
    var boros_mode = 'guard';
    var boros_c = 0;
    var skor = 0;
    
    var level = 0;
    var k_level = 100;
    var fps = 150;
    var mrboros = [];

    var board_set = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 1],
  [1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2, 1],
  [1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 1, 0, 2, 1],
  [1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 5, 1],
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

];

    world = board_set;

    const grid = document.querySelector('.grid');
    var curr_kokom_post = [];
    var OBJ_MOVE_DIR = [
        'UP',
        'DOWN',
        'LEFT',
        'RIGHT'
    ]

    function createBoard() {

        for (let i = 0; i < boardrow; i++) {
            for (let j = 0; j < boardcol; j++) {
                const square = document.createElement('div')

                square.setAttribute('class', 's-board');
                switch (board_set[i][j]) {
                    case 1:
                        //Wall
                        square.style.backgroundColor = '#673ab7';
                        break;
                    case 2:
                        //Dots
                        //square.style.backgroundColor = 'black';
                        break;
                    case 5:
                        //kokom
                        curr_kokom_post = [16, 18];
                        break;
                    case 0:
                        //No Dots
                        square.style.backgroundColor = 'black';
                        break;
                    case 9:
                        //Lairs
                        square.style.backgroundColor = 'black';
                        break;
                    case 7:
                        //square.style.backgroundImage = 'url(assets/boros_30.png)';  
                        break;

                }

                square.setAttribute('id', 'tiles_' + i + '_' + j);
                grid.appendChild(square)
                squares.push(square)

            }
            //console.log(i);
        }
    }

    function positionhero() {
        //board_set
        let nextmove
        let s_row = 0;
        let c_col = 0;
        let n_row = 0;
        let n_col = 0;

        s_row = curr_kokom_post[0];
        s_col = curr_kokom_post[1];

        if (direction == 'UP') {
            nextmove = board_set[s_row - 1][s_col];
            if (nextmove != 1) {
                n_row = s_row - 1;
                n_col = s_col;
            }
        }

        if (direction == 'DOWN') {
            nextmove = board_set[s_row + 1][s_col];
            if (nextmove != 1) {
                n_row = s_row + 1;
                n_col = s_col;
            }
        }

        if (direction == 'LEFT') {

            nextmove = board_set[s_row][s_col - 1];

            if (nextmove != 1) {
                n_row = s_row;
                n_col = s_col - 1;
                //mrkokom.style.transform = "scaleX(-1)";
                TweenLite.to(mrkokom, 0, {
                    scaleX: 1,
                    ease: Linear.easeNone
                });
            }
        }

        if (direction == 'RIGHT') {
            nextmove = board_set[s_row][s_col + 1];
            if (nextmove != 1) {
                n_row = s_row;
                n_col = s_col + 1;
                TweenLite.to(mrkokom, 0, {
                    scaleX: -1,
                    ease: Linear.easeNone
                });
            }
        }

        if (n_col != 0 && n_row != 0) {
            board_set[s_row][s_col] = 0;
            board_set[n_row][n_col] = 5;

            //New position

            TweenLite.to(mrkokom, 0.15, {
                x: document.getElementById('tiles_' + n_row + '_' + n_col).offsetLeft,
                y: document.getElementById('tiles_' + n_row + '_' + n_col).offsetTop,
                ease: Linear.easeNone
            });

            //Reset old Position
            curr_kokom_post = [n_row, n_col];
            // Mr Boros object move 

        } else {
            direction = before_direct;
        }
        level++;
        skor += 10;

        if (level > k_level) {
            level = 0;
            pushNewBoros();
            k_level += 100;
        }
        updateskor();

        diempee.forEach(diem => {
            if (diem.ifeaten()) {
                diem.respawn()
            }
        })
        //console.clear();
    }

    createBoard();
    //
    TweenLite.to(mrkokom, 0, {
        x: tiles_16_18.offsetLeft,
        y: tiles_16_18.offsetTop,
        ease: Sine.easeOut
    });


    var f = 0;

    document.addEventListener('keydown', function (e) {
        before_direct = direction;

        let nextmove;
        let s_row = 0;
        let c_col = 0;

        let n_row = 0;
        let n_col = 0;

        s_row = curr_kokom_post[0];
        s_col = curr_kokom_post[1];

        switch (e.keyCode) {
            case 38:
                //UP Arrow
                nextmove = board_set[s_row - 1][s_col];
                if (nextmove != 1) {
                    direction = 'UP'
                }
                break;
            case 40:
                //Down Arrow
                nextmove = board_set[s_row + 1][s_col];
                if (nextmove != 1) {
                    direction = 'DOWN';
                }
                break;
            case 37:
                //Left Arrow
                nextmove = board_set[s_row][s_col - 1];
                if (nextmove != 1) {
                    direction = 'LEFT';
                }
                break;
            case 39:
                //Right Arrow       
                nextmove = board_set[s_row][s_col + 1];
                if (nextmove != 1) {
                    direction = 'RIGHT';
                }
                break;
        }
    });

    function pushNewBoros() {
        masuk.currentTime = 0;
        masuk.play();
        boroses.push(new Boros('bor', [1, 1], Math.floor(Math.random() * 4)));
    }

    function gameover() {
        kena.play();
        gamover.style.display = 'block';
        TweenLite.to(gamover, 0.2, {
            opacity: 1,
            scale: 1,
            ease: Expo.easeOut
        });
        
        clearInterval(ReqAnim);
        clearInterval(Reqboros);
    }

    function startthegame() {
        positionhero();
    }

    function updateskor() {
        skcontainer.innerHTML = "Skor : " + skor;
    }

    class Diem {
        constructor(idDiem, startIndex) {
            this.idDiem = idDiem
            this.n_row = startIndex[0];
            this.n_col = startIndex[1];

            this.b_diem = document.createElement('img');
            this.b_diem.setAttribute('id', idDiem);
            this.b_diem.setAttribute('class', 'b-oros-obj');
            this.b_diem.setAttribute('src', 'assets/diem.png');
            grid.appendChild(this.b_diem);

            TweenLite.to(this.b_diem, 0, {
                x: document.getElementById('tiles_' + parseInt(startIndex[0]) + '_' + parseInt(startIndex[1])).offsetLeft,
                y: document.getElementById('tiles_' + parseInt(startIndex[0]) + '_' + parseInt(startIndex[1])).offsetTop,
                ease: Linear.easeNone
            });

        }

        ifeaten() {
            if (board_set[this.n_row][this.n_col] == 5) {
                TweenLite.to(this.b_diem, 0.2, {
                    scale: 2,
                    opacity: 0,
                    ease: Sine.easeOut
                });
                makan.currentTime = 0;
                makan.play();
                skor += 500;
                return true
            }
        }

        respawn() {
            //this.get_random()
            
            let n_row = 0;
            let n_col = 0;
            
            do {
                n_row = Math.floor(Math.random() * 20);
                n_col = Math.floor(Math.random() * 20);    
            }while(board_set[n_row][n_col] == 1);
            
            this.n_row = n_row;
            this.n_col = n_col;
            
            TweenLite.to(this.b_diem, 0, {
                x: document.getElementById('tiles_' + parseInt(n_row) + '_' + parseInt(n_col)).offsetLeft,
                y: document.getElementById('tiles_' + parseInt(n_row) + '_' + parseInt(n_col)).offsetTop,
                ease: Linear.easeNone, delay:1
            });
            
            TweenLite.to(this.b_diem, 0.3, {
                scale: 1,
                opacity: 1,
                ease: Sine.easeOut, delay:1
            });

        }

        get_random() {
            
            let n_row = 0;
            let n_col = 0;
            
            do {
                n_row = Math.floor(Math.random() * 20);
                n_col = Math.floor(Math.random() * 20);    
            }while(board_set[n_row][n_col] != 1);
            
            //console.log(filtered);
        }

    }

    class Boros {
        constructor(className, startIndex, speed) {
            this.idName = className;
            this.startIndex = startIndex;
            this.initPos = startIndex;
            this.speed = speed;

            this.boros_dir = OBJ_MOVE_DIR[Math.floor(Math.random() * OBJ_MOVE_DIR.length)];

            this.n_row = this.startIndex[0];
            this.n_col = this.startIndex[1];

            this.b_oros = document.createElement('img');
            this.b_oros.setAttribute('id', className);
            this.b_oros.setAttribute('class', 'b-oros-obj');
            this.b_oros.setAttribute('src', 'assets/boros_30.png');
            grid.appendChild(this.b_oros);

            TweenLite.to(this.b_oros, 0, {
                x: document.getElementById('tiles_' + parseInt(this.startIndex[0]) + '_' + parseInt(this.startIndex[1])).offsetLeft,
                y: document.getElementById('tiles_' + parseInt(this.startIndex[0]) + '_' + parseInt(this.startIndex[1])).offsetTop,
                ease: Linear.easeNone
            });
        }

        boros_ai() {
            let nextmove;
            let s_row = 0;
            let s_col = 0;
            let k_col = 0;
            let k_row = 0;

            s_row = this.startIndex[0];
            s_col = this.startIndex[1];

            if (boros_mode == 'guard') {
                k_row = this.initPos[0];
                k_col = this.initPos[1];
                //console.log(this.initPos);
            } else {
                k_row = curr_kokom_post[0];
                k_col = curr_kokom_post[1];
                //console.log('keras');
                switch (this.speed) {
                    case 4:
                        k_col += 2;
                        break;
                    case 2:
                        k_row -= 2;
                        break;
                    case 3:
                        k_col += 3;
                        break;
                    default:
                        break;
                }

                if (k_row > 24 || k_row < 0) {
                    k_row = curr_kokom_post[0];
                }
                if (k_col > 20 || k_col < 0) {
                    k_row = curr_kokom_post[1];
                }

            }
            var t;
            var del = 0;


            t = findPath(world, [s_row, s_col], [k_row, k_col]);

            if (t.length > 0) {
                t = findPath(world, [s_row, s_col], [curr_kokom_post[0], curr_kokom_post[1]]);
            }
            if (t.length > 0) {
                TweenLite.to(this.b_oros, 0.2, {
                    x: document.getElementById('tiles_' + t[1][0] + '_' + t[1][1]).offsetLeft,
                    y: document.getElementById('tiles_' + t[1][0] + '_' + t[1][1]).offsetTop,
                    ease: Linear.easeNone
                });

                this.startIndex[0] = t[1][0];
                this.startIndex[1] = t[1][1];


                if (board_set[t[1][0]][t[1][1]] == 5) {
                    gameover();
                }

                board_set[s_row][s_col] = 2;
                board_set[t[1][0]][t[1][1]] = 9;

            }
        }

        boros_move() {
            let nextmove;
            let s_row = 0;
            let s_col = 0;
            let timerBoros;

            s_row = this.startIndex[0];
            s_col = this.startIndex[1];

            if (!this.change_dir) {
                this.boros_dir = OBJ_MOVE_DIR[Math.floor(Math.random() * OBJ_MOVE_DIR.length)];
                this.change_dir = true;
            }

            //console.log(this.idName)

            if (this.boros_dir == "UP") {
                nextmove = board_set[s_row - 1][s_col];
                if (nextmove != 1) {
                    this.n_row = s_row - 1;
                    this.n_col = s_col;
                } else {
                    this.change_dir = false;
                }
            }
            if (this.boros_dir == "DOWN") {
                nextmove = board_set[s_row + 1][s_col];
                if (nextmove != 1) {
                    this.n_row = s_row + 1;
                    this.n_col = s_col;
                } else {
                    this.change_dir = false;
                }


            }
            if (this.boros_dir == "LEFT") {
                nextmove = board_set[s_row][s_col - 1];
                if (nextmove != 1) {
                    this.n_row = s_row;
                    this.n_col = s_col - 1;
                } else {
                    this.change_dir = false;
                }
            }
            if (this.boros_dir == "RIGHT") {
                nextmove = board_set[s_row][s_col + 1];
                if (nextmove != 1) {
                    this.n_row = s_row;
                    this.n_col = s_col + 1;
                } else {
                    this.change_dir = false;
                }
            }

            //New position

            TweenLite.to(this.b_oros, 0.2, {
                x: document.getElementById('tiles_' + this.n_row + '_' + this.n_col).offsetLeft,
                y: document.getElementById('tiles_' + this.n_row + '_' + this.n_col).offsetTop,
                ease: Linear.easeNone
            });

            //Reset old Position
            this.startIndex[0] = this.n_row;
            this.startIndex[1] = this.n_col;



        }

    }

    boroses = [
        new Boros('bor1', [4, 2], 1),
        //new Boros('bor2', [12, 8], 2),
        //new Boros('bor3', [12, 9], 3),
        //new Boros('bor4', [1, 11], 4),    
    ]
    TweenLite.to(boardgrid, 0, {
        scale: 1.5,
        ease: Sine.easeOut
    });
    

    diempee = [
        new Diem('d1', [18, 10]),
    ]

    TweenLite.to(gamover, 0, {
            opacity: 0,
            scale: 2,
            ease: Expo.easeOut
        });
    
    
    mulai.addEventListener('click', () => {
        mulai.style.display = 'none';
        TweenLite.to(howto, 0.5, {
            opacity: 1,
            scale: 1,
            ease: Sine.easeOut
        });
        
        serverrun.play();
        TweenLite.to(boardgrid, 0.5, {
            opacity: 1,
            scale: 1,
            ease: Sine.easeOut
        });

        

    });
    
    
    howto.addEventListener('click', ()=> {
       howto.style.display = 'none'; 
       ReqAnim = setInterval(function () {
            startthegame();
        }, fps);
        Reqboros = setInterval(function () {

            boroses.forEach(boros => {
                boros.boros_ai();
            })

            boros_c++;
            if (boros_c < 50) {
                boros_mode = 'guard'
            } else {
                boros_mode = 'kejar';
                if (boros_c > 60) {
                    boros_c = 0;
                }
            }

        }, 200);    
    });
});
