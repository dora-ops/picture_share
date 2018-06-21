const heatStates = {
  red: [0, 10],
  orange: [10, 100],
  blue: [100, 1000],
  green: [1000, Infinity]
}

export const handleHeatGrade = (num) => {
  const heatKeys = Object.keys(heatStates);
  const icon = heatKeys.find(key => {
    let [min, max] = heatStates[key];
    if(num <= max && num >= min){
      return key;
    }
  })
  return icon;
}

export const coverTime = (time) => {
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month}-${day}`;
}