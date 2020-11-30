var plots = profileData; // Change the name of "d" to profileData.

function populateNames() {
  thePlots = document.getElementById("the-plots");

  var plotId = null;
  var row = null;
  var col = null;
  var plt = null;

  for (plotId in plots ) {
    r = plotId.substring(0,plotId.indexOf('C'));
    c = plotId.substring(r.length, plotId.indexOf('P'));
    p = plotId.substring(r.length + c.length);

    row = document.getElementById(r);
    if (!row) {
      row = document.createElement('div');
      row.id = r;
      row.setAttribute("class", 'plot-row');
      thePlots.appendChild(row);
      // console.log("Creating row: " + r);
    }

    col = row.querySelector("#" + r + c);

    if (!col) {
      // console.log("Creating Group: " + r + c);
      col = document.createElement('div');
      col.setAttribute("class", 'plot-group');
      col.id = r + c;
      row.appendChild(col);
    }

    plt = col.querySelector("#" + r + c + p);

    if ( !plt ) {
      plotinfo = plots[plotId];
      plt = document.createElement('div');
      plt.appendChild(document.createTextNode(""));
      plt.id = col.id + p;
      col.appendChild(plt);
      configurePlot(plt, plotinfo);
    }
  }
}

function configurePlot(plot, plotinfo) {
  var p = plot.id.substring(plot.id.length -1);
  var fullname = getFullName(plotinfo);

  if ( !fullname ) {
    plot.innerHTML = plotinfo['plotId'];
    plot.setAttribute('class','plot-empty');
  } else if (p == "L") {
    plot.setAttribute("class", 'plot-left');
  } else if (p == "R") {
    plot.setAttribute("class", 'plot-right');
  } else if (p == "C") {
    plot.setAttribute("class", 'plot-empty');
  }

  if (plotinfo['lname']) {
    plot.innerHTML = plotinfo['lname'];
  }
  plot.style.zindex = 50;
  plot.onmouseover = function(){ showDetails(this); };
}


/* The following are the functions to display the popup boxes. right now, they get the data from a js object called plots, which I should have in a json file */
function getContents(plotID) {
  var p=null;
  if (plotID in plots) {
    // console.log(plotID + ' was found');
    p = plots[plotID];
  }
  if (p != null)
    p['plotId'] = plotID;
  return p;
}

function getWindowDimensions() {
  var w = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  var h = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;
  return {'width': w,'height': h};
}

function getFullName(pd) {
  var fn = pd['fname'];
  var mn = pd['mname'];
  var ln = pd['lname'];
  var ret = "";
  if (fn) {
    ret = ret + fn;
  }
  if (mn) {
    ret = ret + " " + mn;
  }
  if (ret != "" && ln) {
    ret = ret + " " + ln
  } else if ( ln ) {
    ret = ln;
  }

  return ret;
}

function showDetails(element) {
  var s;
  if(!s) {
    s=element.id;
    var p = getContents(s);

    var details = document.getElementById("details");

    var name = getFullName(p);

    if (name.trim().length > 0) {
      var message="Full Name: " + name + "<br/>Birth: "+ p['birth'] + "<br/>Death: " + p['death'] + "<br/><p> " + p['description'] + "</p>";
      details.innerHTML = message;
    } else {
      details.innerHTML = "This plot is unclaimed but heres a Czech proverb:<p>"+p['description']+"</p>";
    }

    var detailsBoundary = details.getBoundingClientRect();
    var plotBoundary = element.getBoundingClientRect();
    var d = getWindowDimensions();

/* Set the appropriate postion of the details information box */
    if (plotBoundary.top + 2 * plotBoundary.height > d.height) {
      details.style.top = (  plotBoundary.top - detailsBoundary.height + 20) + "px";
    } else {
      details.style.top = (  plotBoundary.top + 10) + "px";
    }

    if (plotBoundary.left + 2 *plotBoundary.width > d.width) {
      details.style.left = (plotBoundary.left - detailsBoundary.width + 20) + "px";
    } else {
      details.style.left = ( plotBoundary.left + 10) + "px";
    }
    details.style.zIndex=100;
    details.style.visibility = 'visible';
    s = 0;
  }
  else {
    s = 0;
    hideDetails();
  }
}

function hideDetails() {
  var details = document.getElementById("details");
  details.style.visibility = 'hidden';
}

function clearAllResults(target) {
  while (target.hasChildNodes()) {
    target.removeChild(target.firstChild);
  }
}

function findProfiles(name, profileData) {
  var results = [];
  var patt = new RegExp(name,'i');
  for (x in profileData) {
    profile = profileData[x];
    profile['name'] = getFullName(profile);
    match = patt.exec(profile['name']);
    if (match) {
      results.push(profile);
    }
  }
  return results;
}

function populateWithProfiles(profiles, target, profileNodeFactory) {
  for (x in profiles) {
    profileNode = profileNodeFactory(profiles[x]);
    target.appendChild(profileNode);
    profileNode.style.display = "block";
  }
}

function refreshResults(name, container, nodeFactory) {
  var gallery = container;
  clearAllResults(gallery);
  if (name === "") {
    clearAllResults(gallery);
    gallery.style.visibility = 'hidden';
    return false;
  } else {
    profiles = findProfiles(name, profileData);
    populateWithProfiles(profiles, gallery, nodeFactory);
  }
  gallery.style.visibility = 'visible';
  return true;
}


function createListNode(p) {
  var np = document.createElement('p');
  var message=getFullName(p) + " Location: " + p['plotId'];
  var text = document.createTextNode(message);
  np.addEventListener('click', event => {
    console.log("cow");
  });
  // .onclick = function() { x = document.getElementById(p['plotId']); console.log('found ' + x); }
  np.appendChild(text);
  np.setAttribute('class', 'search-result');
  return np;
}


function createProfileNode(p) {
  var np = document.getElementById("profile-template").cloneNode(true);
  var dbox = null;

  np.id = p['id'];
  dbox = np.querySelector('.dbox');
  pic = np.querySelector('.pic');
  for (x in p) {
    e = dbox.querySelector("." + x);
    if (e) {
      e.innerHTML = e.innerHTML + p[x];
    } else if (x == 'profile-image' && p[x] != "") {
      e = pic.querySelector('.profile-image');
      if (e) {
        e.src = p[x];
        e.style.display = 'block';
      }
    }
  }

  return np;
}
