const getColor = (TeamColor) => {
  let color = "";
  if (TeamColor) {
    if (TeamColor === "blue") {
      color = "text-blue-500 bg-blue-100";
    } else if (TeamColor === "green") {
      color = "text-green-500 bg-green-100";
    } else if (TeamColor === "red") {
      color = "text-red-500 bg-red-100";
    } else if (TeamColor === "teal") {
      color = "text-teal-500 bg-teal-100";
    }
    if (TeamColor === "cyan") {
      color = "text-cyan-500 bg-cyan-100";
    } else if (TeamColor === "sky") {
      color = "text-sky-500 bg-sky-100";
    } else if (TeamColor === "indigo") {
      color = "text-indigo-500 bg-indigo-100";
    } else if (TeamColor === "rose") {
      color = "text-rose-500 bg-rose-100";
    }
    if (TeamColor === "pink") {
      color = "text-pink-500 bg-pink-100";
    } else if (TeamColor === "fuchsia") {
      color = "text-fuchsia-500 bg-fuchsia-100";
    } else if (TeamColor === "purple") {
      color = "text-purple-500 bg-purple-100";
    } else if (TeamColor === "violet") {
      color = "text-violet-500 bg-violet-100";
    } else if (TeamColor === "yellow") {
      color = "text-yellow-500 bg-yellow-100";
    } else if (TeamColor === "lime") {
      color = "text-lime-500 bg-lime-100";
    } else if (TeamColor === "emerald") {
      color = "text-emerald-500 bg-emerald-100";
    }
  }

  return color;
};

export default getColor;
