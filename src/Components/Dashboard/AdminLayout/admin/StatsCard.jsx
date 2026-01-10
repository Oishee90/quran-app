import Group from "../../../../assets/Group.png";
import Active from "../../../../assets/active-user.png";
import Block from "../../../../assets/block.png";

const StatsCards = ({ total, active, blocked }) => {
  const cards = [
    {
      title: "Total Users",
      count: total,
      icon: Group,
      bg: "bg-[#D5E3FF]",
    },
    {
      title: "Active Users",
      count: active,
      icon: Active,
      bg: "bg-[#D5E3FF]",
    },
    {
      title: "Blocked Users",
      count: blocked,
      icon: Block,
      bg: "bg-[#D5E3FF]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-5 bg-white border shadow-sm rounded-xl"
        >
          {/* Left */}
          <div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="text-2xl font-semibold">{card.count}</h3>
          </div>

          {/* Right Icon */}
          <div className={`p-3 rounded-lg ${card.bg}`}>
            <img
              src={card.icon}
              alt={card.title}
              className="object-contain w-8 h-8"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
