  const buildTree = (flat) => {
    const map = {};
    const roots = [];

    flat.forEach(item => {
      map[item.TableID] = { ...item, children: [] };
    });

    flat.forEach(item => {
      if (item.ParentTableID === null) {
        roots.push(map[item.TableID]);
      } else {
        map[item.ParentTableID]?.children.push(map[item.TableID]);
      }
    });

    return roots;
  };

  const getChildrenByPath = (tree, pathIndex = 0) => {
    if (pathIndex === 0) return tree;  // cấp đầu tiên

    let current = tree.find(x => x.TableID === pathIndex[0]);
    for (let i = 1; i < pathIndex.length; i++) {
      current = current.children.find(x => x.TableID === pathIndex[i]);
    }
    return current?.children || [];
  };

export { buildTree, getChildrenByPath };