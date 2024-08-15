import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        data-testid="sort-dropdown"
      >
        Order by: Relevance
      </MenuButton>
      <MenuList data-testid="sort-menulist">
        <MenuItem>Relevance</MenuItem>
        <MenuItem>Date Added</MenuItem>
        <MenuItem>Name</MenuItem>
        <MenuItem>Release Date</MenuItem>
        <MenuItem>Popularity</MenuItem>
        <MenuItem>Avagerate Rating</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
