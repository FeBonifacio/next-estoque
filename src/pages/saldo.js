import {
    Box,
    Button,
    Flex,
    Input,
    Select,
    SimpleGrid,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Saldo = () => {

    const [listProducts, setListProducts] = useState([]);
    const [productFiltered, setProductFiltered] = useState("");
    const [allProducts, setAllProducts] = useState([]);

    const BuildSaldoArray = () => {
        const db_saida = localStorage.getItem("db_saida")
            ? JSON.parse(localStorage.getItem("db_saida"))
            : [];
        
        const db_entrada = localStorage.getItem("db_entrada")
            ? JSON.parse(localStorage.getItem("db_entrada"))
            : [];

        const db_products = localStorage.getItem("db_products")
            ? JSON.parse(localStorage.getItem("db_products"))
            : [];

        const newArray = [];

        db_products.map((prod) => {
            const entrada = db_entrada
                .filter((item) => item.product_id === prod.id)
                .map((entry) => Number(entry.amount))
                .reduce((acc, cur) => acc + cur, 0);

            const saida = db_saida
                .filter((item) => item.product_id === prod.id)
                .map((entry) => Number(entry.amount))
                .reduce((acc, cur) => acc + cur, 0);

            const total = Number(entrada) - Number(saida)

            newArray.push({
                product_id: prod.id,
                product_name: prod.name,
                amount: total
            });
        });

        setListProducts(newArray);
        setAllProducts(newArray);
    };

    useEffect(() => {
        BuildSaldoArray();
    }, []);

    const handleFilterProducts = () => {
        if (!productFiltered) {
            setListProducts(allProducts);
            return;
        }

        const newArray = allProducts.filter(
            (item) => item.product_id === productFiltered
        );

        setListProducts(newArray);
    }

    return (
        <Flex h='100vh' flexDirection="column">
            <Header />

            <Flex w="100%" my="6" maxW={1120} max="auto" px="6" h="100vh">
                <Sidebar />

                <Box w='100%' bg="gray.100">
                    <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
                        <Select 
                            value={productFiltered}
                            onChange={(e) => setProductFiltered(e.target.value)}
                        >
                            <option value="">Selecione um item</option>
                            {allProducts &&
                                allProducts.length > 0 &&
                                allProducts.map((item, i) => (
                                    <option key={i} value={item.product_id}>
                                        {item.product_name}
                                    </option>
                                ))}
                        </Select>
                        <Button w="40" onClick={handleFilterProducts}>Buscar</Button>
                    </SimpleGrid>

                    <Box overflowY="auto" height="50vh">
                        <Table mt="6">
                            <Thead>
                                <Tr>
                                    <Th fontWeight="bold" fontSize="14px">NOME</Th>
                                    <Th fontWeight="bold" fontSize="14px">QUANTIDADE</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listProducts.map((item, i) => (
                                    <Tr key={i}>
                                        <Td color="gray.400">{item.product_name}</Td>
                                        <Td color="gray.400">{item.amount}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Saldo;