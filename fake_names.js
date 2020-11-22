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
    var p = {'name':names[n]};
    var birth = getAFakeDate(1850, 2000);
    var death = getAFakeDate(birth.getFullYear(), 2019);

    p['birth'] = birth;
    p['death'] = death;
    return p;
}
