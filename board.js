// Create one dimensional array 
var board = new Array(9); 
var player1 = "x";
var player1_king = "X";
var player2 = "o";
var player2_king = "O";
var blankSpace = ".";
var turn = "player1";
var lastMove = [0,0];
var justMove = true;

var emptyCell = {"piece": blankSpace, "player": "none", type: ""};
var haveToEat = false; //start state

// Loop to create 2D array using 1D array 
for (var i = 0; i < 9; i++) { 
    board[i] = []; 
} 

for (var i = 1; i <= 8; i++) { 
    for (var j = 1; j <= 8; j++) { 
        board[i][j] = new Object();
        board[i][j].piece = blankSpace; 
        board[i][j].player = "";
        board[i][j].type = "";
    } 
} 

function printBoard(){
    str="0 1 2 3 4 5 6 7 8 \n";
    for (var i = 1; i <= 8; i++) { 
        str+=i+" ";
        for (var j = 1; j <= 8; j++) { 
            str+=board[i][j].piece+" ";
            if(j%8==0){
                str += "\n";
            }            
        } 
    } 
    console.log(str);
    console.log("turn:"+turn);
    console.log("have to eat:"+haveToEat);
}

function startPosition(){
    haveToEat = false;
    //player2
    for (var i = 1; i <= 2; i++) { 
        for (var j = 1; j <= 8; j++) { 
            if((i+j)%2==0){
                board[i][j].piece = player2;
                board[i][j].player = "player2";
                board[i][j].type = "checker";
            }        
        } 
    }
    //blankSpace
    for (var i = 3; i <= 6; i++) { 
        for (var j = 1; j <= 8; j++) { 
            board[i][j] = emptyCell;   
        } 
    }
    //player1
    for (var i = 7; i <= 8; i++) { 
        for (var j = 1; j <= 8; j++) { 
            if((i+j)%2==0){
                board[i][j].piece = player1;
                board[i][j].player = "player1";
                board[i][j].type = "checker";
            }        
        } 
    }

    printBoard();
}

function possibleMove(i,j){
    var possibleMove = [];
    
    
    //กินด้วยเบี้ยธรรมดา
    if(board[i][j].type=="checker" ){
        if(board[i][j].player=="player1" ){
            if( ((i-2)>0 && (j-2)>0) && (board[i-2][j-2].player=="none") && (board[i-1][j-1].player=="player2")){
                size = possibleMove.length;
                possibleMove[size] = new Object();
                possibleMove[size].row = i-2;
                possibleMove[size].col = j-2;
                haveToEat = true;
                activeDoubleKill = true;
            }
            if( ((i-2)>0 && (j+2)<9) && (board[i-2][j+2].player=="none") && (board[i-1][j+1].player=="player2")){
                size = possibleMove.length;
                possibleMove[size] = new Object();
                possibleMove[size].row = i-2;
                possibleMove[size].col = j+2;
                haveToEat = true;
                activeDoubleKill = true;
            }
        }else if(board[i][j].player=="player2" ){
            if( ((i+2)<9 && (j-2)>0) && (board[i+2][j-2].player=="none") && (board[i+1][j-1].player=="player1")){
                size = possibleMove.length;
                possibleMove[size] = new Object();
                possibleMove[size].row = i+2;
                possibleMove[size].col = j-2;
                haveToEat = true;
                activeDoubleKill = true;
            }
            if( ((i+2)<9 && (j+2)<9) && (board[i+2][j+2].player=="none") && (board[i+1][j+1].player=="player1")){
                size = possibleMove.length;
                possibleMove[size] = new Object();
                possibleMove[size].row = i+2;
                possibleMove[size].col = j+2;
                haveToEat = true;
                activeDoubleKill = true;
            }
        }
    }
    //เดินด้วยเบี้ยธรรมดา && ไม่มีตาบังคับกินถึงเดินแบบธรรมดาได้
    if(board[i][j].type=="checker" && !haveToEat){
        if(board[i][j].player=="player1" ){
            if( ((i-1)>0 && (j-1)>0) && (board[i-1][j-1].player=="none")){
                size = possibleMove.length;
                possibleMove[size] = new Object()
                possibleMove[size].row = (i-1);
                possibleMove[size].col = (j-1);
            } 
            if( ((i-1)>0 && (j+1)<9) && (board[i-1][j+1].player=="none")){
                size = possibleMove.length;
                possibleMove[size] = new Object();
                possibleMove[size].row = (i-1);
                possibleMove[size].col = (j+1);
            }
        }else if(board[i][j].player=="player2" ){
            if( ((i+1)<9 && (j-1)>0) && (board[i+1][j-1].player=="none")){
                size = possibleMove.length;
                possibleMove[size] = new Object()
                possibleMove[size].row = (i+1);
                possibleMove[size].col = (j-1);
            } 
            if(((i+1)<9 && (j+1)<9) && (board[i+1][j+1].player=="none")){
                size = possibleMove.length;
                possibleMove[size] = new Object();
                possibleMove[size].row = i+1;
                possibleMove[size].col = j+1;
            }
        }
    }

    //กินด้วยฮอส
    if(board[i][j].type=="king" ){
        var num = 1;
        for(row=i+1;row<9;row++){
            if( (row<9) && ((j+num)<9) ){
                //กรณีฮอสสามารถกินได้
                if((board[row][j+num].player != "none") && (board[row][j+num].player != turn) ){
                    if((j+num+1)<9 && ((row+1)<9)){
                        if((board[row][j+num].player != turn) && (board[row][j+num].player != "none") && (board[row+1][j+num+1].player == "none")){
                            size = possibleMove.length;
                            possibleMove[size] = new Object();
                            possibleMove[size].row = row+1;
                            possibleMove[size].col = j+num+1;
                            haveToEat = true;
                            console.log("king can eat at:"+(row+1)+(j+num+1));
                            activeDoubleKill = true;
                        }
                    }
                }
            }
            if( (row<9) && ((j-num)>0) ){
                if((board[row][j-num].player != "none") && (board[row][j-num].player != turn) ){
                    if((j-num-1) > 0 && ((row+1)<9)){
                        if((board[row][j-num].player != turn) && (board[row][j-num].player != "none") && (board[row+1][j-num-1].player == "none")){
                            size = possibleMove.length;
                            possibleMove[size] = new Object();
                            possibleMove[size].row = row+1;
                            possibleMove[size].col = j-num-1;
                            haveToEat = true;
                            console.log("king can eat at:"+(row+1)+(j-num-1));
                            activeDoubleKill = true;
                        }
                    }
                }
            }
            num++;
        }
        num = 1;
        for(row=i-1;row>0;row--){
            if( (row>0) && ((j-num)>0) ){
                if((board[row][j-num].player != "none") && (board[row][j-num].player != turn)){
                    if(((j-num-1)>0) && ((row-1)>0) ){
                        if((board[row][j-num].player != turn) && (board[row][j-num].player != "none") && (board[row-1][j-num-1].player == "none")){
                            size = possibleMove.length;
                            possibleMove[size] = new Object();
                            possibleMove[size].row = row-1;
                            possibleMove[size].col = j-num-1;
                            haveToEat = true;
                            console.log("king can eat at:"+(row-1)+(j-num-1));
                            activeDoubleKill = true;
                        }
                    }
                }
            }
            if( (row>0) && ((j+num)<9) ){
                if((board[row][j+num].player != "none") && (board[row][j+num].player != turn)){
                if(((j+num+1)<9) && ((row-1)>0)){
                        if((board[row][j+num].player != turn) && (board[row][j+num].player != "none") && (board[row-1][j+num+1].player == "none")){
                            size = possibleMove.length;
                            possibleMove[size] = new Object();
                            possibleMove[size].row = row-1;
                            possibleMove[size].col = j+num+1;
                            haveToEat = true;
                            console.log("king can eat at:"+(row-1)+(j+num+1));
                            activeDoubleKill = true;
                        }
                    }
                    
                }
            }
            num++;
        }
    }
    
     //--------------------------------------------
    //เดินด้วยฮอส
    
    if(board[i][j].type=="king" && !haveToEat){
        num = 1;
        console.log("king walk");
        //เฉียงล่างขวา
        for(var row=i+1;row<9;row++){
            if( (row<9) && ((j+num)<9) ){
                //กรณีฮอสมีสิ่งกีดขวาง
                if((board[row][j+num].player != "none")  ){
                  break;
                }else {
                    size = possibleMove.length;
                    possibleMove[size] = new Object();
                    possibleMove[size].row = row;
                    possibleMove[size].col = j+num;
                }
            }
             num++;
        }
        //เฉียงลงซ้าย
        num = 1;
        for(var row=i+1;row<9;row++){
            //กรณีฮอสมีสิ่งกีดขวาง
            if( (row<9) && ((j-num)>0) ){
                if(board[row][j-num].player != "none" ){
                    break;
                }else {
                    
                        size = possibleMove.length;
                        possibleMove[size] = new Object();
                        possibleMove[size].row = row;
                        possibleMove[size].col = j-num;
                    
                }
            }
             num++;
        }
        //เฉียงขึ้นซ้าย
        num = 1;
        for(var row=i-1;row>0;row--){
            //กรณีฮอสมีสิ่งกีดขวาง
            if( (row>0) && ((j-num)>0) ){
                if(board[row][j-num].player != "none"){
                    break;
                }else{
                    //กรณีฮอสไม่มีสิ่งกีดขวาง
                        size = possibleMove.length;
                        possibleMove[size] = new Object();
                        possibleMove[size].row = row;
                        possibleMove[size].col = j-num;
                    
                }
            }
             num++;
        }
        //เฉียงบนขวา
        num = 1;
        for(var row=i-1;row>0;row--){
            //กรณีฮอสมีสิ่งกีดขวาง
            if( (row>0) && ((j+num)<9) ){
                if(board[row][j+num].player != "none"){
                    break;                   
                }else {
                    //กรณีฮอสไม่มีสิ่งกีดขวาง
                        size = possibleMove.length;
                        possibleMove[size] = new Object();
                        possibleMove[size].row = row;
                        possibleMove[size].col = j+num;
                    
                }
            }
             num++;
        }


        
    }

    return possibleMove;
}

function checkHaveToEat(){
    haveToEat = false;
    
    for(i=1;i<9;i++){
        for(j=2-(i%2);j<9;j+=2){
           if(board[i][j].player == turn){
               possibleMove(i,j);
               if(haveToEat){
                   break;
               }
           }
        }
       if(haveToEat){
        break;
       }
    }
    
    return haveToEat;
}

function eatable(i,j){
    var eatable = false;
    //กินด้วยเบี้ยธรรมดา
    if(board[i][j].player=="player1" ){
        if( ((i-2)>0 && (j-2)>0) && (board[i-2][j-2].player=="none") && (board[i-1][j-1].player=="player2")){
            eatable = true;
        }
        if( ((i-2)>0 && (j+2)<9) && (board[i-2][j+2].player=="none") && (board[i-1][j+1].player=="player2")){
            eatable = true;
        }
    }else if(board[i][j].player=="player2" ){
        if( ((i+2)<9 && (j-2)>0) && (board[i+2][j-2].player=="none") && (board[i+1][j-1].player=="player1")){
            eatable = true;
        }
        if( ((i+2)<9 && (j+2)<9) && (board[i+2][j+2].player=="none") && (board[i+1][j+1].player=="player1")){
            eatable = true;
        }
    }
    return eatable;
}

function nextMove(){
    if(turn=="player1"){
        turn = "player2";
    }else{
        turn = "player1";
    }
    checkHaveToEat();
    justMove = true;
}

function move(i1,j1,i2,j2){
    //กรณีกินสองต่อต้องใช้ตัวเดิมกินเท่านั้น
    if(activeDoubleKill && justMove){
        if(!(lastMove[0]==i1 && lastMove[1]==j1) ){
            console.log("la");
            return false;
        }
    }
    
    //เดินเบี้ยธรรมดา หรือ ฮอส
    board[i2][j2] = board[i1][j1];
    
    //กรณีเบี้ยธรรมดากิน
    if(haveToEat && board[i1][j1].type == "checker"){
        if(board[i2][j2].player == "player1"){
            if(j2>j1){
                board[i1-1][j1+1] = emptyCell;
                emptyTheCell(i1-1,j1+1);
            }else{
                board[i1-1][j1-1] = emptyCell;
                emptyTheCell(i1-1,j1-1);
            }
        }else if(board[i2][j2].player == "player2"){
            if(j2>j1){
                board[i1+1][j1+1] = emptyCell;
                emptyTheCell(i1+1,j1+1);
            }else{
                board[i1+1][j1-1] = emptyCell;
                emptyTheCell(i1+1,j1-1);
            }
        }
    }

    //กรณีฮอสกิน
    if(board[i1][j1].type == "king"){
        if(i2>i1){
            if(j2>j1){
                //เฉียงลงขวา
                if(board[i2-1][j2-1].player != turn){
                    board[i2-1][j2-1] = emptyCell;
                    emptyTheCell(i2-1,j2-1);
                }
            }else if(j2<j1){
                //เฉียงลงซ้าย
                if(board[i2-1][j2+1].player != turn){
                    board[i2-1][j2+1] = emptyCell;
                    emptyTheCell(i2-1,j2+1);
                }
            }
        }else if(i2<i1){
            if(j2>j1){
                //เฉียงขึ้นขวา
                if(board[i2+1][j2-1].player != turn){
                    board[i2+1][j2-1] = emptyCell;
                    emptyTheCell(i2+1,j2-1);
                }
            }else if(j2<j1){
                //เฉียงขึ้นซ้าย
                if(board[i2+1][j2+1].player != turn){
                    board[i2+1][j2+1] = emptyCell;
                    emptyTheCell(i2+1,j2+1);
                }
            }
        }
    }

    //สลายตัวที่เดินไปแล้ว
    board[i1][j1] = emptyCell;
    console.log("player:"+board[i1][j1].player+"\n"+i1+j1+i2+j2);
    


    //กรณีกินสองต่อขึ้นไป
    if(  !activeDoubleKill){
      console.log("eatable:"+(!eatable(i2,j2)) +"from"+i1+" "+j1+ " at "+i2+" "+j2);
      activeDoubleKill = false;
      nextMove();  
    }  
    printBoard();
    renderCheckerToCell(i1,j1,i2,j2);

    //กรณีจากเบี้ยเป็นฮอส
    if((board[i2][j2].player == "player1") && (board[i2][j2].type == "checker") && (i2==1)){
        console.log("this case: promote player1");
        promote(i2,j2);
    }else if((board[i2][j2].player == "player2") && (board[i2][j2].type == "checker") && (i2==8)){
        console.log("this case promote player1");
        promote(i2,j2);
    }

    lastMove[0] = i2;
    lastMove[1] = j2;
    justMove = false;
    return true;
}

function emptyTheCell(i,j){
    cell = "cell-"+i+"-"+j;
    doc = document.getElementById(cell);
    doc.innerHTML = "";
    console.log("emptycell:"+i+" "+j);
}

function renderCheckerToCell(i1,j1,i2,j2){
    //ลบ active move 
    var size = Object.keys(obj).length;
    for(i=0;i<size;i++){
        row = obj[i].row;
        col = obj[i].col;
        cell = document.getElementById("cell-"+row+"-"+col);
        cell.innerHTML = "";
        cell.setAttribute('onclick',"renderPossibleMove(this);");
    }
    //สร้างภาพเคลื่อไหว
    old_cell = document.getElementById("cell-"+i1+"-"+j1);
    new_cell = document.getElementById("cell-"+i2+"-"+j2);
    new_cell.innerHTML = old_cell.innerHTML;
    old_cell.innerHTML = "";
    active = [];
    // เปลี่ยนค่า onclick
    new_cell.setAttribute('onclick',"renderPossibleMove(this);");
}

function promote(i,j){
    console.log("promote"+i+j);
    board[i][j].type = "king";
    doc = document.getElementById("cell-"+i+"-"+j);
    doc.innerHTML = "";
    var newDiv = document.createElement("div"); 
    newDiv.classList.add(board[i][j].player+"-king");
    doc.appendChild(newDiv);
}



function test(){
    for (var i = 1; i <= 8; i++) { 
        for (var j = 1; j <= 8; j++) { 
            board[i][j] = new Object();
            board[i][j].piece = blankSpace; 
            board[i][j].player = "none";
            board[i][j].type = "";
        } 
    } 

    board[8][2] = new Object();
    board[8][2].piece = player1_king; 
    board[8][2].player = "player1";
    board[8][2].type = "checker";

    board[7][3] = new Object();
    board[7][3].piece = player2; 
    board[7][3].player = "player2";
    board[7][3].type = "checker";

    board[5][5] = new Object();
    board[5][5].piece = player2; 
    board[5][5].player = "player2";
    board[5][5].type = "checker";

    board[4][8] = new Object();
    board[4][8].piece = player1_king; 
    board[4][8].player = "player1";
    board[4][8].type = "king";

    board[2][6] = new Object();
    board[2][6].piece = player2; 
    board[2][6].player = "player2";
    board[2][6].type = "checker";
    clearBoard();
    printBoard();
    renderBoard();
}