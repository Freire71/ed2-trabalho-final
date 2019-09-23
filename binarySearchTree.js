class Node {
  constructor(data, array = []) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.array = array;
  }
}

export class BST {
  constructor() {
    this.root = null;
  }

  add(data, array = []) {
    var node = new Node(data, array);

    if (!this.root) {
      this.root = node;
      return this;
    }
    let current = this.root;
    while (current) {
      // duplicates check
      if (data === current.data) {
        return;
      }

      // left node insertion
      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      }

      //right node insertion
      if (data > current.data) {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  }

  find(data) {
    if (!this.root) return null;
    let current = this.root;

    while (current) {
      if (data == current.data) return current.array;

      if (current.right && data > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }

    return false;
  }

  inOrder() {
    const data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);

    data.forEach(node => {
      console.log(`${node.data} ${[node.array].join(",")}`);
    });
  }
}
