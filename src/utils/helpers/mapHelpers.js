/* This function takes an array of address components and returns the long name of the country. It iterates over the address components and checks for a type of "country" to find the country component. */
export const getCountry = (addressArray) => {
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0] && "country" === addressArray[i].types[0]) {
      return addressArray[i].long_name;
    }
  }
  return "Pakistan";
};

/* Given an array of address components, this function returns the long name of the city. It iterates over the address components and looks for a type of "administrative_area_level_2" to find the city component. */
export const getCity = (addressArray) => {
  let city = "";

  for (let i = 0; i < addressArray.length; i++) {
    if (
      addressArray[i].types[0] &&
      "administrative_area_level_2" === addressArray[i].types[0]
    ) {
      city = addressArray[i].long_name;
      return city;
    }
  }
};

/* This function receives an array of address components and returns the long name of the area. It iterates over the address components, checking for types of "sublocality_level_1" or "locality" to find the area component. */
export const getArea = (addressArray) => {
  let area = "";
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i].types[0]) {
      for (let j = 0; j < addressArray[i].types.length; j++) {
        if (
          "sublocality_level_1" === addressArray[i].types[j] ||
          "locality" === addressArray[i].types[j]
        ) {
          area = addressArray[i].long_name;
          return area;
        }
      }
    }
  }
};

/* Given an array of address components, this function returns the short name of the block. It iterates over the address components and their types, searching for a type of "sublocality_level_2" to find the block component. */
export const getBlock = (addressArray) => {
  let block = null;
  addressArray.forEach((address) => {
    address?.types?.forEach((type) => {
      if (type === "sublocality_level_2") {
        block = address.short_name;
      }
    });
  });
  return block;
};
