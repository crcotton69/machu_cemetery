var names = [
  'Benedikt Vlach',
  'Soběslav Fišer',
  'Bartoloměj Švec',
  'Radim Dostál',
  'Melichar Žák',
  'Patrik Adamec',
  'Vlastislav Havel',
  'Josef Rmoutil',
  'Vítězslav Dostál',
  'Adolf Šulc',
  'Vlastislav Špaček',
  'Zbyšek Slavík',
  'Vojtěch Dvořáček',
  'Teodor Zapletal',
  'Leoš Vlček',
  'Lukáš Strnad',
  'Denis Charvát',
  'Petr Povýšil',
  'Rostislav Vykukal',
  'Kvido Hanák'
];

function getAFakeDate(start_year, max_year) {
  var year = Math.abs(Math.floor(Math.random() * (max_year - start_year)) + start_year);
  var month = Math.floor(Math.random() * 11) + 1;
  var day = Math.floor(Math.random() * 27) + 1;
  var dt = new Date(year, month, day);
  return dt;
}

function getAFake() {
    var n = Math.floor(Math.random() * names.length);
    var p = {'fname':names[n]};
    var birth = getAFakeDate(1850, 2000);
    var death = getAFakeDate(birth.getFullYear(), 2019);

    p['birth'] = birth;
    p['death'] = death;
    return p;
}

/* This is just here to provide some dummy data */
function populateNames2() {
  baseCount = 100;
  rowCount = 10;   // number of rows from the gate to the pavillion
  groupCount = 10; // plot groups per row
  plotCount = 2;   // plots in each plot group

  thePlots = document.getElementById("the-plots");
  for (r = 1; r <= rowCount; r++) {
    row = document.createElement('div');
    row.id = "R" + r;
    row.setAttribute("class", 'plot-row');
    thePlots.appendChild(row);
    for (pg = 1; pg <= groupCount; pg++) {
      group = document.createElement('div');
      group.id = row.id + "C" + pg;
      group.setAttribute("class", 'plot-group');
      row.appendChild(group);
      for (p = 1; p <= plotCount; p++) {
        plot = document.createElement('div');

        if (p == 2) {
          plot.setAttribute("class", 'plot-left');
          plot.id = group.id + "P" + "L";

        } else {
          plot.setAttribute("class", 'plot-right');
          plot.id = group.id + "P" + "R";
        }

        label = document.createTextNode("");

        plot.appendChild(label);
        group.appendChild(plot);
        // console.log(plot.id);
        // get the appropriate contents (should be a call to a function)
        plotinfo = getContents(plot.id);
        if (!plotinfo) {
           plotinfo = getAFake();
           plotinfo['plotId'] = plot.id;
           plots[plot.id] = plotinfo;
        }

				if (!plotinfo) {
          console.log("Problem with plot");
          break;
        }

        // This line determines what data is put on the plot. Right now it is configured for the second word in the name.
        if (plotinfo['lname']) {
          plot.innerHTML = plotinfo['lname'];
        } else {
          plot.innerHTML = plotinfo['plotId'];
          plot.setAttribute('class','plot-empty');
        }
        plot.style.zindex = 50;
        plot.onmouseover = function(){ showDetails(this); };
      }
    }
  }
  // console.log("Appended " + thePlots.childElementCount  + " rows to " + row.parentNode);
}
