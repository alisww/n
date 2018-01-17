const FirstPersonControls = require("./pointerlock");
const Block = require("./block");
const Chunk = require("./chunk");
const EventEmitter = require("events");

class NObject extends EventEmitter {
  constructor() { super(); }
  add(parent) {}
  update(delta,game) {}
}

class Player extends NObject {
  constructor(game) {
    super();
    this.velocity = new THREE.Vector3();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.controls = new FirstPersonControls(this.camera);
    this.controls.getObject().translateY(2);
    game.on("update",this.update.bind(this));
  }

  add(parent) {
    parent.add(this.controls.getObject());
  }

  update(delta,game) {
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;


    if (this.controls.moveForward ) {
      this.velocity.z -= 400.0 * delta;
    }

    if (this.controls.moveBackward) {
      this.velocity.z += 400.0 * delta;
    }

    if (this.controls.moveLeft) {
      this.velocity.x -= 400.0 * delta;
    }

    if (this.controls.moveRight) {
      this.velocity.x += 400.0 * delta;
    }

    this.controls.getObject().translateX(this.velocity.x * delta);
    this.controls.getObject().translateY(this.velocity.y * delta);
    this.controls.getObject().translateZ(this.velocity.z * delta);

  }
}

class Game extends EventEmitter {
  constructor() {
    super();
    this.meshes = {};
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock(true);
    this.light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    this.scene.add(this.light);

    var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
    var mat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(geo, mat);

    //this.scene.add(plane);
    plane.rotateX( - Math.PI / 2)


    this.player = new Player(this);
    this.player.add(this.scene);
  }

  register_mesh(mesh,name) {
    if (!this.meshes[name]) {
      this.meshes[name] = mesh;
      return true;
    } else {
      return false;
    }
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
    let delta = this.clock.getDelta();
    this.emit("update",delta,this);
    this.renderer.render(this.scene,this.player.camera);
  }
}

module.exports = {
  Block: Block,
  Chunk: Chunk,
  Game: Game,
  NObject: NObject
};
