import { Toast, Box, Button, Flex, Input, Select, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Entries = () => {

    const [amount, setAmount] = useState("");
    const [product_id, setProduct_id] = useState("0");
    const [listStockEntries, setStockEntries] = useState([]);
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        const db_entrada = localStorage.getItem("db_entrada")
            ? JSON.parse(localStorage.getItem("db_entrada"))
            : [];

        setStockEntries(db_entrada);

        const db_products = localStorage.getItem("db_products")
            ? JSON.parse(localStorage.getItem("db_products"))
            : [];

            setListProducts(db_products);

    }, []);

    const handleNewEntry = () => {
        if (!amount | (product_id === '0')) {
            Toast({
                title: 'Selecionar Produto.',
                description: "SELECIONE O PRODUTO E A QUANTIDADE",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }

        const id = Math.random().toString(36).substring(2);

        if (listStockEntries && listStockEntries.length) {
            localStorage.setItem(
                "db_entrada", 
                JSON.stringify([...listStockEntries, {id, amount, product_id}])
            );

            setStockEntries([...listStockEntries, {id, amount, product_id}]);
        } else {
            localStorage.setItem(
                "db_entrada", 
                JSON.stringify([{id, amount, product_id}])
            );

            setStockEntries([{id, amount, product_id}])
        }

        setAmount("");
        setProduct_id("0");
    };

    const removeEnties = (id) => {
        const newArray = listStockEntries.filter((item) => item.id !== id);

        localStorage.setItem("db_entrada", JSON.stringify(newArray));

        setStockEntries(newArray);
    };

    const getProductById = (id) => {
        return listProducts.filter((item) => item.id === id)[0]?.name;
    };

    return (
    <Flex h="100vh" flexDirection="column">
        <Header />

        <Flex w="100%" my="6" maxW={1120} mx="auto" px='6' h="100vh">
            <Sidebar />

            <Box w="100%" bg="gray.100">
                <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
                    <Select
                        value={product_id}
                        onChange={(e) => setProduct_id(e.target.value)}
                    >
                        <option value="0">Selecione um item</option>
                        {listProducts && listProducts.map((item, i) => (
                            <option key={i} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                    <Input
                        placeholder="quantidade"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button w="40" onClick={handleNewEntry}>
                        SALVAR
                    </Button>
                </SimpleGrid>
                <Box overflowy="auto" height="80vh">
                    <Table mt="6">
                        <Thead>
                            <Tr>
                                <Th fontWeight="bold" fontSize="14px">
                                    NOME
                                </Th>
                                <Th fontWeight="bold" fontSize="14px">
                                    QUANTIDADE
                                </Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {listStockEntries.map((item, i) => (
                                <Tr key={i}>
                                    <Td color="gray.400">{getProductById(item.product_id)}</Td>
                                    <Td color="gray.400">{item.amount}</Td>
                                    <Td textAlign="end">
                                        <Button p="2" h="auto" fontSize={11} color="red.400" fontWeight="bold" onClick={() => removeEnties(item.id)}>
                                            Excluir
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Flex>
    </Flex>
    );
}

export default Entries;