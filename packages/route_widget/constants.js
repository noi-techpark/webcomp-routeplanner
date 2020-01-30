import carImage from './img/car.svg';
import busImage from './img/bus.svg';
import trainImage from './img/train.svg';
import walkingImage from './img/walking.svg';
import cableCarImage from './img/cable-car.svg';

export const MEANS_ICONS = {
  walking: walkingImage,
  train: trainImage,
  car: carImage,
  bus: busImage,
  cable_car: cableCarImage
};

export const WALKING_TRIP_COLOR = 'blue';
export const TRIP_COLORS = ['#E6040E', '#4285F4', '#97BE0E', '#A682FF'];

export const WALKING = 'walking';
export const TRAIN = 'train';
export const CAR = 'car';
export const BUS = 'bus';
export const CABLE_CAR = 'cable_car';

export const PUBLIC_TRANSPORT = 'public_transport';

export const FROM = 'FROM';
export const DESTINATION = 'DESTINATION';
export const stopID = 'stopID';
export const coord = 'coord';

export const PUBLIC_TRANSPORT_TAB = 'PUBLIC_TRANSPORT_TAB';
export const CAR_TAB = 'CAR_TAB';

export const here_options = ['tollroad', 'motorway', 'boatFerry', 'railFerry', 'tunnel', 'dirtRoad'];
export const efa_types = ['funicolar', 'train', 'bus'];

export const LANGUAGES = {
  EN: 'en',
  DE: 'de',
  IT: 'it'
};

export const PLACE_STATES = {
  is_geolocating: 'is_geolocating',
  geolocation_success: 'geolocation_success',
  geolocation_error: 'geolocation_error',
  result_selected: 'result_selected'
};

export const GEOLOCATION_ERRORS = {
  no_permissions: 'geolocation_no_permissions',
  timeout: 'geolocation_timeout'
};
