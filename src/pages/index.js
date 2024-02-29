import { useToast, Flex, Box, Button, Input, SimpleGrid, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";


import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Produtos = () => {

  const [name, setName] = useState('');
  const [listProducts, setListProducts] = useState([]);

  const toast = useToast();

  // Verificar no localstorage se tem algo e setiver, converter a JSON
  // Simulação de bancodeDados
  useEffect(() => {
    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

      setListProducts(db_products);

  }, []);

  const handleNewProduct = () => {
    if (!name) return;
    if (verifyProductName()) {

      toast({
        title: 'CADASTRAR PRODUTO.',
        description: "O PRODUTO JÁ FOI CADASTRADO",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

      return;
    }

    //Gerar id
    const id = Math.random().toString(36).substring(2);

    if (listProducts && listProducts.length) {
      localStorage.setItem(
        "db_products",
        JSON.stringify([...listProducts, { id, name }])
      );

      setListProducts([...listProducts, { id, name }]);
    } else { // Se for o primeiro item
      localStorage.setItem("db_products", JSON.stringify([{ id, name }]));

      setListProducts([{ id, name }]);
    }

    setName("");
  };

  const verifyProductName = () => {
    return !!listProducts.find((prod) => prod.name === name);
  };

  //Remover produto
  const removeProduct = (id) => {
    const db_saida = localStorage.getItem("db_saida")
      ? JSON.parse(localStorage.getItem("db_saida"))
      : [];

      // Verificaçao se tem o produto
      const db_entrada = localStorage.getItem("db_entrada")
        ? JSON.parse(localStorage.getItem("db_entrada"))
        : [];

      const hasOutputs = db_saida.filter(
          (item) => item.product_id === id
      ).length;

      const hasEntries = db_entrada.filter(
          (item) => item.product_id === id
      ).length;

      if (hasEntries || hasOutputs) {
        toast({
          title: 'EXCLUSÃO NEGADA.',
          description: "ESSE PRODUTO POSSUI ESTOQUE!",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })

        return;
      }

      // Atualizar o banco com o produto removido
      const newArray = listProducts.filter((prod) => prod.id !== id);

      localStorage.setItem("db_products", JSON.stringify(newArray));

      setListProducts(newArray);
  };


  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w='100%' my='6' maxW={1120} mx="auto" px='6' h='100vh'>
        <Sidebar />

        <Box w="100%" bg="gray.100">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="PRODUTO"
            />
            <Button w='40' onClick={handleNewProduct}>
              SALVAR
            </Button>
          </SimpleGrid>

          <Box overflow="auto" height="80vh">
            <Table mt='6'>
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px">
                    NOME
                  </Th>
                </Tr>
                <Th></Th>
              </Thead>

              <Tbody color="whiteAlpha.500">
                {listProducts.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{item.name}</Td>
                    <Td alignItems="end">
                      <Button p="2" h="auto" fontSize={11} color="red.600" fontWeight="bold"
                              onClick={() => removeProduct(item.id)}
                      >
                        EXCLUIR
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
};

export default Produtos;