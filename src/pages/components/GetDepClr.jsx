const GetDepClr = (departmentId) => {
  if ([2, 3, 5].includes(departmentId)) return "#FF66A8";
  if ([1, 4].includes(departmentId)) return "#FFD86D";
  if ([6, 7].includes(departmentId)) return "#A1C4FD";
  return "#CCCCCC";
};

export default GetDepClr;
