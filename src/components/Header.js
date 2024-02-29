import { Flex, HStack, IconButton, Icon, Text, useBreakpointValue} from "@chakra-ui/react";
import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import { FiMenu } from "react-icons/fi";

const Header = () => {
    const isMobile = useBreakpointValue({
        base: true,
        lg: false, //larger
    })

    const { onOpen } = useSidebarContext();

    return (
        <Flex 
            as="header"
            w="100%"
            maxW={1120}
            h="20"
            mx="auto"
            px="2"
            py="2"
            align="center"
            justifyContent="center"
            boxShadow="0 1px 0 #fff"
            color="gray.700"
            fontWeight="bold"
            backgroundColor="blackAlpha.400"
            >
                {isMobile && (
                    <IconButton
                        icon={<Icon as={FiMenu} />}
                        onClick={onOpen}
                        variant="ustyled"
                        fontSize="20"
                        mr="2"
                    ></IconButton>
                )}
                <Text textAlign="center">Controle de Estoque</Text>
            </Flex>
    );
};

export default Header;