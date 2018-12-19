// let foundUserId = 4;

console.log(foundUserId);
fetch("http://5c04b49cd5f2070013d58166.mockapi.io/users/" + foundUserId)
  .then(res => res.json())
  .then(tree => {
    console.log(tree.tree[0].region);
    document.getElementById("regionName").innerHTML = tree.tree[0].region;
    document.getElementById("treeName").innerHTML = tree.tree[0].name;
    document.getElementById("treeName2").innerHTML = tree.tree[0].name;
    document.getElementById("treeName3").innerHTML = tree.tree[0].name;
    document.getElementById("profileName").innerHTML =
      tree.firstname + " " + tree.lastname;
    document.getElementById("monthJoin").innerHTML = tree.month;
  });
