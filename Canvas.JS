//Canvas Setup
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.createImageData(canvas.width, canvas.height);
let Cwidth = canvas.width;
let Cheight = canvas.height;


//Other Variables
let zoom = 20;
let scrollSpeed = 1;
let worldX = 0;
let worldY = 0;
let mode = 0;

//Game Data
//Teams
//color, name
const teamArray = [[255, 0, 0, "Red"], [0, 0, 255, "Blue"]];
const teamOrder = [0, 1];
const curTeam = 0;

//Units
const trenchInf = {
    name: 'Trench Infanty',
    act: 1,
    atk: 3,
    ran: 1,
    mov: 1,
    cost: 4,
    sign: [[-0.8, 0], [-0.8, -0.32], [0.8, -0.32], [0.8, 0], [-0.4, 0], [0.1, 0.5], [-0.4, 0], [-0.4, 0.5], [-0.4, 0], [-0.84, 0.5], [-0.4, 0]],
};
const modernArt = {
    name: 'Artillery',
    act: 1,
    atk: 5,
    ran: 3,
    mov: 1,
    cost: 8,
    sign: [[0.92, 0], [0.92, -0.2], [0.2, -0.2], [0.2, -0.4], [0.08, -0.4], [0.08, -0.2], [-0.2, -0.2], [-0.2, 0], [0, 0], [-0.132, 0.132], [-0.132, 0.264], [-0.8, 0.264], [-0.8, 0.4], [0.2, 0.4], [0.32, 0.28], [0.32, 0.12], [0.2, 0]],
};
const biplaneScout = {
    name: 'Biplane Scout',
    act: 3,
    atk: 2,
    ran: 1,
    mov: 3,
    cost: 9,
    sign: [[-0.88, -0.4], [0.88, -0.4], [0.14, -0.4], [0.34, -0.2], [0.34, 0.08], [0.14, 0.28], [-0.14, 0.28], [-0.34, 0.08], [-0.34, -0.2], [-0.14, -0.4], [0, -0.04], [0.01, -0.64], [-0.01, -0.64], [0, -0.04], [0.6, -0.05], [0.6, -0.03], [0, -0.04], [0.01, 0.56], [-0.01, 0.56], [0, -0.04], [-0.6, -0.05], [-0.6, -0.03], [0, -0.04], [0.14, 0.28], [0.88, 0.28], [-0.88, 0.28], [0.2, 0.28], [0.28, 0.48], [0.2, 0.28], [-0.2, 0.28], [-0.28, 0.48], [-0.2, 0.28], [-0.14, -0.4]],
};
const biplaneFig = {
    name: 'Biplane Fighter',
    act: 3,
    atk: 4,
    ran: 1,
    mov: 2,
    cost: 11,
    sign: [[-0.8,-0.2], [-0.4,0.2], [-0.48,0.32], [-0.4,0.2], [0.28,0.2], [0.2,0.3], [0.28,0.36], [0.36,0.3], [0.28,0.2], [0.68,0.2], [0.68,0.04], [0.88,0], [0.88,0.28], [0.88,-0.28], [0.88,0], [0.68,-0.04], [0.68,-0.2], [0.6,-0.2], [0.56,-0.28], [0.76,-0.28], [0.56,-0.28], [0.48,-0.2], [0.4,-0.2], [0.4,-0.4], [0.6,-0.4], [0.52,-0.48], [0,-0.4], [0.2,-0.4], [0.4,-0.4], [0.4,-0.2], [0.12,-0.2], [0.12,-0.4], [0.12,-0.2], [-0.52,-0.2], [-0.8,-0.48], [-0.8,-0.32], [-0.88,-0.32], [-0.84,-0.32]],
};
const zeppelin = {
    name: 'Zeppelin',
    act: 3,
    atk: 4,
    ran: 1,
    mov: 2,
    cost: 11,
    sign: [[-0.92,0], [-0.76,-0.12], [-0.76,-0.4], [-0.6,-0.36], [-0.46,-0.24], [0,-0.28], [0.46,-0.24], [0.8,-0.12], [0.92,0], [0.8,0.12], [0.52,0.196], [0.52,0.26], [0.332,0.26], [0.46,0.2], [0,0.24], [-0.46,0.2], [-0.6,0.36], [-0.76,0.4], [-0.76,0.12], [-0.8,0.12], [-0.92,0]],
};
const AAG = {
    name: 'Anti-Air-Gun',
    act: 1,
    atk: 0,
    ran: 1,
    mov: 1,
    cost: 5,
    sign: [[0.48,-0.76], [0.6,-0.68], [0.4,-0.4], [0.52,-0.32], [0.32,-0.04], [0.8,-0.04], [0.8,-0.24], [0.88,-0.24], [0.88,0.16], [0.8,0.16], [0.8,-0.04], [-0.4,0.16], [-0.8,0.16], [-0.8,0.04], [-0.4,0.04], [-0.4,-0.2], [-0.2,-0.2], [0,-0.52], [-0.24,-0.2], [-0.04,-0.2], [0.16,-0.48], [0.18,-0.46], [0,-0.2], [0,-0.04]],
};
const biplaneFak = {
    name: 'Fakker Biplane',
    act: 3,
    atk: 5,
    ran: 1,
    mov: 2,
    cost: 12,
    sign: [],
};
const stormInf = {
    name: 'Stormtrooper Infantry',
    act: 1,
    atk: 3,
    ran: 1,
    mov: 1,
    cost: 4,
    sign: [],
};
const tankette = {
    name: 'Tankette',
    act: 2,
    atk: 4,
    ran: 1,
    mov: 1,
    cost: 5,
    sign: [],
};
//arrays for each type of unit
const unitList = [trenchInf, modernArt, biplaneScout, biplaneFig, zeppelin, AAG, biplaneFak, stormInf, tankette];
//Same order as units are written above
//Obj = ID, X, Y, Remaining Actions, Has Attacked, Team #
const units = [
  [[0, 0, 0, 0, 0, 0]],
  [[0, 1, 0, 0, 0, 1]],
  [[0, 2, 0, 0, 0, 0]],
  [[0, 3, 0, 0, 0, 1]],
  [[0, 0, 1, 0, 0, 0]],
  [[0, 1, 1, 0, 0, 0]],
];

//Map
const width = 10;
const height = 10;
const plains = {
  movMod: 1,
  defMod: 0,
  LOS: 0,
  color: [80, 135, 85]
};
const tileTypes = [plains];
const mapArray = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const array = [];
/*for (let a = 0; a < AAG.sign.length; a++){
  array.push([AAG.sign[a][0] / 25, AAG.sign[a][1] / 25]);
}
console.log(array)*/


//Drawing Functions
const hex = function(x, y, color){
  let xMod = x * zoom * 3.5 + worldX * zoom;
  let yMod = y * zoom * 3 + worldY * zoom;
  if (y % 2 == 1) { xMod += zoom * 1.75; }
  ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${1})`;
  ctx.beginPath();
  ctx.moveTo(xMod, yMod + zoom);
  ctx.lineTo(xMod, yMod + zoom * 3);
  ctx.lineTo(xMod + zoom * 1.75, yMod + zoom * 4);
  ctx.lineTo(xMod + zoom * 3.5, yMod + zoom * 3);
  ctx.lineTo(xMod + zoom * 3.5, yMod + zoom);
  ctx.lineTo(xMod + zoom * 1.75, yMod);
  ctx.lineTo(xMod, yMod + zoom);
  ctx.fill();
}
const unit = function(unit, type){
  let xMod = unit[1] * zoom * 3.5 + worldX * zoom;
  let yMod = unit[2] * zoom * 3 + worldY * zoom;
  if (unit[2] % 2 == 1) { xMod += zoom * 1.75; }
  let centerX = xMod + zoom * 1.75;
  let centerY = yMod + zoom * 2;
  ctx.fillStyle = `rgba(${teamArray[unit[5]][0]}, ${teamArray[unit[5]][1]}, ${teamArray[unit[5]][2]}, ${1})`;
  ctx.beginPath();
  ctx.arc(centerX, centerY, zoom, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(unitList[type].sign[0][0] * zoom + centerX, unitList[type].sign[0][1] * zoom + centerY);
  for (let a = 1; a < unitList[type].sign.length; a++){
    ctx.lineTo(unitList[type].sign[a][0] * zoom + centerX, unitList[type].sign[a][1] * zoom + centerY);
  }
  ctx.fill();
  ctx.lineWidth = zoom / 10;
  ctx.stroke();
}
/*for(var a = 0; a < names.length; a++){
        for(var b = 0; b < names[a].num.length; b++){
            for(var c = 0; c <= names[a].num[c]; c++){
                var curCol = names[a].te[b];
                fill(curCol.col[0], curCol.col[1], curCol.col[2]);
                var x = names[a].x[b];
                var y = names[a].y[b];
                    
                ellipse(x[c], y[c], zoom, zoom);
                fill(0, 0, 0);
                beginShape();
                strokeWeight(2);
                stroke(0, 0, 0);
                for(var d = 0; d < names[a].sign.length; d++){
                    var vert = names[a].sign[d];
                    vertex(vert[0] * zoom / 50 + x[c], vert[1]  * zoom / 50 + y[c]);
                }
                endShape();
                noStroke();
            }
        }
    }
*/
const drawMap = function(){
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, Cwidth, Cheight);
  for (let a = 0; a < width; a++){
    for (let b = 0; b < height; b++){
      hex(a, b, tileTypes[mapArray[b][a]].color);
    }
  }
  for (let a = 0; a < units.length; a++){
    for (let b = 0; b < units[a].length; b++){
      unit(units[a][b], a);
    }
  }
}
//drawMap();


//Input and Game State
let unitClikd = false;
let atkClikd = false;
let movClikd = false;
let curUnitIndex;

const clickOnUnit = function(x, y, type, unit) {
  drawMap();
  unitClikd = true;
  ctx.fillStyle = `rgba(${255}, ${255}, ${255}, ${0.125})`;
  let i = type.ran;
  while (i > 0) {
    ctx.beginPath();
    ctx.arc(x, y, zoom * i * 4, 0, 2 * Math.PI);
    ctx.fill();
    i--;
  }
  if (unit[5] == curTeam) {
    //Unit Menu
    ctx.fillStyle = `rgba(${0}, ${89}, ${214}, ${1})`;
    ctx.fillRect(Cwidth / 2, 5 * Cheight / 8, Cwidth, Cheight);
    ctx.fillStyle = `rgba(${255}, ${255}, ${255}, ${1})`;
    ctx.beginPath();
    ctx.arc(3 * Cwidth / 5, 30 * Cheight / 40, Cwidth / 16, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(3 * Cwidth / 4, 30 * Cheight / 40, Cwidth / 16, 0, 2 * Math.PI);
    ctx.fill();
    
    //Action Symbols
    ctx.fillStyle = `rgba(${0}, ${89}, ${214}, ${1})`;
    ctx.beginPath();
    ctx.moveTo(9 * Cwidth / 16, 7 * Cheight / 10);
    ctx.lineTo(9 * Cwidth / 16, 4 * Cheight / 5);
    ctx.lineTo(33 * Cwidth / 50, 3 * Cheight / 4);
    ctx.fill();
    
    //Stats and Name
    ctx.font = "30px serif";
    ctx.fillText(type.name,  17 * Cwidth / 32, 27 * Cheight / 40);
    ctx.font = "20px serif";
    ctx.fillText("Actions: " + unit[3],  17 * Cwidth / 32, 37 * Cheight / 40);
    ctx.fillText("Atk: " + type.atk,  17 * Cwidth / 32, 7 * Cheight / 8);
    ctx.fillText("Mov: " + type.mov,  5 * Cwidth / 8, 7 * Cheight / 8);
    ctx.fillText("Ran: " + type.ran,  23 * Cwidth / 32, 7 * Cheight / 8);
    ctx.fillText("Cost: " + type.cost,  13 * Cwidth / 16, 7 * Cheight / 8);
    ctx.fillStyle = `rgba(${0}, ${89}, ${214}, ${1})`;
    
  }
}
const drawMap = function(){
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, Cwidth, Cheight);
  for (let a = 0; a < width; a++){
    for (let b = 0; b < height; b++){
      hex(a, b, tileTypes[mapArray[b][a]].color);
    }
  }
  for (let a = 0; a < units.length; a++){
    for (let b = 0; b < units[a].length; b++){
      unit(units[a][b], a);
    }
  }
}
//drawMap();


//Input and Game State
let unitClikd = false;
let atkClikd = false;
let movClikd = false;
let curUnitIndex;

const clickOnUnit = function(x, y, type, unit) {
  drawMap();
  unitClikd = true;
  ctx.fillStyle = `rgba(${255}, ${255}, ${255}, ${0.125})`;
  let i = type.ran;
  while (i > 0) {
    ctx.beginPath();
    ctx.arc(x, y, zoom * i * 4, 0, 2 * Math.PI);
    ctx.fill();
    i--;
  }
  if (unit[5] == curTeam) {
    ctx.fillStyle = `rgba(${0}, ${89}, ${214}, ${1})`;
    ctx.fillRect(Cwidth / 2, 5 * Cheight / 8, Cwidth, Cheight);
    ctx.fillStyle = `rgba(${255}, ${255}, ${255}, ${1})`;
    ctx.beginPath();
    ctx.arc(3 * Cwidth / 5, 29 * Cheight / 40, Cwidth / 16, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(3 * Cwidth / 4, 29 * Cheight / 40, Cwidth / 16, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const click = function() {
  for(let a = 0; a < units.length; a++){
    for(let b = 0; b < units[a].length; b++){
      const x = units[a][b][1] * zoom * 3.5 + (worldX + 1.75) * zoom + zoom * 1.75 * (units[a][b][2] % 2);
      const y = units[a][b][2] * zoom * 3 + (worldY + 2) * zoom;
      if(mouseX > x - zoom && mouseX < x + zoom && mouseY > y - zoom && mouseY < y + zoom){
        clickOnUnit(x, y, unitList[a], units[a][b]);
      }
    }
  }
};

//GIF
const keys = new Set();
let mouse = 0;
let oldMouseX = 0;
let oldMouseY = 0;
let reallyOldMouseX = 0;
let reallyOldMouseY = 0;
let mouseX = 0;
let mouseY = 0;
window.addEventListener('keydown', e => {
  keys.add(e.key.toLowerCase());
});
window.addEventListener('keyup', e => {
  keys.delete(e.key.toLowerCase());
});
window.addEventListener('mousedown', m => {
  reallyOldMouseX = mouseX;
  reallyOldMouseY = mouseY;
  mouse += 1;
});
window.addEventListener('mouseup', m => {
  mouse -= 1;
  if (mouseX > reallyOldMouseX - 10 && mouseX < reallyOldMouseX + 10 && mouseY > reallyOldMouseY - 10 && mouseY < reallyOldMouseY + 10){
    click();
  }
});
window.addEventListener('mousemove', d => {
  if (mouse == 1){
    oldMouseX = mouseX;
    oldMouseY = mouseY;
  }
  mouseX = d.clientX;
  mouseY = d.clientY;
  if(mouse == 1){
    worldX += (mouseX - oldMouseX) * scrollSpeed * 2.5 / zoom;
    worldY += (mouseY - oldMouseY) * scrollSpeed * 2.5 / zoom;
    drawMap();
  }
});
});
