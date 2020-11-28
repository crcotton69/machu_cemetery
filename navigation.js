var plots = profileData; // Change the name of "d" to profileData.

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

function showId(element) {
  var s;
  if(!s) {
    s=element.id;
    var p = getContents(s);
    var message="Full Name: " + p.name + "<br/>Birth: "+ p['birth'] + "<br/>Death: " + p['death'] + "<br/>In plot: " + s ;
    var details = document.getElementById("details");
    details.innerHTML = message;

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
