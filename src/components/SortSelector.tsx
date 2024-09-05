import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGameQuery from "../store/store";



const SortSelector = () => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release date" },
    { value: "metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" },
  ];

  const sortOrder = useGameQuery(s => s.gameQuery.sortOrder);
  const setSortOrder = useGameQuery(s => s.setSortOrder)

  const currentSortOrder = sortOrders.find(order => order.value === sortOrder );

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        data-testid="sort-dropdown"
      >
        Order by: {currentSortOrder?.label || 'Relevance'}
      </MenuButton>
      <MenuList data-testid="sort-menulist">
        {sortOrders.map((order) => (
          <MenuItem
            key={order.value}
            value={order.value}
            onClick={() => setSortOrder(order.value)}
            data-testid="sort-menu-item"
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
