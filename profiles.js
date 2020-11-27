function buildGallery(data, target) {
  var template = document.getElementById('dbox');
  for (x in data) {
    // newNode = template.clone(true);
    // gallery.appendChild(newNode);
    template.innerHTML = data[x]['name'];
    break;
  }
}

function createProfileNode(p) {
  var np = document.getElementById("profile-template").cloneNode(true);
  var dbox = null;

  np.id = x;
  dbox = np.querySelector('.dbox');
  // dbox.querySelector(".name").innerHTML = p['name'];
  for (x in p) {
    e = dbox.querySelector("." + x);
    if (e) {
      e.innerHTML = e.innerHTML + p[x];
    }
  }

  return np;
}

function clearResults(target) {
  element = target.querySelector('.profile');
  while (element) {
    result = target.removeChild(element);
    element = target.querySelector('.profile');
  }
}

function findProfiles(name, target) {
  var patt = new RegExp(name,'i');
  for (x in d) {
    p = d[x];
    match = patt.exec(p['name']);
    if (match) {
      // console.log(name +" matchs " + p['name']);
      np = createProfileNode(p);
      target.appendChild(np);
      np.style.display = "block";
      np = null;
    } else {
      // console.log(p['name'] + " does not equal " + name);
      continue;
    }
  }
  return false;
}

function refreshResults(name) {
  var gallery = document.getElementById('gallery');
  clearResults(gallery);
  if (name === "") {
    return false;
  } else {
    findProfiles(name, gallery );
  }
  return true;
}
