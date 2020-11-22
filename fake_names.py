#! /bin/env python

import sys
import math
import random
import datetime
import json
import csv

first_names = [
  'Benedikt',
  'Soběslav',
  'Bartoloměj',
  'Radim',
  'Melichar',
  'Patrik',
  'Vlastislav',
  'Josef',
  'Vítězslav',
  'Adolf',
  'Vlastislav',
  'Zbyšek',
  'Vojtěch',
  'Teodor',
  'Leoš',
  'Lukáš',
  'Denis',
  'Petr',
  'Rostislav',
  'Kvido'
]
last_names = [
  'Vlach',
  'Fišer',
  'Švec',
  'Dostál',
  'Žák',
  'Adamec',
  'Havel',
  'Rmoutil',
  'Dostál',
  'Šulc',
  'Špaček',
  'Slavík',
  'Dvořáček',
  'Zapletal',
  'Vlček',
  'Strnad',
  'Charvát',
  'Povýšil',
  'Vykukal',
  'Hanák'
]

def getAFakeDate(start_year, max_year):
  year = abs(math.floor(random.random() * (max_year - start_year)) + start_year)
  month = math.floor(random.random() * 11) + 1
  day = math.floor(random.random() * 27) + 1
  dt = datetime.date(year, month, day)
  return dt

def getAFake():
    n = math.floor(random.random() * len(first_names))
    m = math.floor(random.random() * len(last_names))
    p ={'name':first_names[n] + " " + last_names[m]}
    birth = getAFakeDate(1850, 2000)
    death = getAFakeDate(birth.year, 2019)

    p['birth'] = birth.strftime("%x")
    p['death'] = death.strftime("%x")
    return p

if __name__ == '__main__':
    profiles = []
    for r in range(1, 6):
      for c in range(1, 11):
        for p in range(1, 5):
          profiles.append(getAFake())
          profiles[-1]['location'] = 'R'+str(r)+'C'+str(c)+'P'+str(p)
          profiles[-1]['description'] = 'blurb'
    fieldnames = list(profiles[0].keys())
    w = csv.DictWriter(sys.stdout, fieldnames= fieldnames, quoting=csv.QUOTE_NONNUMERIC)
    w.writeheader()
    for row in profiles:
       w.writerow(row) 
    #print(json.dumps(profiles))
