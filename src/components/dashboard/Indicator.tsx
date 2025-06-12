const Indicator = () => {
  const data = [
    { title: "Active Bookings", color: "#FF5859" },
    { title: "Pending Bookings", color: "#FFDF8F" },
    { title: "Completed Bookings", color: "#05A660" },
    { title: "Rescheduled Bookings", color: "#9A9A9A" },
    { title: "Cancelled Bookings", color: "#EB996E" },
  ];
  return (
    <div className="w-1/12 h-full flex flex-col justify-center items-center bg-white pl-2">
      {data.map((data) => (
        <div key={data.title} className="flex items-center gap-1 mb-2">
          <div
            className="h-3 w-4 rounded-sm"
            style={{ backgroundColor: data.color }}
          ></div>
          <h1 className="text-sm font-semibold" style={{ color: data.color }}>
            {data.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Indicator;
