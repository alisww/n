const ncraft = require("./lib");
const EventEmitter = require("events");

class Block extends EventEmitter {
  constructor(mesh_name,game,position) {
    super();
    console.log(position);
    this.underlying = game.meshes[mesh_name];
    console.log(this.underlying);
    this.underlying_name = mesh_name;
    this.underlying.translateX(position.x);
    this.underlying.translateY(position.y);
    this.underlying.translateZ(position.z);
    this.position = {};
    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;
  }
}

module.exports = Block;
