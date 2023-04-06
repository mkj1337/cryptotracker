export const isPositive = (num: number) => {
    return num >= 0
      ? num === 0
        ? { color: '#fff' }
        : { color: '#00ff95' }
      : { color: '#ff0000' };
  };