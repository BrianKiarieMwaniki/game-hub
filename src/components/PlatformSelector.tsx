import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatforms from "../hooks/usePlatforms";
import { Platform } from "../common.types";


interface Props{
    onSelectPlatform: (platform:Platform) => void;   
    selectedPlatform: Platform | null;
}

const PlatformSelector = ({onSelectPlatform, selectedPlatform}:Props) => {
  const { data: platforms , error} = usePlatforms();

  if(error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />} data-testid='platforms-dropdown'>
        {selectedPlatform?.name || 'Platforms'}
      </MenuButton>
      <MenuList data-testid='platforms-menulist'>
        {platforms?.map((platform) => (
          <MenuItem key={platform.id} onClick={() => onSelectPlatform(platform)} data-testid={`platform-menuitem-${platform.id}`} >{platform.name}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
