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
  pic = np.querySelector('.pic');
  // dbox.querySelector(".name").innerHTML = p['name'];
  for (x in p) {
    e = dbox.querySelector("." + x);
    if (e) {
      e.innerHTML = e.innerHTML + p[x];
    } else if (x == 'profile-image' && p[x] != "") {
      e = pic.querySelector('.profile-image');
      if (e) {
        e.src = p[x];
        e.style.display = 'block';
        console.log("Displaying Image for " + p['name']);
      }
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
  for (x in profileData) {
    profile = profileData[x];
    match = patt.exec(profile['name']);
    if (match) {
      // console.log(name +" matchs " + p['name']);
      newProfileElement = createProfileNode(profile);
      target.appendChild(newProfileElement);
      newProfileElement.style.display = "block";
      newProfileElement = null;
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
