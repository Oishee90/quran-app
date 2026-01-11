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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-5 bg-white border border-[#145eff3f] shadow-sm rounded-xl"
        >
          {/* Left */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl text-[#000000] font-medium ">{card.title}</p>
            <h3 className="text-xl text-[#000000] font-medium ">
              {card.count}
            </h3>
          </div>

          {/* Right Icon */}
          <div className={`py-7 px-14 rounded-lg ${card.bg}`}>
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
