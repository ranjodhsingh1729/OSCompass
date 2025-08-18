export const MetricCard = (props) => {
  let Icon = props.icon;
  return (
    <div className="m-1 p-1 border rounded-xl shadow-sm hover:shadow-lg transition flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon
            className="text-gray-600"
            size={20}
          />
          <span className="text-md font-semibold text-gray-700">{props.title}</span>
        </div>
        <div className="grow-1 text-center text-3xl font-bold">{props.children}</div>
    </div>
  );
};