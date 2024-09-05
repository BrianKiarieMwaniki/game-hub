import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { Platform } from "../common.types";
import { useLookup, usePlatforms } from "../hooks";
import useGameQuery from "../store/store";

const PlatformSelector = () => {
  const { data: platforms, error } = usePlatforms();
  const [selectedPlatformName, setSelectedPlatformName] = useState<string>();
  const selectedPlatformId = useGameQuery((s) => s.gameQuery.platformId);
  const setSelectedPlatformId = useGameQuery((s) => s.setPlatformId);

  useEffect(() => {
    const { name } = useLookup<Platform>(platforms, selectedPlatformId);

    if (name) setSelectedPlatformName(name);
  }, [selectedPlatformId]);

  if (error) return null;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        data-testid="platforms-dropdown"
      >
        {selectedPlatformName || "Platforms"}
      </MenuButton>
      <MenuList data-testid="platforms-menulist">
        {platforms?.map((platform) => (
          <MenuItem
            key={platform.id}
            onClick={() => setSelectedPlatformId(platform.id)}
            data-testid={`platform-menuitem-${platform.id}`}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
