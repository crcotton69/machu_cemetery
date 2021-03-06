// var plots = [] //profileData; // Change the name of "d" to profileData.
var profileData = [];

async function getProfileData() {
  if (profileData) {

    const response = await fetch("profileData.json");
    const data = await response.json();
    profileData = data;
    // populateNames(); // I think the problem here is that if I just assign then data goes away. I need to do a deep copy.

    console.log('Plots data loaded: ' + profileData);
  } else {
    console.log('Plots already has data: ' + profileData);
  }
}

getProfileData();

async function populateNames() {
  await getProfileData();

  thePlots = document.getElementById("the-plots");
  if (!thePlots) {
    return;
  }
  var plotId = null;
  var row = null;
  var col = null;
  var plt = null;

  for (plotId in profileData ) {
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
      plotinfo = profileData[plotId];
      plt = document.createElement('div');
      plt.appendChild(document.createTextNode(""));
      plt.id = col.id + p;
      col.appendChild(plt);
      configurePlot(plt, plotinfo);
    }
  }
}

function getLocationElements(plotId) {
  r = plotId.substring(0,plotId.indexOf('C'));
  c = plotId.substring(r.length, plotId.indexOf('P'));
  p = plotId.substring(r.length + c.length);
  return { 'r': r, 'c': c, 'p': p };
}

function getLocationDescription(plotId) {
  var parts = getLocationElements(plotId);
  var retval = "Row: " + parts.r + " Group: " + parts.c;
  // console.log(parts);

  if (parts.p === 'PL') {
    retval = retval + " Left";
  } else if (parts.p === 'PR') {
    retval = retval + " Right";
  } else if (parts.p === 'PC') {
    retval = retval + " Center";
  }
  return retval;
}

function configurePlot(plot, plotinfo) {
  var p = plot.id.substring(plot.id.length - 1);
  var fullname = getFullName(plotinfo);

  if ( !fullname ) {
    plot.innerHTML = plotinfo['plotId'];
    plot.setAttribute('class','plot-label-empty');
  } else if (p == "L") {
    plot.setAttribute("class", 'plot-label-left');
  } else if (p == "R") {
    plot.setAttribute("class", 'plot-label-right');
  } else if (p == "C") {
    plot.setAttribute("class", 'plot-label-center');
  }

  if (plotinfo['lname']) {
    plot.innerHTML = plotinfo['lname'];
  }
  plot.style.zindex = 50;
  plot.addEventListener('click', function() { showDetails(this.id, this); });
}


/* The following are the functions to display the popup boxes. right now, they get the data from a js object called plots, which I should have in a json file */
function getContents(plotID) {
  var p=null;
  if (plotID in profileData) {
    // console.log(plotID + ' was found');
    p = profileData[plotID];
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

function showDetails(id, element=null) {
  var s;
  if(!s) {
    s=id;
    var p = getContents(s);

    var details = document.getElementById("details");

    var name = getFullName(p);

    if (name.trim().length > 0) {
      var message="Full Name: <span class=\"lookup-text\">" + name + "</span><br/>Birth: <span class=\"lookup-text\">"+ p['birth'] + "</span><br/>Death: <span class=\"lookup-text\">" + p['death'] + "</span><br/><br/><p class=\"description\" style=\"margin:0; padding: 2px;\"> " + p['description'] + "</p>";
      details.innerHTML = message;
    } else {
      details.innerHTML = "Plot <span class=\"lookup-text\">" + s + "</span> is unclaimed but here's what we know:<p>"+p['description']+"</p>";
    }

    var detailsBoundary = details.getBoundingClientRect();
    var plotBoundary = {}; //= element.getBoundingClientRect();
    var ev = null;
    if (ev == null) { ev = window.event }
    plotBoundary['left'] = ev.clientX;
    plotBoundary['top'] = ev.clientY;
    var wd = getWindowDimensions();

/* Set the appropriate postion of the details information box */
    // if (plotBoundary.top + detailsBoundary.height > wd.height) {
    //   details.style.top = (  plotBoundary.top - detailsBoundary.height + 20) + "px";
    // } else {
    //   details.style.top = (  plotBoundary.top + 10) + "px";
    // }
    //
    // if (plotBoundary.left + detailsBoundary.width > wd.width) {
    //   details.style.left = (plotBoundary.left - detailsBoundary.width + 20) + "px";
    // } else {
    //   details.style.left = ( plotBoundary.left + 10) + "px";
    // }
    details.style.top = "25%";
    details.style.left = "25%";

    details.style.zIndex=100;
    details.style.visibility = 'visible';
    s = 0;
  }
  else {
    s = 0;
    hideDetails();
    console.log("Just curious if I ever get here?");
  }
}

function hideDetails() {
  var details = document.getElementById("details");
  details.style.visibility = 'hidden';
  details.style.top = 0;
  details.style.left = 0;
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
  var message=getFullName(p) + " " + getLocationDescription(p['plotId']);
  var text = document.createTextNode(message);
  np.addEventListener('click', event => {
    loc = document.getElementById(p['plotId']);
    showDetails(p['plotId'],loc);
  });
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
