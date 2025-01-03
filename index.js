function Node() {
  let data;
  let left = null;
  let right = null;

  return {
    data,
    left,
    right,
  };
}

function BSTtree(arr) {
  let root = { node: null };
  let cleanArray;

  const cleanUpArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        let temp;
        if (arr[i] > arr[j]) {
          temp = arr[j];
          arr[j] = arr[i];
          arr[i] = temp;
        }
      }
    }
    let cleanArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== arr[i + 1]) {
        cleanArr.push(arr[i]);
      }
    }
    return cleanArr;
  };

  const buildTree = (arr, start, end) => {
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);

    let node = Node();
    node.data = arr[mid];

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
  };

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insert = (value) => {
    let currentNode = root.node;
    let node = Node();
    node.data = value;
    while (currentNode) {
      if (currentNode.data === value) {
        break;
      }
      if (currentNode.data > value && currentNode.left) {
        currentNode = currentNode.left;
      } else if (currentNode.data < value && currentNode.right) {
        currentNode = currentNode.right;
      } else if (currentNode.data < value) {
        currentNode.right = node;
        break;
      } else if (currentNode.data > value) {
        currentNode.left = node;
        break;
      }
    }
  };

  const deleteItem = (value) => {
    let currentNode = root.node;
    let lastNode;
    while (currentNode) {
      if (currentNode.data === value) {
        //If the value exists then the following code will run
        if (currentNode.left === null && currentNode.right === null) {
          //if found value is a leaf node
          if (lastNode.pos === "l") {
            lastNode.node.left = null;
          } else if (lastNode.pos === "r") {
            lastNode.node.right = null;
          }
        } else if (
          (currentNode.left !== null && currentNode.right === null) ||
          (currentNode.left === null && currentNode.right !== null)
        ) {
          //if found value has a single child
          if (lastNode.pos === "l") {
            if (currentNode.left) {
              lastNode.node.left = currentNode.left;
            } else if (currentNode.right) {
              lastNode.node.left = currentNode.right;
            }
          } else if (lastNode.pos === "r") {
            if (currentNode.left) {
              lastNode.node.right = currentNode.left;
            } else if (currentNode.right) {
              lastNode.node.right = currentNode.right;
            }
          }
        } else if (currentNode.left !== null && currentNode.right !== null) {
          //if found value has both child

          let successorNode = currentNode.right;
          let successorParent = currentNode;
          while (successorNode.left) {
            successorParent = successorNode;
            successorNode = successorNode.left;
          }

          if (currentNode === root.node) {
            successorParent.left = successorNode.right;
            successorNode.left = root.node.left;
            successorNode.right = root.node.right;
            root.node = successorNode;
          } else {
            if (successorParent !== currentNode) {
              successorParent.left = successorNode.right;
            } else {
              successorParent.right = successorNode.right;
            }
            successorNode.left = currentNode.left;
            successorNode.right = currentNode.right;

            if (!lastNode) {
              root.node = successorNode;
            } else if (lastNode.pos === "l") {
              lastNode.node.left = successorNode;
            } else if (lastNode.pos === "r") {
              lastNode.node.right = successorNode;
            }
          }
        }
        // exiting function after deleting the node
        return;
      } else if (currentNode.data > value) {
        //traversing left subtree while caching last node
        lastNode = { node: currentNode, pos: "l" };
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        //traversing right subtree while caching last node
        lastNode = { node: currentNode, pos: "r" };
        currentNode = currentNode.right;
      }
    }
    //if no value is found then the function simply ends
  };

  const find = (value) => {
    let currentNode = root.node;
    while (currentNode) {
      if (currentNode.data === value) {
        return currentNode;
      } else if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        currentNode = currentNode.right;
      } else {
        return null;
      }
    }
  };

  const levelOrder_iteration = (callback) => {
    if (!callback) {
      throw new Error("A callback is required");
    }
    let queue = [root.node];
    while (queue.length !== 0) {
      let node = queue.shift();
      callback(node);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  };

  const levelOrder_recursion = (callback, queue = [root.node]) => {
    if (!callback) {
      throw new Error("A callback is required");
    }
    if (queue.length === 0) {
      return;
    }

    let node = queue.shift();
    callback(node);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    levelOrder_recursion(callback, queue);
  };

  const inOrder = (callback, node = root.node) => {
    if (!node) {
      return;
    }
    inOrder(callback, node.left);
    callback(node);
    inOrder(callback, node.right);
  };

  const preOrder = (callback, node = root.node) => {
    if (!node) {
      return;
    }
    callback(node);
    preOrder(callback, node.left);
    preOrder(callback, node.right);
  };

  const postOrder = (callback, node = root.node) => {
    if (!node) {
      return;
    }
    postOrder(callback, node.left);
    postOrder(callback, node.right);
    callback(node);
  };

  cleanArray = cleanUpArray(arr);
  root.node = buildTree(cleanArray, 0, cleanArray.length - 1);
  return {
    root,
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrder_iteration,
    levelOrder_recursion,
    inOrder,
    preOrder,
    postOrder,
  };
}

let arr = [1, 5, 7, 9, 11, 13, 19, 23]; //[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = BSTtree(arr);
tree.insert(2);
tree.insert(16);
tree.insert(14);
tree.insert(18);
tree.insert(15);
tree.prettyPrint(tree.root.node);
// tree.levelOrder_recursion((node) => console.log(node.data));
tree.postOrder((node) => console.log(node.data));
