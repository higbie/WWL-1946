# Adapted from Kim Pham, "Web Mapping with Python and Leaflet," The Programming Historian, https://programminghistorian.org/en/lessons/mapping-with-python-leaflet

import geopy
import pandas
from geopy.geocoders import Nominatim, GoogleV3
# versions used: geopy 1.10.0, pandas 0.16.2, python 2.7.8

def main():
  io = pandas.read_csv('filename.csv', index_col=None, header=0, sep=",")
  print("hello")

  def get_latitude(x):
    try:
        return x.latitude
    except:
        return None

  def get_longitude(x):
    try:
        return x.longitude
    except:
        return None

  #geolocator = Nominatim(user_agent="Project Name")
  geolocator = GoogleV3(api_key='add your key here')
  # uncomment the geolocator you want to use


  geolocate_column = io['Address'].apply(geolocator.geocode)
  io['latitude'] = geolocate_column.apply(get_latitude)
  io['longitude'] = geolocate_column.apply(get_longitude)
  io.to_csv('output-file.csv')


if __name__ == '__main__':
  main()
