const { floor } = Math;

export default function(number) {
  let ordinal;
  if (floor(number / 10) === 1) {
    ordinal = 'th';
  } else if (number % 10 === 1) {
    ordinal = 'st';
  } else if (number % 10 === 2) {
    ordinal = 'nd';
  } else if (number % 10 === 3) {
    ordinal = 'rd';
  } else {
    ordinal = 'th';
  }
  return `${number}${ordinal}`;
}
