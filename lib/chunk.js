// A chunk is a 16x16x256 collection of blocks.
// To optimize the chunk's performance, all the blocks of a particular mesh (for example, "dirt") are unified into a single BufferGeometry and then mesh, which is then added to the scene.
const _ = require("underscore")
class Chunk {
  constructor(blocks,min_x,min_z) {
    this.blocks = blocks;
    this.merges = [];
    this.bounds = {};
    this.bounds.x = [min_x,min_x + 16];
    this.bounds.y = [0,256];
    this.bounds.z = [min_z,min_z + 16];
  }

  merge() {
    let categories = _.groupBy(this.blocks,"underlying_name");
    for (let block_category_name in categories) {
      let block_category = categories[block_category_name];
      let merge_geometry = new THREE.BufferGeometry();
      for (let block of block_category) {
        merge_geometry.merge(block.underlying.geometry);
      }
      this.merges.push(new THREE.Mesh(merge_geometry,block_category[0].underlying.material));
    }
  }

  add(parent) {
    for (let merge of this.merges) {
      parent.add(merge);
    }
  }
}

module.exports = Chunk;
